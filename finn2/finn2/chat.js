// Hente meldinger for en gitt sender og mottaker
function fetchMessages(sender, recipient) {
    axios.get('/messages', {
        params: {
            sender: sender,
            recipient: recipient
        }
    })
        .then(response => {
            // Vis meldingene på skjermen
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
    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const content = document.getElementById('userMessage').value;

    axios.post('/messages', {
        sender: sender,
        recipient: recipient,
        content: content
    })
        .then(response => {
            // Legg til den sendte meldingen til chatboksen
            addMessageToChat({
                sender: sender,
                content: content
            });
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

