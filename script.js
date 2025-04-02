// Fonction pour afficher le formulaire de la waitlist
function showWaitlistForm() {
    document.getElementById("waitlist-form").style.display = "block";
}

// Gestion de la soumission du formulaire de la waitlist
document.getElementById("waitlist-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire

    // Vérifie si le reCAPTCHA a été coché
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
        alert("Please complete the reCAPTCHA to prove you are not a bot.");
        return;
    }

    // Si le reCAPTCHA est validé, affiche le message de confirmation
    document.getElementById("waitlist-message").style.display = "block";
    this.style.display = "none"; // Cache le formulaire après soumission
    document.querySelector("#waitlist button").style.display = "none"; // Cache le bouton "Join Waitlist"
});

// Gestion de la soumission du formulaire de contact
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("form-message").style.display = "block";
    this.reset();
});
