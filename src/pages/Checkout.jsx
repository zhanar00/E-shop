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
        shippingMethod: "standard",
        shippingCost: 0,
        subtotal: 0,
        discount: 0,
        discountAmount: 0,
        totalAmount: 0,
    });

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const handleNextStep = (data) => {
        setCheckoutData((prevData) => ({
            ...prevData,
            ...data,
        }));
        nextStep();
    };

    return (
        <div className="flex justify-center items-start h-screen bg-white">
            <div className="w-full bg-white rounded-lg shadow-md">
                {currentStep === 1 && (
                    <Authentication nextStep={(data) =>
                        handleNextStep({
                            contactInfo: data.contactInfo,
                            shippingAddress: data.shippingAddress,
                            subtotal: data.subtotal,
                        })
                    } />
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
                            handleNextStep(data)
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
                        subtotal={checkoutData.subtotal}
                        shippingCostParsed={checkoutData.shippingCost}
                        discountAmount={checkoutData.discountAmount}
                        total={checkoutData.total}
                    />
                )}
            </div>
        </div>
    );
};

export default Checkout;
