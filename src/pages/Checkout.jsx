import React, { useState } from "react";
import Authentication from "../components/checkout/Authentication";
import Shipping from "../components/checkout/Shipping";
import Payment from "../components/checkout/Payment";
import Confirmed from "../components/checkout/Confirmed";

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [checkoutData, setCheckoutData] = useState({
        contactInfo: null,
        shippingAddress: null,
        shippingMethod: "standard", // Default shipping method
        shippingCost: 0, // Default shipping cost
        subtotal: 0, // Subtotal of the cart
        discount: 0, // Discount applied
        totalAmount: 0, // Final total
    });

    // Proceed to the next step
    const nextStep = () => setCurrentStep((prev) => prev + 1);

    // Go back to the previous step
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    // Update checkout data from components
    const handleNextStep = (data) => {
        setCheckoutData((prevData) => ({
            ...prevData,
            ...data, // Merge new data into the current checkout data
        }));
        nextStep();
    };

    // Ensure totalAmount is calculated and passed to Confirmed
    const calculateTotalAmount = () => {
        const subtotal = checkoutData.subtotal || 0;
        const shippingCost = parseFloat(checkoutData.shippingCost) || 0;
        const discount = (subtotal * (checkoutData.discount || 0)) / 100;
        const total = subtotal - discount + shippingCost;
        return total.toFixed(2);
    };

    return (
        <div className="flex justify-center items-start h-screen bg-white">
            <div className="w-full bg-white rounded-lg shadow-md">
                {/* Conditional Rendering for Steps */}
                {currentStep === 1 && (
                    <Authentication
                        nextStep={(data) =>
                            handleNextStep({
                                contactInfo: data.contactInfo,
                                shippingAddress: data.shippingAddress,
                                subtotal: data.subtotal,
                            })
                        }
                    />
                )}
                {currentStep === 2 && (
                    <Shipping
                        nextStep={(data) =>
                            handleNextStep({
                                shippingMethod: data.shippingMethod,
                                shippingCost: data.shippingCost,
                            })
                        }
                        prevStep={prevStep}
                        contactInfo={checkoutData.contactInfo}
                        shippingAddress={checkoutData.shippingAddress}
                        subtotal={checkoutData.subtotal}
                    />
                )}
                {currentStep === 3 && (
                    <Payment
                        prevStep={prevStep}
                        nextStep={(data) =>
                            handleNextStep({
                                discount: data.discount,
                                totalAmount: calculateTotalAmount(),
                            })
                        }
                        contactInfo={checkoutData.contactInfo}
                        shippingAddress={checkoutData.shippingAddress}
                        shippingMethod={checkoutData.shippingMethod}
                        shippingCost={checkoutData.shippingCost}
                        subtotal={checkoutData.subtotal}
                    />
                )}
                {currentStep === 4 && (
                    <Confirmed
                        contactInfo={checkoutData.contactInfo}
                        shippingAddress={checkoutData.shippingAddress}
                        shippingMethod={checkoutData.shippingMethod}
                        shippingCost={checkoutData.shippingCost}
                        discount={checkoutData.discount}
                        totalAmount={calculateTotalAmount()}
                        subtotal={checkoutData.subtotal}
                    />
                )}
            </div>
        </div>
    );
};

export default Checkout;
