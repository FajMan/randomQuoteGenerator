const quoteContainer = document.getElementById("quote-Container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const category = "funny"
const apiKey = 'CntrUq70VMvK+0WWlekBkA==wdizcqUIWLh5b8X5';



// https://api.api-ninjas.com/v1/quotes?category=happiness

// Show Loading
const showLoading = () => {
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide Loading
const hideLoading = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true 
    }
}

async function newQuote() {
    showLoading()
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            method: 'GET',
            headers: {
                'X-Api-Key':apiKey,
                "Content-Type": "application/json"
            }
        });

        if(!response.ok) {
            throw new Error('Respose Network was not ok' + response.statusText)
        }

        const data = await response.json();
        const quote = data[0];
        console.log(quote);

        authorName.textContent = quote.author || 'Unknown' 
        quoteText.textContent = quote.quote

        if (quote.quote.length > 200) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }


        hideLoading()
    } catch (error) {
        console.error('')
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`
    window.open(twitterUrl, "_blank")
}
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)


newQuote();