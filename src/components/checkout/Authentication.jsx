import React, { useState } from "react";
import { useSelector } from "react-redux";

const Authentication = ({ nextStep }) => {
    const cartItems = useSelector((state) => state.cart.items); // Fetch cart items
    const user = useSelector((state) => state.auth.user); // Fetch user profile

    const [email, setEmail] = useState(user?.email || "");
    const [shippingData, setShippingData] = useState({
        firstName: user?.name || "",
        lastName: user?.surname || "",
        address: user?.address || "",
        shippingNote: "",
        country: user?.country || "",
        city: user?.city || "",
        postalCode: user?.postalCode || "",
    });

    const [error, setError] = useState("");

    // Рассчитываем стоимость товаров
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        // Разрешаем только цифры для индекса
        if (name === "postalCode" && !/^\d*$/.test(value)) return;
        setShippingData({ ...shippingData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !shippingData.firstName || !shippingData.address || !shippingData.city || !shippingData.postalCode) {
            setError("Please fill in all required fields.");
            return;
        }
        setError("");
        nextStep({
            contactInfo: { email },
            shippingAddress: shippingData,
            shippingMethod: "standard", // Default
        });
    }; // Переход на следующий этап




    return (
        <div className="flex justify-between h-lvh">
            {/* Левая часть - форма */}
            <div className="w-1/2 py-16 pl-56 pr-6">
                {/* Навигация */}
                <div className="text-sm mb-6 text-gray-500">
                    <span className="text-green-500">Cart</span> {" > "}
                    <span className="font-bold">Details</span> {" > "}
                    <span>Shipping</span> {" > "}
                    <span>Payment</span>
                </div>

                {/* Контактная информация */}
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                {!user && (
                    <p className="text-gray-600 text-sm mb-4">
                        Do you have an account?{" "}
                        <a href="/login" className="text-green-500 hover:underline">
                            Login
                        </a>
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email or mobile phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />

                    {/* Адрес доставки */}
                    <h3 className="text-lg font-bold mt-6 mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Name*"
                            value={shippingData.firstName}
                            onChange={handleShippingChange}
                            className="p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Second Name*"
                            value={shippingData.lastName}
                            onChange={handleShippingChange}
                            className="p-3 border rounded-lg"
                        />
                    </div>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address and number*"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="shippingNote"
                        placeholder="Shipping note (optional)"
                        value={shippingData.shippingNote}
                        onChange={handleShippingChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="country"
                            placeholder="Country*"
                            value={shippingData.country}
                            onChange={handleShippingChange}
                            className="p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City*"
                            value={shippingData.city}
                            onChange={handleShippingChange}
                            className="p-3 border rounded-lg"
                        />
                    </div>
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code*"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    {/* Чекбокс для сохранения информации */}
                    <div className="flex items-center mt-4">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-600 text-sm">
                            Save this information for a future fast checkout
                        </span>
                    </div>

                    {/* Сообщение об ошибке */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Кнопки */}
                    <div className="flex justify-between items-center mt-6">
                        <a href="/cart" className="text-green-500 hover:underline text-sm font-medium">
                            Back to cart
                        </a>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
                        >
                            Go to shipping
                        </button>
                    </div>
                </form>
            </div>

            {/* Правая часть - итог и товары */}
            <div className="w-1/2 bg-gray-50 py-16 pl-6 pr-60 rounded-lg">
                {/* Товары */}
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center pb-4 border-b">
                        <img
                            src={item.image || "https://via.placeholder.com/80"}
                            alt={item.name}
                            className="w-40 h-32 rounded object-cover"
                        />
                        <div className="ml-4 self-start pt-4">
                            <p className="text-gray-700 font-medium">{item.name}</p>
                            {item.selectedSize && (
                                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                            )}
                        </div>
                        <p className="ml-auto text-green-700 font-bold self-start pt-4">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}

                {/* Итог */}
                <div className="text-gray-700 border-t pt-4">
                    <p className="flex justify-between font-medium">
                        Subtotal: <span>${subtotal.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Authentication;