import React from 'react';

const HeroBanner = () => {
    return (
        <div className="relative bg-greenPrimary text-white text-center py-16 px-8">
            <h1 className="text-4xl font-bold mb-4">The Nature Candle</h1>
            <p className="text-lg mb-6">
                All handmade with natural soy wax, Candleaf is a companion for your pleasant moments.
            </p>
            <button className="bg-white text-greenPrimary font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                Discover our collection
            </button>
        </div>
    );
};


export default HeroBanner;
