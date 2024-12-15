import React, { useState } from "react";

const LoginPage = () => {
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact:", contact);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                {/* Logo */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">🍃 Candleaf</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Contact */}
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">
                            Contact
                        </label>
                        <input
                            type="text"
                            id="contact"
                            placeholder="Email or mobile phone number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-green-600 focus:ring-green-400 border-gray-300 rounded"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <div className="flex justify-between items-center">
                        {/* Register Link */}
                        <span className="text-sm text-gray-600">
                        You don’t have an account yet? <a href="/signup" className="text-green-500 hover:underline">Register</a>
                        </span>
                        {/* Submit Button */}
                        <button type="submit"
                                className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
