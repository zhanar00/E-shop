import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-greenPrimary">Candleaf</div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-greenPrimary"
                />
                <a href="#" className="text-gray-600 hover:text-greenPrimary">Discover</a>
                <a href="#" className="text-gray-600 hover:text-greenPrimary">Cart</a>
                <a href="#" className="text-gray-600 hover:text-greenPrimary">Login</a>
            </div>
        </header>
    );
};


export default Header;
