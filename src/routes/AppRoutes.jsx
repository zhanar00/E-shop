import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound"; // 404 page
import Wishlist from "../pages/Wishlist";


console.log("Home:", Home);
console.log("Login:", Login);
console.log("Signup:", Signup);
console.log("ProductDetails:", ProductDetails);
console.log("Cart:", Cart);
console.log("Checkout:", Checkout);
console.log("Profile:", Profile);
console.log("ProtectedRoute:", ProtectedRoute);
console.log("NotFound:", NotFound);

const AppRoutes = () => {
    return (
        <Routes>
            {/* Default Page */}
            <Route path="/" element={<Home />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="/collections" element={<Collections />} /> */}

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback for 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
