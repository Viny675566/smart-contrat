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

// WalletConnect Integration
(async () => {
    // Project ID de WalletConnect
    const projectId = "16b8361d60a0fd6233d5098edd8135b0";

    // Initialisation de Web3Modal
    const { createWeb3Modal, defaultConfig } = window.Web3Modal;

    // Configuration des métadonnées de ton projet
    const metadata = {
        name: "Smart Contrat",
        description: "A platform for secure smart contracts",
        url: "https://Viny675566.github.io/smart-contrat",
        icons: ["https://Viny675566.github.io/smart-contrat/smart-contrat-ai.jpg"]
    };

    // Configuration des chaînes (par exemple, Ethereum Mainnet et Polygon)
    const chains = [
        {
            chainId: 1, // Ethereum Mainnet
            name: "Ethereum",
            currency: "ETH",
            explorerUrl: "https://etherscan.io",
            rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        },
        {
            chainId: 137, // Polygon Mainnet
            name: "Polygon",
            currency: "MATIC",
            explorerUrl: "https://polygonscan.com",
            rpcUrl: "https://polygon-rpc.com"
        }
    ];

    // Création de Web3Modal
    const modal = createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains,
        projectId,
        enableAnalytics: true // Optionnel : active les analyses
    });

    // Gestion de la connexion
    const connectButton = document.getElementById("connect-wallet-btn");
    const disconnectButton = document.getElementById("disconnect-wallet-btn");
    const walletAddressElement = document.getElementById("wallet-address");
    const addressSpan = document.getElementById("address");

    connectButton.addEventListener("click", async () => {
        try {
            await modal.open();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        }
    });

    // Écoute des événements de connexion
    modal.subscribeState(async (state) => {
        if (state.selectedNetworkId) {
            // Portefeuille connecté
            const provider = modal.getWalletProvider();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];

            // Affiche l'adresse
            addressSpan.textContent = address;
            walletAddressElement.style.display = "block";
            connectButton.style.display = "none";
            disconnectButton.style.display = "inline-block";
        } else {
            // Portefeuille déconnecté
            walletAddressElement.style.display = "none";
            connectButton.style.display = "inline-block";
            disconnectButton.style.display = "none";
        }
    });

    // Gestion de la déconnexion
    disconnectButton.addEventListener("click", async () => {
        await modal.disconnect();
    });
})();
