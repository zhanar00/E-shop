import React, { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        contact: "",
        firstName: "",
        secondName: "",
        gender: "",
        day: "",
        month: "",
        year: "",
        password: "",
        rePassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                {/* Logo */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center">
                        <span className="mr-2 text-green-500 text-3xl">🍃</span>
                        <span className="text-green-500">Candleaf</span>
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Contact */}
                    <div>
                        <label className="block font-medium mb-1">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Email or mobile phone number*"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    {/* Name Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Name*"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                            type="text"
                            name="secondName"
                            placeholder="Second Name*"
                            value={formData.secondName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">gender*</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="grid grid-cols-3 gap-4">
                        <select
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">day*</option>
                            {[...Array(31).keys()].map((n) => (
                                <option key={n + 1} value={n + 1}>
                                    {n + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">month*</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                                (month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                )
                            )}
                        </select>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">year*</option>
                            {[...Array(100).keys()].map((n) => (
                                <option key={2024 - n} value={2024 - n}>
                                    {2024 - n}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Password Section */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password*"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="rePassword"
                            placeholder="re-enter password*"
                            value={formData.rePassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    {/* Submit and Login Link */}
                    <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Do you have an account? <a href="/login" className="text-green-500 hover:underline">Login</a>
            </span>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
