// src/pages/Profile.jsx
import React, {useRef, useState} from "react";
import EditProfile from "../components/profile/EditProfile";
import Orders from "../components/profile/Orders";
import Favorites from "../components/profile/Favorites";
import Header from "../components/layout/Header";
import pencil from '../assets/icons/pencil.png'
import orders from '../assets/icons/orders.png'
import heart from '../assets/icons/heart-icon.png'
import Footer from "../components/layout/Footer";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {logout} from "../redux/authSlice";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("edit");
    const user = useSelector((state) => state.auth.user); // Access auth state
    const cartItems = useSelector((state) => state.cart.items); // Access cart state
    const dispatch = useDispatch();
    const navigate = useNavigate(); // To redirect after logout

    const handleLogout = () => {
        navigate("/"); // Redirect to login page
        dispatch(logout()); // Clear user data from Redux store
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="flex flex-1 max-w-7xl mx-auto mt-6 py-12">
                {/* Sidebar Navigation */}
                <aside className="w-1/4 border-r p-4 ">
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => setActiveTab("edit")}
                                className={`w-full flex  p-2 px-7 items-center gap-2
                                 rounded-[30px] border border-[#818181]/20
                                 ${
                                    activeTab === "edit" ? "bg-gray-200" : "bg-white"
                                }`}
                            >
                                <img src={pencil} className="w-4" alt=""/>
                                Edit Profile
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`w-full  p-2 flex items-center gap-2 px-7
                                rounded-[30px] border border-[#818181]/20
                                ${
                                    activeTab === "orders" ? "bg-gray-200" : "bg-white"
                                }`}
                            >
                                <img src={orders} className="w-4" alt=""/>
                                Orders
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("favorites")}
                                className={`w-full text-left p-2  flex items-center gap-2 px-7
                                 rounded-[30px] border border-[#818181]/20
                                 ${
                                    activeTab === "favorites" ? "bg-gray-200" : "bg-white"
                                }`}
                            >
                                <img src={heart} className="w-4" alt=""/>
                                Favorites
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className={`w-full flex  p-2 px-7 items-center gap-2
                                 rounded-[30px] border border-[#818181]/20`}>
                                <img src={pencil} className="w-4" alt=""/>
                                Logout
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Content Section */}
                <section className="w-[45vw] p-6 border-2 border-r-red-50 ">
                    {activeTab === "edit" && <EditProfile user={user}/>}
                    {activeTab === "orders" && <Orders/>}
                    {activeTab === "favorites" && <Favorites/>}
                </section>
            </div>

            <Footer/>
        </div>
    );
};

export default Profile;
