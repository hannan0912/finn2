document.querySelector('.logout-button').addEventListener('click', function() {
    var userConfirmation = confirm('Er du sikker på at du vil logge ut?');
    if (userConfirmation) {
        // Her kan du legge til logikk for å faktisk logge ut brukeren, for eksempel:
        // - Fjerne brukerinformasjon fra lokal lagring eller cookies
        // - Gjøre en server-forespørsel for å logge ut (hvis det er en backend)
        // For demonstrasjonsformål vil vi bare omdirigere til en logg inn-side:
        window.location.href = 'logg_in.html';
    }
});
