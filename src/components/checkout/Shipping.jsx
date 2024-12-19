import React, { useState } from "react";
import { useSelector } from "react-redux";

const Shipping = ({ contactInfo, shippingAddress, nextStep, prevStep }) => {
    const cartItems = useSelector((state) => state.cart.items); // Получаем товары в корзине

    const [shippingMethod, setShippingMethod] = useState("standard"); // Стандартный метод по умолчанию
    const [shippingPercentage, setShippingPercentage] = useState(0); // Процент доставки

    const handleShippingMethodChange = (method) => {
        setShippingMethod(method);
        switch (method) {
            case "standard":
                setShippingPercentage(0);
                break;
            case "expedited":
                setShippingPercentage(10);
                break;
            case "express":
                setShippingPercentage(15);
                break;
            default:
                setShippingPercentage(0);
        }
    };

    // Рассчет стоимости
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = (subtotal * (shippingPercentage / 100)).toFixed(2);
    const total = (subtotal + parseFloat(shippingCost)).toFixed(2);

    const handleNextStep = () => {
        // Передаем все данные на следующий шаг
        nextStep({
            shippingMethod,
            shippingCost,
            contactInfo,
            shippingAddress,
        });
    };

    return (
        <div className="flex justify-between h-lvh">
            {/* Левая часть */}
            <div className="w-1/2 py-16 pl-56 pr-6">
                {/* Breadcrumb */}
                <div className="text-sm mb-6 text-gray-500">
                    <span className="text-green-500">Cart</span> {" > "}
                    <span className="text-green-500">Details</span> {" > "}
                    <span className="font-bold">Shipping</span> {" > "}
                    <span>Payment</span>
                </div>

                {/* Contact и Shipping Address */}
                <div className="border rounded-lg mb-6 p-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Contact</span>
                        <span className="text-black">{contactInfo.email}</span>
                        <button onClick={prevStep} className="text-green-500 hover:underline">Edit</button>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-500">Ship to</span>
                        <span className="text-black">
                            {shippingAddress.country}, {shippingAddress.city}, {shippingAddress.address}
                        </span>
                        <button onClick={prevStep} className="text-green-500 hover:underline">Edit</button>
                    </div>
                </div>

                {/* Shipping Method */}
                <h3 className="text-lg font-bold mb-4">Shipping method</h3>
                <div className="space-y-4">
                    <div
                        className={`flex justify-between p-4 border rounded-lg cursor-pointer hover:bg-green-50 ${
                            shippingMethod === "standard" ? "border-green-500" : ""
                        }`}
                        onClick={() => handleShippingMethodChange("standard")}
                    >
                        <div>
                            <p className="font-bold">Standard Shipping</p>
                            <p className="text-sm text-gray-500">Delivery within 5-7 business days.</p>
                        </div>
                        <span className="font-bold">0%</span>
                    </div>

                    <div
                        className={`flex justify-between p-4 border rounded-lg cursor-pointer hover:bg-green-50 ${
                            shippingMethod === "expedited" ? "border-green-500" : ""
                        }`}
                        onClick={() => handleShippingMethodChange("expedited")}
                    >
                        <div>
                            <p className="font-bold">Expedited Shipping</p>
                            <p className="text-sm text-gray-500">Delivery within 2-3 business days.</p>
                        </div>
                        <span className="font-bold">10%</span>
                    </div>

                    <div
                        className={`flex justify-between p-4 border rounded-lg cursor-pointer hover:bg-green-50 ${
                            shippingMethod === "express" ? "border-green-500" : ""
                        }`}
                        onClick={() => handleShippingMethodChange("express")}
                    >
                        <div>
                            <p className="font-bold">Express Shipping</p>
                            <p className="text-sm text-gray-500">Delivery within 1-2 business days.</p>
                        </div>
                        <span className="font-bold">15%</span>
                    </div>
                </div>

                {/* Back и Next */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={prevStep}
                        className="text-green-500 hover:underline text-sm font-medium"
                    >
                        Back to details
                    </button>
                    <button
                        onClick={handleNextStep}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
                    >
                        Go to payment
                    </button>
                </div>
            </div>

            {/* Правая часть - Order Summary */}
            <div className="w-1/2 bg-gray-50 py-16 pl-6 pr-60 rounded-lg">
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

                {/* Summary */}
                <div className="text-gray-700 border-t pt-4">
                    <p className="flex justify-between font-medium">
                        Subtotal: <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-medium">
                        Shipping: <span>{shippingPercentage}%</span>
                    </p>
                    <p className="flex justify-between border-t font-bold text-lg pt-2 mt-4">
                        Total: <span>${total}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
