function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userMessage = document.getElementById("userMessage").value;

    // Opprett en ny paragraf-element for meldingen
    const messageElement = document.createElement("p");
    messageElement.textContent = userMessage;

    // Legg til meldingen i chatBox
    chatBox.appendChild(messageElement);

    // Nullstill inndatafeltet
    document.getElementById("userMessage").value = "";
}
