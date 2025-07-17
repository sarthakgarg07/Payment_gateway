import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div style={{ padding: '40px' }}>
            <h1>Super Admin Dashboard</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.userEmail}</td>
                            <td>{order.productName}</td>
                            <td>${order.amount}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;