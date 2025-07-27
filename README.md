# 🎬 MovieInfo

Discover trending and popular movies with ease!  
MovieInfo is a modern React app built with Vite and Tailwind CSS, featuring live search, trending analytics, and beautiful UI.

![MovieInfo Banner](public/hero.png)

---

## 🚀 Features

- 🔍 **Instant Movie Search** – Search thousands of movies from TMDB.
- 📈 **Trending Analytics** – See what movies are trending based on user searches.
- 🎞️ **Movie Details & Trailers** – View ratings, languages, release years, and official trailers.
- ⚡ **Fast & Responsive** – Built with React 19, Vite, and Tailwind CSS for a smooth experience.
- ☁️ **Appwrite Integration** – Tracks search analytics and trending movies.

---

## 🖥️ Demo

> _Add your live demo link here if available!_

---

## 📸 Screenshots
### Home
![Home](public/first.png)
### Popular movies
![Home](public/second.png)
### Search Results
![Home](public/third.png)

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

## ⚙️ Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/abhi24112/Movie-Website.git
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
```

### 4. Start the development server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📝 Project Structure

```
MovieWebsite/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── MovieInfo.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.jsx
│   ├── appwrite.js
│   ├── index.css
│   └── main.jsx
├── .env.local
├── package.json
├── vite.config.js
└── README.md
```

---

## 🙏 Credits

- Movie data from [TMDB](https://www.themoviedb.org/)
- UI inspired by modern streaming platforms

---

## 📄 License

This project is licensed under the MIT License.

---

>