const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuote');
const copyBtn = document.getElementById('copyQuote');

let isTyping = false;       // <<<<<<<<<< добавлено
let typingTimeout = null;   // <<<<<<<<<< нужно для очистки анимации

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
    // Останавливаем предыдущую печать
    if (typingTimeout) clearTimeout(typingTimeout);

    isTyping = true;
    element.textContent = "";
    let index = 0;

    const speed = 20;

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            typingTimeout = setTimeout(type, speed);
        } else {
            isTyping = false;      // печать завершена
            if (callback) callback();
        }
    }

    type();
}

// -------- FETCH NEW QUOTE ----------
async function getQuote() {
    // Если текст печатается → не даём нажать
    if (isTyping) return;

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

            // Запускаем typing effect
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

if (!loadFromLocalStorage()) {
    getQuote();
}
