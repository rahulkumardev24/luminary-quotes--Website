const quotesContainer = document.getElementById("quotesContainer");
const loading = document.getElementById("loading");
const url = "https://zenquotes.io/api/quotes";
const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

// Show loading spinner
function showLoading() {
    loading.classList.remove("hidden");
}

// Hide loading spinner
function hideLoading() {
    loading.classList.add("hidden");
}

// Display quotes inside the container
function displayQuotes(quotes) {
    quotesContainer.innerHTML = ""; 
    quotes.forEach(quote => {
        const card = document.createElement("div");
        card.classList.add("quote-card");

        const quoteText = document.createElement("div");
        quoteText.classList.add("quote-text");
        quoteText.textContent = `"${quote.q}"`;

        const quoteAuthor = document.createElement("div");
        quoteAuthor.classList.add("quote-author");
        quoteAuthor.textContent = `— ${quote.a}`;

        card.appendChild(quoteText);
        card.appendChild(quoteAuthor);
        quotesContainer.appendChild(card);
    });
}

// Fetch quotes from API
async function fetchQuotes() {
    try {
        // here we sho loading 
        showLoading();
        const response = await axios.get(proxyUrl);
        const data = JSON.parse(response.data.contents);
        /// diaplay quotes
        displayQuotes(data);
    } catch (error) {
        console.error("Failed to fetch quotes:", error);
        quotesContainer.innerHTML = "<p style='color: red;'>Oops! Unable to load quotes. Please try again later.</p>";
    } finally {
        /// here we hide loading 
        hideLoading();
    }
}

// Load quotes on page load
window.addEventListener("DOMContentLoaded", fetchQuotes);
