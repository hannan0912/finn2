document.getElementById("loginBtn").addEventListener("click", function(){
    const user = document.getElementById('userSelect').value;

    // Lagre brukerens navn i localStorage
    localStorage.setItem('loggedInUser', user);

    // Naviger til forsiden
    window.location.href = "hjem.html"; // Angi den faktiske filnavnet for forsiden her
});
