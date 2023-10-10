// Hente innlogget bruker fra localStorage
const loggedInUser = localStorage.getItem('loggedInUser');

// Hente meldinger for en gitt sender og mottaker
function fetchMessagesForLoggedInUser(recipient) {
    const sender = localStorage.getItem('loggedInUser');
    if (!sender) {
        console.error('Ingen innlogget bruker funnet.');
        return;
    }

    axios.get('http://localhost:3000/messages', {
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
    const recipient = document.getElementById('recipient').value;
    const content = document.getElementById('userMessage').value;

    axios.post('http://localhost:3000/messages', {
        sender: sender,
        recipient: recipient,
        content: content
    })
        .then(response => {
            addMessageToChat({
                sender: sender,
                content: content
            });
            // Henter meldingene på nytt for å vise den nylig sendte meldingen.
            fetchMessagesForLoggedInUser(recipient);
        })
        .catch(error => {
            console.error('Feil ved sending av melding:', error);
        });
}

function displayMessages(messages) {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = ''; // Fjern tidligere meldinger
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
    document.getElementById('sender').value = loggedInUser;
    const recipient = document.getElementById('recipient').value;
    fetchMessagesForLoggedInUser(recipient);
});

// Når mottakeren endres, hent meldingene på nytt.
document.getElementById('recipient').addEventListener('change', function() {
    const recipient = this.value;
    fetchMessagesForLoggedInUser(recipient);
});
