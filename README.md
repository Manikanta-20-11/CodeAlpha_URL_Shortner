# 🔗 CodeAlpha URL Shortener

A modern and responsive URL Shortener web application built with **Node.js**, **Express.js**, and **MongoDB Atlas** as part of the **CodeAlpha Internship - Task 1**.

Convert long, messy URLs into clean and shareable short links instantly — with click tracking, link management, and a sleek dark-themed UI.

## 🌐 Live Demo

🚀 [https://codealpha-url-shortner-qmrq.onrender.com](https://codealpha-url-shortner-qmrq.onrender.com/)

---

## ✨ Features

- 🔗 Shorten any long URL into a clean short link
- 📊 Track click count for every shortened URL
- 📋 View all shortened URLs with original link and timestamps
- 🗑️ Delete unwanted short URLs anytime
- 🔁 Duplicate detection — shortening the same URL returns the existing link
- 📱 Fully responsive design — works on desktop and mobile
- 🎨 Modern dark UI with aurora gradient background effects

---

## 🛠️ Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Backend        | Node.js, Express.js             |
| Database       | MongoDB Atlas                   |
| Frontend       | HTML5, CSS3, Vanilla JavaScript |
| Unique ID      | nanoid                          |
| URL Validation | valid-url                       |
| Environment    | dotenv                          |
| Dev Tool       | nodemon                         |

---

## 📁 Project Structure

```
CodeAlpha_URL_Shortener/
├── models/
│   └── Url.js          # Mongoose schema for URL data
├── routes/
│   └── url.js          # API route handlers
├── public/
│   └── index.html      # Frontend UI
├── .env                # Environment variables (not pushed)
├── .gitignore
├── server.js           # Main Express server
└── package.json
```

---

## 📡 API Endpoints

| Method   | Endpoint                 | Description                        |
| -------- | ------------------------ | ---------------------------------- |
| `POST`   | `/api/shorten`           | Shorten a long URL                 |
| `GET`    | `/api/all`               | Get all shortened URLs             |
| `GET`    | `/api/stats/:shortCode`  | Get stats for a specific short URL |
| `DELETE` | `/api/delete/:shortCode` | Delete a short URL                 |

---

## ⚙️ Run Locally

### 1\. Clone the repository

```
git clone https://github.com/Manikanta-20-11/CodeAlpha_URL_Shortener.git
cd CodeAlpha_URL_Shortener
```

### 2\. Install dependencies

```
npm install
```

### 3\. Create a `.env` file in the root directory

```
MONGO_URI=your_mongodb_atlas_connection_string
BASE_URL=http://localhost:5000
PORT=5000
```

### 4\. Start the server

```
# Development (auto-restart)
npm run dev

# Production
npm start
```

### 5\. Open in browser

```
http://localhost:5000
```

---

## 🚀 Deployment

This project is deployed using **Render** (free tier).

- Backend + Frontend both served from the same Express server
- MongoDB Atlas used as the cloud database
- Environment variables configured directly in Render dashboard

---

## 👨‍💻 Author

**B.T.V. Manikanta** CodeAlpha Internship — Task 1 [GitHub](https://github.com/Manikanta-20-11)

---

## 📄 License

This project is open source and available under the [MIT License](https://claude.ai/chat/LICENSE).
