document.getElementById("createAdBtn").addEventListener("click", function() {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var image = document.getElementById("image").files[0];

    if (name && description && price && image) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var adContainer = document.getElementById("ad-container");
            var adDiv = document.createElement("div");
            adDiv.className = "ad";
            adDiv.innerHTML = `
                <img src="${reader.result}" alt="${name}">
                <h2>${name}</h2>
                <p>${description}</p>
                <p>Pris: $${price}</p>
            `;
            adContainer.appendChild(adDiv);
        };
        reader.readAsDataURL(image);
    } else {
        alert("Vennligst fyll ut all informasjon for å lage annonsen.");
    }
});
