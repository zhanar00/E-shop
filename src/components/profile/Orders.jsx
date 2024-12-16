// src/components/profile/Orders.jsx
import React from "react";

const Orders = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            <ul className="space-y-2">
                <li className="border p-2 rounded">Order #1: Spiced Melts - $9.95</li>
                <li className="border p-2 rounded">Order #2: Sweet Strawberry - $9.95</li>
            </ul>
        </div>
    );
};

export default Orders;
