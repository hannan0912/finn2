const HEROKU_URL = 'https://finn2-94c8f8301a5b.herokuapp.com';

// Hente innlogget bruker fra localStorage
const loggedInUser = localStorage.getItem('loggedInUser');

// Hente meldinger for en gitt sender og mottaker
function fetchMessagesForLoggedInUser(recipient) {
    const sender = localStorage.getItem('loggedInUser');
    if (!sender) {
        console.error('Ingen innlogget bruker funnet.');
        return;
    }

    axios.get(`${HEROKU_URL}/messages`, {
        params: {
            sender: sender,
            recipient: recipient
        }
    })
        .then(response => {
            displayMessages(response.data);
        })
        .catch(error => {
            console.error('Feil ved henting av meldinger:', error);
        });
}

function addMessageToChat(message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.sender}: ${message.content}`;
    chatBox.appendChild(messageElement);
}

// Send en melding fra en sender til en mottaker
function sendMessage() {
    const sender = localStorage.getItem('loggedInUser');
    if (!sender) {
        console.error('Ingen innlogget bruker funnet.');
        return;
    }
    const recipient = document.getElementById('recipientSelect').value;
    const content = document.getElementById('userMessage').value;

    axios.post(`${HEROKU_URL}/messages`, {
        sender: sender,
        recipient: recipient,
        content: content
    })
        .then(response => {
            addMessageToChat({
                sender: sender,
                content: content
            });
            fetchMessagesForLoggedInUser(recipient);
        })
        .catch(error => {
            console.error('Feil ved sending av melding:', error);
        });
}

function displayMessages(messages) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${message.sender}: ${message.content}`;
        chatBox.appendChild(messageElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('Ingen innlogget bruker funnet.');
        return;
    }
    const recipient = document.getElementById('recipientSelect').value;
    fetchMessagesForLoggedInUser(recipient);
});

document.getElementById('recipientSelect').addEventListener('change', function() {
    const recipient = this.value;
    fetchMessagesForLoggedInUser(recipient);
});

function clearChat() {
    const sender = localStorage.getItem('loggedInUser');
    const recipient = document.getElementById('recipientSelect').value;

    axios.delete(`${HEROKU_URL}/messages`, {
        params: {
            sender: sender,
            recipient: recipient
        }
    })
        .then(response => {
            console.log(response.data.message);
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = ''; // Clear the chat display
        })
        .catch(error => {
            console.error('Error deleting messages:', error);
        });
}
