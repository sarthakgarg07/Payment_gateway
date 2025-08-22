# Payment Gateway (E-Commerce Payment Notification System)

## Overview
This project is an E-Commerce Payment Notification System that allows users to:
- Sign in using Google OAuth
- View and purchase products
- Make payments using Stripe Checkout (test mode)
- Notify the super admin via email when a payment is made
- View all sales in a Super Admin Dashboard

## Features
- **Authentication:** Google OAuth login for secure user authentication
- **Product Display:** Modern, card-style homepage showing products
- **Payment Gateway:** Stripe Checkout integration for test payments
- **Admin Notification:** Email sent to super admin on each payment
- **Super Admin Dashboard:** View all orders (who bought what and when)

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Authentication:** Passport.js (Google OAuth)
- **Payments:** Stripe Checkout (test mode)
- **Database:** MongoDB (Mongoose)
- **Email:** Nodemailer

## Setup Instructions

### 1. Clone the repository
```sh
git clone https://github.com/sarthakgarg07/Payment_gateway.git
cd Payment_gateway
```

### 2. Backend Setup
- Go to the backend folder:
  ```sh
  cd backend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file in `backend/` with the following:
  ```env
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  ADMIN_EMAIL=your-admin-email@example.com
  EMAIL_USER=your-email@example.com
  EMAIL_PASS=your-email-password
  MONGO_URI=mongodb://localhost:27017/tensorGO
  SESSION_SECRET=your-session-secret
  STRIPE_SECRET_KEY=your-stripe-secret-key
  ```
- Start the backend server:
  ```sh
  node server.js
  # or
  npm start
  ```

### 3. Frontend Setup
- Open a new terminal and go to the frontend folder:
  ```sh
  cd frontend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Start the frontend:
  ```sh
  npm start
  ```
- The app will run at `http://localhost:3001`

## Usage
- Sign in with Google on the homepage
- View products and click "Buy" to pay with Stripe (use test card: 4242 4242 4242 4242)
- Switch to the Admin Dashboard to see all orders

## Screenshots
_Add screenshots of the homepage, Stripe checkout, and admin dashboard here_
