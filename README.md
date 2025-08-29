# Vmart-Frozen Fullstack Project

## Overview

This repository contains a fullstack grocery e-commerce platform called **Vmart-Frozen**. It is divided into two main parts:

- **Backend/**: Node.js Express REST API for authentication, product management, orders, and seller/admin features.
- **Frozen/**: React frontend built with Vite, providing a modern UI for users and sellers.

## Folder Structure

Below is a visual graph of the main directory structure:

```
FYCS/
├── Backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── connectdb.js
│   │   └── multer.js
│   ├── controllers/
│   │   ├── address.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── product.controller.js
│   │   ├── seller.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── authSeller.js
│   │   └── authUser.js
│   ├── models/
│   │   ├── address.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── ...
│   ├── routes/
│   └── uploads/
├── Frozen/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Pages/
│       ├── Models/
│       ├── assets/
│       └── Context/
└── .gitignore
```

## Explanation

- **Backend/**  
  Contains the Express server, MongoDB models, controllers for business logic, authentication middleware, and configuration files for Cloudinary and Stripe.  
  - `config/`: Third-party service configs (Cloudinary, DB, Multer).
  - `controllers/`: Route logic for users, sellers, products, orders, etc.
  - `middlewares/`: Auth logic for users and sellers.
  - `models/`: Mongoose schemas for database entities.
  - `routes/`: API route definitions.
  - `uploads/`: Stores uploaded files/images.

- **Frozen/**  
  The React frontend, organized for scalability and maintainability.  
  - `src/Components/`: Reusable UI components (Navbar, Footer, Hero, etc.).
  - `src/Pages/`: Page-level components (Home, ProductDetails, Seller Dashboard, etc.).
  - `src/Models/`: UI state models (e.g., Auth forms).
  - `src/assets/`: Static assets and JS asset maps.
  - `src/Context/`: React context for global state (user, axios, etc.).

## Getting Started

1. **Backend**  
   - Install dependencies: `npm install`  
   - Configure `.env` with your credentials  
   - Start server: `npm start`

2. **Frontend**  
   - Install dependencies: `npm install`  
   - Start dev server: `npm run dev`

## License

MIT







# Project Blackbox Diagram

```
+---------------------------------------------------------------+
|                        FYCS Project Blackbox                 |
|---------------------------------------------------------------|
|                                                               |
| Inputs:                                                       |
|   - HTTP requests from users/sellers (Frontend)               |
|   - API requests from React app (Backend)                     |
|   - Environment variables (.env files)                        |
|   - Static assets (images, SVGs, etc.)                        |
|                                                               |
| Internal State & Logic:                                       |
|                                                               |
|   Backend/                                                    |
|   ├─ Express server (index.js)                                |
|   ├─ MongoDB models (models/)                                 |
|   ├─ Controllers (controllers/)                               |
|   ├─ Authentication (middlewares/)                            |
|   ├─ API routes (routes/)                                     |
|   ├─ File uploads (uploads/)                                  |
|   ├─ Config (connectdb, multer, etc.)                         |
|                                                               |
|   Frozen/                                                     |
|   ├─ React app entry (main.jsx, App.jsx)                      |
|   ├─ Context provider (AppContext.jsx)                        |
|   ├─ UI components (Components/, Pages/)                      |
|   ├─ Seller dashboard (Pages/Seller/)                         |
|   ├─ Models for forms/UI (Models/)                            |
|   ├─ Static assets (assets/)                                  |
|   ├─ Routing (react-router-dom)                               |
|                                                               |
| Outputs:                                                      |
|   - Dynamic web pages (React frontend)                        |
|   - REST API responses (JSON from Backend)                    |
|   - Database updates (MongoDB)                                |
|   - File uploads (images, etc.)                               |
|   - Toast notifications (frontend)                            |
|                                                               |
| Side Effects:                                                 |
|   - User authentication and session management                |
|   - Seller authentication and dashboard                       |
|   - Product CRUD operations                                   |
|   - Cart and order management                                 |
|   - Address management                                        |
|   - File/image uploads                                        |
|   - Email/newsletter (if implemented)                         |
|                                                               |
+---------------------------------------------------------------+
```

## Explanation

- **Inputs:**  
  - Users and sellers interact via the React frontend (`Frozen/`), sending requests to the backend (`Backend/`).
  - Environment variables configure sensitive data and endpoints.
  - Static assets are used for UI and product images.

- **Internal State & Logic:**  
  - **Backend:** Handles all business logic, authentication, database operations, and file uploads.
  - **Frozen (Frontend):** Manages UI, state, routing, and user interactions using React and context.

- **Outputs:**  
  - Users see dynamic web pages and receive feedback (toasts, navigation).
  - Backend sends JSON responses and updates the database.
  - Uploaded files are stored and served as needed.

- **Side Effects:**  
  - Authentication, CRUD operations, cart/order management, and file uploads are triggered by user actions.

---

This blackbox view abstracts away implementation details and focuses on how data flows through your system and what each part
