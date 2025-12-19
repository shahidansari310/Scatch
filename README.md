# Scatch - Premium Bag Shop 🛍️

A modern, full-stack e-commerce application for premium bags built with Node.js, Express, MongoDB, and EJS templating.

## ✨ Features

### User Features
- **User Authentication**: Secure login/signup with JWT and bcrypt
- **Product Browsing**: View premium bag collections with detailed product information
- **Shopping Cart**: Add/remove products, view cart summary with pricing breakdown
- **User Account**: Personalized account page with order history
- **Flash Messages**: Real-time feedback for user actions

### Admin Features
- **Admin Dashboard**: Comprehensive product management interface
- **Product Management**: Create, view, and delete products
- **Image Upload**: Multer integration for product image handling
- **Inventory Control**: Bulk delete functionality
- **Protected Routes**: Secure admin-only access with middleware

### Technical Features
- **Session Management**: Express-session for persistent user sessions
- **Cookie-based Auth**: JWT tokens stored in HTTP-only cookies
- **File Upload**: Memory storage for product images
- **Flash Messages**: Connect-flash for user notifications
- **Responsive UI**: Modern Tailwind CSS design
- **MongoDB Integration**: Mongoose ODM for database operations

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **View Engine**: EJS
- **File Upload**: Multer
- **Styling**: Tailwind CSS
- **Icons**: Remix Icon
- **Session**: Express-session
- **Environment**: dotenv

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd premium_bag_shop
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/scatch
SECRET=your-jwt-secret-key
PORT=4000
```

4. **Start MongoDB**

Make sure MongoDB is running on your system.

5. **Run the application**
```bash
node app.js
```

The app will run on `http://localhost:4000`

## 📁 Project Structure

```
premium_bag_shop/
├── config/
│   ├── db.js              # MongoDB connection
│   └── multer-config.js   # File upload configuration
├── controller/
│   └── authController.js  # Authentication logic
├── middlewares/
│   ├── isAdmin.js         # Admin authentication
│   └── isLoggedin.js      # User authentication
├── models/
│   ├── admin-model.js     # Admin schema
│   ├── product-model.js   # Product schema
│   └── user-model.js      # User schema
├── routes/
│   ├── adminRoute.js      # Admin routes
│   ├── index.js           # Main routes
│   ├── productsRoute.js   # Product routes
│   └── usersRoute.js      # User routes
├── utils/
│   └── generateToken.js   # JWT token generation
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── account.ejs
│   ├── admin.ejs
│   ├── cart.ejs
│   ├── createproducts.ejs
│   ├── index.ejs
│   ├── owner-login.ejs
│   ├── shop.ejs
│   └── signup.ejs
├── app.js                 # Main application file
├── package.json
└── .gitignore
```

## 🔐 Admin Setup

To create the first admin account, send a POST request to:

```bash
POST /admin/create
Content-Type: application/json

{
  "fullname": "Admin Name",
  "email": "admin@scatch.com",
  "password": "securepassword"
}
```

**Note**: Only one admin account can be created for security.

## 🛣️ API Routes

### User Routes
- `GET /` - Login page
- `GET /signup` - Registration page
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Shop Routes
- `GET /shop` - Browse products (protected)
- `GET /cart` - View shopping cart (protected)
- `GET /account` - User account page (protected)
- `GET /addtocart/:id` - Add product to cart (protected)
- `GET /removefromcart/:id` - Remove from cart (protected)

### Admin Routes
- `GET /admin/owner` - Admin login page
- `POST /admin/login` - Admin login
- `GET /admin/logout` - Admin logout
- `GET /admin/dashboard` - Admin dashboard (protected)
- `GET /admin/create-product` - Product creation page (protected)
- `GET /admin/delete/:id` - Delete product (protected)
- `GET /admin/delete-all` - Delete all products (protected)

### Product Routes
- `POST /products/create` - Create new product (admin)

## 🎨 UI Features

- Modern glassmorphism navigation
- Responsive grid layouts
- Smooth hover animations
- Product cards with dynamic colors
- Shopping cart with price calculations
- Flash message notifications
- Custom Tailwind styling

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- Protected routes with middleware
- Session management
- Admin-only access control

## 📊 Database Models

### User Model
- fullname
- email
- password (hashed)
- cart (array of product references)
- orders (array)
- contact
- picture

### Product Model
- image (Buffer)
- name
- price
- discount
- bgcolor
- panelcolor
- textcolor

### Admin Model
- fullname
- email
- password (hashed)
- products (array)
- picture
- gstin

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Developer

Created with ❤️ by **Shahid Ansari**

- Twitter: [@Shahid_310_](https://x.com/Shahid_310_)
- GitHub: [@shahidansari310](https://github.com/shahidansari310)
- LinkedIn: [shahidansari-/](https://www.linkedin.com/in/shahidansari-/)

## 📝 License

ISC License

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the styling framework
- Remix Icon for beautiful icons

---

**Made with precision and care** ✨
