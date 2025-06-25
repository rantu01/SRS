
# 💬 Service Review System - Frontend

This is the **frontend** for the **Service Review System (SRS)** — a full-stack web application where users can explore, add, and review various services. This frontend is built using **React**, **Tailwind CSS**, and communicates with a secure backend API for dynamic operations like login, review management, and service uploads.

> 🔗 **Backend Repository:** [SRS Backend](https://github.com/rantu01/SRS-backend)

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 🧾 Add, edit, and delete your own service reviews
- 🔍 Explore and search services
- 📸 Add new services with title, image, category, and description
- 📅 Auto-timestamping and user-tagging
- 🔒 Protected routes for logged-in users
- 🌐 Responsive design with modern UI

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [JWT + Cookie Auth](https://jwt.io/)

---

## 📁 Folder Structure

```

SRS/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
├── .env
├── tailwind.config.js
├── vite.config.js
└── README.md

````

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm installed
- Backend server running (see backend repo)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rantu01/SRS.git
   cd SRS
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

---

## 🔐 Authentication Flow

* On login/register, the backend issues a **JWT** token and sets it as an **HTTP-only cookie**
* All protected routes check user auth status via cookies
* On logout, the cookie is cleared and session invalidated

---

## ✨ Key Pages

* `/` → Home (popular services)
* `/login`, `/register` → Auth pages
* `/services` → Explore all services
* `/services/:id` → Service detail + reviews
* `/add-service` → Add a new service (protected)
* `/my-reviews` → Manage your reviews (protected)

---

## 🙋‍♂️ Author

**Rantu Mondal**
🔗 [LinkedIn](https://www.linkedin.com/in/rantubytes)
📧 [rantumondal06@gmail.com](mailto:rantumondal06@gmail.com)

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.

---

## 🔗 Related

* Backend: [SRS Backend](https://github.com/rantu01/SRS-backend)

```

---

Let me know if you'd like a version with deployment instructions (e.g., Vercel/Netlify for frontend or backend hosting), or a one-click demo setup with mock data.
```
