// src/components/profile/Favorites.jsx
import React from "react";

const Favorites = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
            <ul className="space-y-2">
                <li className="border p-2 rounded">Cool Blueberries - $9.95</li>
                <li className="border p-2 rounded">Juicy Lemon - $9.95</li>
            </ul>
        </div>
    );
};

export default Favorites;
