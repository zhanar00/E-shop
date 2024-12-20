import React, { useState } from "react";
import { useSelector } from "react-redux";

const Payment = ({ contactInfo, shippingAddress, shippingMethod, shippingCost = 0, prevStep, nextStep }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");

    // Input states
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    // Mock valid coupons
    const validCoupons = {
        "SAVE10": 10, // 10% discount
        "SAVE20": 20, // 20% discount
    };

    // Handle coupon application
    const handleApplyCoupon = () => {
        if (validCoupons[couponCode]) {
            setDiscount(validCoupons[couponCode]);
            setError("");
        } else {
            setError("Invalid coupon code. Please try again.");
            setDiscount(0);
        }
    };

    // Calculate subtotal, discount amount, shipping, and total
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discount) / 100;
    const shippingCostParsed = parseFloat(shippingCost) || 0;
    const total = subtotal - discountAmount + shippingCostParsed;

    // Handle pay now action
    const handlePayNow = () => {
        if (!validateForm()) {
            alert("Please fix the errors in the form.");
            return;
        }
        alert("Payment successful!");
        nextStep({
            contactInfo,
            shippingAddress,
            shippingMethod,
            shippingCostParsed,
            discount,
            discountAmount,
            subtotal,
            total,
        });
    };

    // Form validation
    const validateForm = () => {
        if (!/^\d{16}$/.test(cardNumber)) {
            setError("Invalid card number. Must be 16 digits.");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(cardName)) {
            setError("Invalid cardholder name. Only letters and spaces are allowed.");
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            setError("Invalid expiration date. Format must be MM/YY.");
            return false;
        }
        if (!/^\d{3}$/.test(cvv)) {
            setError("Invalid CVV. Must be 3 digits.");
            return false;
        }
        setError("");
        return true;
    };

    return (
        <div className="flex justify-between h-lvh">
            {/* Left Section */}
            <div className="w-1/2 py-16 pl-56 pr-6">
                <div className="text-sm mb-6 text-gray-500">
                    <span className="text-green-500">Cart</span> {" > "}
                    <span className="text-green-500">Details</span> {" > "}
                    <span className="text-green-500">Shipping</span> {" > "}
                    <span className="font-bold">Payment</span>
                </div>

                {/* Contact Info */}
                <div className="border rounded-lg mb-6 p-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Contact</span>
                        <span className="text-black">{contactInfo?.email || "N/A"}</span>
                        <button ></button>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-500">Ship to</span>
                        <span className="text-black">
                            {shippingAddress?.country || "N/A"}, {shippingAddress?.city || "N/A"}, {shippingAddress?.address || "N/A"}
                        </span>
                        <button ></button>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-2">
                        <span className="text-gray-500">Method</span>
                        <span className="text-black">{shippingMethod || "Standard"} Shipping</span>
                        <button onClick={prevStep} className="text-green-500 hover:underline">Edit</button>
                    </div>
                </div>

                {/* Payment Method */}
                <h3 className="text-lg font-bold mb-4">Payment method</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-green-700 font-bold mb-2">Credit Card</h4>
                    <form>
                        <input
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                            maxLength="16"
                            className="w-full p-3 border rounded-lg mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Holder Name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                            className="w-full p-3 border rounded-lg mb-4"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Expiration (MM/YY)"
                                value={expirationDate}
                                onChange={(e) =>
                                    setExpirationDate(e.target.value.replace(/[^0-9/]/g, "").slice(0, 5))
                                }
                                maxLength="5"
                                className="p-3 border rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                maxLength="3"
                                className="p-3 border rounded-lg"
                            />
                        </div>
                    </form>
                </div>

                {/* Back and Pay Now Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <button onClick={prevStep} className="text-green-500 hover:underline text-sm font-medium">
                        Back to shipping
                    </button>
                    <button onClick={handlePayNow} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg">
                        Pay now
                    </button>
                </div>
            </div>

            {/* Right Section - Order Summary */}
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
                                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                            )}
                        </div>
                        <p className="ml-auto text-green-700 font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}

                {/* Coupon Code */}
                <div className="mb-4 pt-4">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-3/4 p-3 border rounded-lg"
                    />
                    <button
                        onClick={handleApplyCoupon}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                    >
                        Add code
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {discount > 0 && <p className="text-green-600 mt-2">Coupon Applied: {discount}% Off!</p>}
                </div>

                {/* Summary */}
                <div className="text-gray-700 border-t pt-4">
                    <p className="flex justify-between font-medium">
                        Subtotal: <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-medium">
                        Shipping: <span>${shippingCostParsed.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-medium">
                        Discount: <span>-${discountAmount.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between font-bold text-lg mt-4">
                        Total: <span>${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
