const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuote');
const copyBtn = document.getElementById('copyQuote');

// -------- TEXT FORMATTING ----------
function formatSentence(text) {
    let lower = text.toLowerCase();
    lower = lower.replace(/(^\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    return lower;
}

// -------- LOCAL STORAGE ----------
function saveToLocalStorage(quote, author) {
    localStorage.setItem("lastQuote", quote);
    localStorage.setItem("lastAuthor", author);
}

function loadFromLocalStorage() {
    const savedQuote = localStorage.getItem("lastQuote");
    const savedAuthor = localStorage.getItem("lastAuthor");

    if (savedQuote && savedAuthor) {
        typeText(quoteElement, savedQuote, () => {
            authorElement.textContent = savedAuthor;
        });
        return true;
    }
    return false;
}

// -------- TYPING EFFECT ----------
function typeText(element, text, callback = null) {
    element.textContent = "";
    let index = 0;

    const speed = 20; // скорость печати

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// -------- FETCH NEW QUOTE ----------
async function getQuote() {
    newQuoteBtn.disabled = true;
    copyBtn.disabled = true;

    quoteElement.classList.add('fade');
    authorElement.classList.add('fade');

    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        const formattedQuote = `"${formatSentence(data.quote)}"`;
        const formattedAuthor = `— ${data.author}`;

        setTimeout(() => {
            quoteElement.classList.remove('fade');
            authorElement.classList.remove('fade');

            // Пишем текст с typing effect
            typeText(quoteElement, formattedQuote, () => {
                authorElement.textContent = formattedAuthor;
            });

            saveToLocalStorage(formattedQuote, formattedAuthor);

            newQuoteBtn.disabled = false;
            copyBtn.disabled = false;

        }, 300);

    } catch (error) {
        quoteElement.textContent = 'Failed to load quote. Please try again.';
        authorElement.textContent = '';
        quoteElement.classList.remove('fade');
        newQuoteBtn.disabled = false;
        copyBtn.disabled = false;
    }
}

// -------- COPY BUTTON ----------
copyBtn.addEventListener('click', () => {
    const text = `${quoteElement.textContent} ${authorElement.textContent}`;
    navigator.clipboard.writeText(text);

    copyBtn.textContent = "Copied!";
    setTimeout(() => { copyBtn.textContent = "Copy Quote"; }, 1200);
});

// -------- INIT ----------
newQuoteBtn.addEventListener('click', getQuote);

// если есть цитата из LocalStorage → загрузим её
if (!loadFromLocalStorage()) {
    getQuote();
}
