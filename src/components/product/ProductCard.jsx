import React from 'react';

const ProductCard = ({ name, price, image }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
            <img src={image} alt={name} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
            <p className="text-greenPrimary font-bold text-lg">${price}</p>
        </div>
    );
};


export default ProductCard;
