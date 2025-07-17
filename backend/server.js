require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session
const passport = require('passport'); // Import passport
const authRoutes = require('./auth');
const paymentRoutes = require('./payment');
const sendEmail = require('./email');
const mongoose = require('mongoose'); // Add MongoDB connection
const path = require('path'); // Import path module
const Product = require('./models/Product'); // Import Product model
const Razorpay = require('razorpay');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('./models/Order');

// // Initialize Razorpay instance with test keys from environment variables
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
//     key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
// });

const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug log for MongoDB URI
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Add session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use env variable or fallback
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(paymentRoutes);

// Add products API endpoint
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed products endpoint for testing
app.post('/api/products/seed', async (req, res) => {
    try {
        const sampleProducts = [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 20 },
            { name: 'Product C', price: 30 }
        ];
        await Product.deleteMany({});
        const products = await Product.insertMany(sampleProducts);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Razorpay order endpoint
app.post('/api/create-order', async (req, res) => {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = req.body;
    try {
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Stripe Checkout Session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
    const { product } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100, // price in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3001/success',
            cancel_url: 'http://localhost:3001/cancel',
        });
        // Save order (for demo, before payment confirmation)
        await Order.create({
            userEmail: req.user?.emails?.[0]?.value || 'guest',
            productName: product.name,
            amount: product.price
        });
        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Get all orders
app.get('/api/orders', async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.post('/notify-admin', async (req, res) => {
    const { user, product } = req.body;

    try {
        await sendEmail(
            process.env.ADMIN_EMAIL,
            'Payment Notification',
            `User ${user} purchased ${product}.`
        );
        res.send({ message: 'Email sent to admin.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Backend server running on port 3000'));