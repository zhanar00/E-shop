import React from "react";
import {useSelector} from "react-redux";

const Confirmed = ({
                       contactInfo = {},
                       shippingAddress = {},
                       subtotal = 0,
                       shippingCostParsed = 0,
                       discountAmount = 0,
                       total = 0,

                   }) => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random order number
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div className="flex justify-between h-screen">
            {/* Left Section */}
            <div className="w-1/2 py-16 pl-56 pr-6">
                <div className="text-sm mb-6 text-gray-500">
                    <span className="text-green-500">Cart</span> {" > "}
                    <span className="text-green-500">Details</span> {" > "}
                    <span className="text-green-500">Shipping</span> {" > "}
                    <span className="text-green-500">Payment</span> {" > "}
                </div>

                <div className="flex flex-col items-center mt-16">
                    <div className="text-green-500 text-6xl mb-4">✔</div>
                    <h2 className="text-2xl font-bold mb-2">Payment Confirmed</h2>
                    <p className="text-gray-500">ORDER #{orderNumber}</p>
                    <p className="text-black-800 font-bold text-xl text-left mt-4">
                        {contactInfo?.email || ""}
                    </p>
                    <p className="text-gray-600 text-left ">
                        Thank you for your purchase! Your order is confirmed and will ship soon.
                    </p>
                    <p className="text-black-800  text-left ">
                        Shipping address {shippingAddress?.address || ""}
                    </p>

                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg mt-6"
                        onClick={() => {
                            // Подготовка данных для заказа
                            const orderData = {
                                contactInfo,
                                shippingAddress,
                                cartItems,
                                subtotal: subtotal.toFixed(2),
                                shippingCost: parseFloat(shippingCostParsed || 0).toFixed(2),
                                discountAmount: discountAmount.toFixed(2),
                                total: total.toFixed(2),
                            };

                            // Лог данных заказа в консоль
                            console.log("Order Data:", orderData);

                            // Переход на главную страницу
                            window.location.href = "/";
                        }}
                    >
                        Back to shopping
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-gray-50 py-16 pl-6 pr-60 rounded-lg">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-4">
                        <img
                            src={item.image || "https://via.placeholder.com/80"}
                            alt={item.name}
                            className="w-40 h-32 rounded object-cover"
                        />
                        <div className="ml-4">
                            <p className="font-medium">{item.name}</p>
                            {item.selectedSize && (
                                <p className="text-sm text-gray-500">Size: {item.selectedSize} </p>
                            )}
                            {item.quantity && (
                                <p className="text-sm text-gray-500">Count: {item.quantity} </p>
                            )}
                        </div>
                        <p className="ml-auto text-green-700 font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
                <div className="text-gray-700 border-t pt-4">
                    <p className="flex justify-between font-medium">
                        Subtotal: <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-medium">
                        Shipping: <span>${parseFloat(shippingCostParsed || 0).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-medium">
                        Discount: <span>-${discountAmount.toFixed(2)}</span>
                    </p>
                    <p className="text-green-700 flex justify-between font-bold text-lg mt-4 border-t">
                        PAID: <span>${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Confirmed;
