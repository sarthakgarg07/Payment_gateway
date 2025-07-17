import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Rlq5dFYt0G7KtNRQi2Qd5TtYf4JlgO5I409ZMBy3pZeGSpXDKExAHmkWsMMoFzvRPK5IBXZx78ve1MjSAqtssT700qXybBLpr');

const Homepage = () => {
    const products = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 },
        { id: 3, name: 'Product C', price: 30 }
    ];

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleBuy = async (product) => {
        const res = await fetch('http://localhost:3000/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product }),
        });
        const data = await res.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#3730a3' }}>Products</h1>
            <button
                onClick={handleLogin}
                style={{
                    background: '#4285F4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px 28px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '32px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(66,133,244,0.15)'
                }}
            >
                Sign in with Google
            </button>
            <div style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {products.map(product => (
                    <div key={product.id} style={{
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                        padding: '28px 36px',
                        minWidth: '220px',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: '0 0 10px', color: '#3730a3' }}>{product.name}</h2>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>${product.price}</p>
                        <button
                            onClick={() => handleBuy(product)}
                            style={{
                                marginTop: '16px',
                                background: '#22c55e',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px 22px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(34,197,94,0.12)'
                            }}
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;