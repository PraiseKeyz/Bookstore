# 📚 Book API

A RESTful API built with TypeScript, Express.js, and MongoDB to manage a book collection. This project includes user authentication (login/signup), protected routes, and CRUD operations for books and authors.

---

## 🚀 Features

- User authentication (JWT-based)
- Role-based access control
- CRUD operations for:
  - Books
  - Authors
- Genre categorization
- MongoDB for data persistence
- Clean, modular codebase with TypeScript

---

## 📁 Project Structure

src/ │ ├── controllers/ # Route handlers │ ├── authController.ts │ ├── bookController.ts │ └── authorController.ts │ ├── model/ # Mongoose models │ ├── User.ts │ ├── Book.ts │ └── Author.ts │ ├── middleware/ # Middleware (e.g., auth) │ └── authMiddleware.ts │ ├── routes/ # API route definitions │ ├── authRoutes.ts │ ├── bookRoutes.ts │ └── authorRoutes.ts │ ├── utils/ # Utility functions (e.g., token generation) │ ├── app.ts # Express app setup └── server.ts # Entry point

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Environment Management**: dotenv

---

## 🔐 API Authentication

All book and author routes are protected. Include your JWT token in the request headers:

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-api.git
cd book-api
```

### Install dependencies
```bash
npm install
```

### Create a .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

### Run the server

  #### For development
```bash
npm run dev
```

#### For production
```bash
npm run build
npm start
```
## 📫 API Endpoints

### 🔐 Auth
POST /api/auth/signup - Register a new user

POST /api/auth/login - Login and get token

### 📘 Books
POST /api/books - Create a book

GET /api/books - Get all books

GET /api/books/:id - Get a single book by ID

PUT /api/books/:id - Update a book by ID

DELETE /api/books/:id - Delete a book by ID

### ✍️ Authors
POST /api/authors - Create an author

GET /api/authors - Get all authors

GET /api/authors/:id - Get a single author by ID

PUT /api/authors/:id - Update an author by ID

DELETE /api/authors/:id - Delete an author by ID

## 🧪 Testing

Use Postman or Insomnia to test the endpoints. Don’t forget to set the Authorization header for protected routes.

## 📄 License
This project is open source and available under the MIT License.

## 🙌 Acknowledgements
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
