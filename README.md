## 📚 Inventory Management API - Comprehensive Guide

A Node.js-based API designed for effective inventory management, featuring robust user authentication, product and category management, stock tracking, and dynamic reporting capabilities.

---

### 🔥 Features

- **User Authentication**: Secure registration, login, and role-based access.
- **Product Management**: Add, edit, view, and delete products with detailed attributes.
- **Category Management**: Create, update, and delete product categories.
- **Stock Management**: Monitor inventory levels, update stock, and receive low-stock alerts.
- **Reporting & Analytics**: Generate insightful inventory reports and export data in multiple formats.

### 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (using Prisma)
- **Authentication**: JWT (JSON Web Tokens) for secure access

---

### 🚀 Getting Started

#### 📋 Prerequisites

Ensure the following are installed:

- Node.js (v14 or higher)
- PostgreSQL/MongoDB/MySQL

#### 🛠️ Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/raj-rangani/pmc-programming-test-round.git
cd pmc-programming-test-round
```

2. **Install Dependencies:**

```bash
pnpm install
```

3. **Configure Environment Variables:** Create a `.env` file and add:

```env
PORT=3000
DATABASE_URL="your-database-url"
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1d
```

4. **Database Setup:** Run migrations to initialize the database schema:

```bash
npx prisma migrate dev --name init
```

5. **Start the Server:**

```bash
pnpm start
```

---

### 📂 API Endpoints

#### 🔑 Authentication

- `POST` /api/v1/auth/register - Register a new user
- `POST` /api/v1/auth/login - Login to receive a JWT token

#### 👥 User Management

- `GET` /api/v1/user - Retrieve all users (**Admin only**)
- `GET` /api/v1/user/\:id - View a user by ID (**Admin only**)
- `PUT` /api/v1/user/\:id - Update user details (**Admin only**)
- `DELETE` /api/v1/user/\:id - Delete a user (**Admin only**)

#### 📦 Product Management

- `POST` /api/v1/product - Add a new product (**Admin only**)
- `GET` /api/v1/product - Get all products
- `GET` /api/v1/product/\:id - Get a product by ID
- `PUT` /api/v1/product/\:id - Update product details (**Admin only**)
- `DELETE` /api/v1/product/\:id - Delete a product (**Admin only**)

#### 🗂️ Category Management

- `POST` /api/v1/category - Add a new category (**Admin only**)
- `GET` /api/v1/category - List all categories
- `GET` /api/v1/category/\:id - Get category details by ID
- `PUT` /api/v1/category/\:id - Update category (**Admin only**)
- `DELETE` /api/v1/category/\:id - Delete a category (**Admin only**)

#### 📊 Stock Level Management

- `PUT` /api/v1/product/\:id/stock - Update product stock (**Admin only**)
- `GET` /api/v1/product/stock/low - View low-stock products
- `GET` /api/v1/product/stock/out-of-stock - View out-of-stock products

#### 🔎 Search & Filtering

- `GET` /api/v1/product?search=xyz - Search by product name
- `GET` /api/v1/product?minPrice=100&maxPrice=500 - Advanced filtering

#### 📈 Reports & Analytics

- `GET` /api/v1/reports/total-stock-value - View total stock value
- `GET` /api/v1/reports/category-wise - Stock distribution by category

---
