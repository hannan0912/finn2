const sellers = [
    { id: 1, name: "Randi", bio: "Hei. Jeg er jente. Kjøp mine ting", stars: 4 },
    { id: 2, name: "Mikkel", bio: "Tracksuiten er fet brur", stars: 2 },
    { id: 3, name: "Tove", bio: "Jeg planter frø i hagen", stars: 5 }
];

const sellerList = document.getElementById("seller-list");
const sellerProfile = document.getElementById("seller-profile");
const sellerName = document.getElementById("seller-name");
const sellerBio = document.getElementById("seller-bio");
const starsContainer = document.getElementById("stars");

sellers.forEach(seller => {
    const li = document.createElement("li");
    li.textContent = seller.name;
    li.setAttribute("data-sellerid", seller.id);
    sellerList.appendChild(li);
});

sellerList.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
        const sellerId = parseInt(event.target.getAttribute("data-sellerid"));
        const selectedSeller = sellers.find(seller => seller.id === sellerId);

        sellerName.textContent = selectedSeller.name;
        sellerBio.textContent = selectedSeller.bio;

        starsContainer.innerHTML = "";
        for (let i = 0; i < selectedSeller.stars; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            starsContainer.appendChild(star);
        }

        sellerProfile.style.display = "block";
    }
});
