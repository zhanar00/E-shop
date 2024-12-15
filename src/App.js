import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Default page for customers when opening the site
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Sidebar from "./components/layout/Sidebar";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Main Content */}
                <main className="flex-grow">
                    <Routes>
                        {/* Default Page (Home) */}
                        <Route path="/" element={<Home />} />
                        {/* Authentication Pages */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        {/* Product Pages */}
                        <Route path="/product/:id" element={<ProductDetails />} />
                        {/* Cart and Checkout */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </main>

            </div>
        </Router>
    );
};

export default App;
