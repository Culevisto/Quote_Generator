# 📖 Quote Generator

A simple and elegant **Random Quote Generator** built using **HTML, CSS, and JavaScript**.  
It features smooth animations, typing effects, local storage support, and an improved user interface.

---

## ✨ Features

### 🔹 Random Quotes  
Quotes are fetched from a public API and displayed with an animation.

### 🔹 Typing Effect  
Quotes appear with a smooth typing animation for a pleasant reading experience.

### 🔹 Copy to Clipboard  
A “Copy Quote” button allows users to easily copy the displayed quote and author.

### 🔹 Local Storage Support  
The last displayed quote is saved automatically.  
When the user refreshes or reopens the page, the quote stays the same without reloading the API.

### 🔹 Smooth Animations  
Includes fade-in effects, button animations, and overall polished UI.

### 🔹 Responsive Design  
Fully responsive layout that works on both desktop and mobile.

### 🔹 Added App Icon  
A custom favicon is included to enhance the appearance of the application in the browser tab.

---

## 🛠️ Technologies Used

- **HTML5** — Structure  
- **CSS3** — Styling, animations  
- **JavaScript (ES6+)** — Logic, API requests  
- **LocalStorage** — Saving last quote  
- **Clipboard API** — Copy functionality  
- **DummyJSON Quotes API**  
  (`https://dummyjson.com/quotes/random`)

---

## 🚀 How It Works

1. When the page loads, the app checks **LocalStorage**:
   - If a quote exists → it loads instantly  
   - If not → it fetches a new random quote from the API  

2. Quotes are displayed with:
   - A fade animation  
   - A typing text animation  

3. When the user clicks **“New Quote”**, a new quote is fetched and animated.

4. When the user clicks **“Copy Quote”**, the quote is copied to the clipboard.

---

## 📦 Installation & Usage

1. Download or clone the repository:
   ```bash
   git clone https://github.com/Culevisto/Quote_Generator.git
Open the project folder:

bash
Копировать код
cd Quote_Qenerator
Open index.html using Live Server (VS Code extension)
or any local server.

⚠ Fetching API won’t work if you open the file directly as:

perl
Копировать код
file:///C:/...

🖼 Project Structure
css
Копировать код
📁 project-folder
├── index.html
├── style.css
├── script.js
├── image
└── README.md
🔧 API Used
Using DummyJSON Quotes API for stable connection:

url
Копировать код
https://dummyjson.com/quotes/random
Example response:

json
Копировать код
{
  "quote": "Your time is limited, so don’t waste it living someone else’s life.",
  "author": "Steve Jobs"
}
📚 Future Improvements (Optional)
You may add these in the future:

🌙 Dark/Light mode toggle

💾 Save multiple quotes

📱 Share button (Telegram / WhatsApp / Instagram Stories)

🎨 Custom themes

⌨ Add keyboard shortcuts

📄 License
This project is completely free to use for personal or educational purposes.

🌟 Author
Developed by Bayastan Paizov
✨ Simple. Smooth. Clean.
