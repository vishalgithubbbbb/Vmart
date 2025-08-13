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
