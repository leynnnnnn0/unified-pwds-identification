import React, { useState } from "react";
import { CheckCircle, PackagePlusIcon } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

const Plans = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            name: "Silver",
            price: "$10",
            period: "month",
            features: [
                "20 API Requests per day",
                "Basic Support",
                "Standard Response Time",
            ],
            color: "bg-gray-100",
            borderColor: "border-gray-300",
            hoverColor: "hover:border-gray-400",
            buttonColor: "bg-gray-500 hover:bg-gray-600",
            id: "price_1RNo5aH0KVHxP8CWIQvMeBaD",
            product_id: "prod_SIOpCxb9QabHGm",
        },
        {
            name: "Gold",
            price: "$15",
            period: "month",
            features: [
                "50 API Requests per day",
                "Priority Support",
                "Faster Response Time",
                "Advanced Analytics",
            ],
            color: "bg-yellow-50",
            borderColor: "border-yellow-300",
            hoverColor: "hover:border-yellow-400",
            buttonColor: "bg-yellow-500 hover:bg-yellow-600",
            id: "price_1RNo47H0KVHxP8CWpWPOA9Zs",
            product_id: "prod_SIOrkY2gJyW45l",
        },
        {
            name: "Platinum",
            price: "$20",
            period: "month",
            features: [
                "Unlimited API Requests",
                "Premium Support",
                "Instant Response Time",
                "Advanced Analytics",
                "Custom Integrations",
            ],
            color: "bg-blue-50",
            borderColor: "border-blue-300",
            hoverColor: "hover:border-blue-400",
            buttonColor: "bg-blue-500 hover:bg-blue-600",
            recommended: true,
            id: "price_1RNo5aH0KVHxP8CWIQvMeBaD",
            product_id: "prod_SIOt2uy0I2upNo",
        },
    ];

    const isAuthenticated = usePage().props.auth.user;

    const handleSelectPlan = (planName) => {
        setSelectedPlan(planName);
    };

    const choosePlan = (product, plan) => {
        const checkoutUrl = `/api/billing/checkout?plan=${encodeURIComponent(
            plan
        )}&product=${encodeURIComponent(product)}`;

        if (!isAuthenticated) window.open("/api/login");

        window.open(checkoutUrl);
    };

    return (
        <div className="min-h-fiat bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Select the perfect subscription tier that suits your
                        needs and budget
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl ${plan.color} border-2 ${
                                plan.borderColor
                            } ${
                                plan.hoverColor
                            } transition-all duration-300 overflow-hidden shadow-lg relative flex flex-col ${
                                plan.recommended
                                    ? "transform md:-translate-y-4"
                                    : ""
                            }`}
                        >
                            {plan.recommended && (
                                <div className="bg-blue-600 text-white py-1 px-4 absolute top-0 right-0 rounded-bl-lg font-medium text-sm">
                                    RECOMMENDED
                                </div>
                            )}

                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                        / {plan.period}
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start"
                                        >
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 bg-white border-t border-gray-200">
                                <Button
                                    onClick={() =>
                                        choosePlan(plan.product_id, plan.id)
                                    }
                                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                                        plan.buttonColor
                                    } ${
                                        selectedPlan === plan.name
                                            ? "ring-4 ring-opacity-50 ring-blue-300"
                                            : ""
                                    }`}
                                >
                                    {selectedPlan === plan.name
                                        ? "Selected"
                                        : "Choose Plan"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Need Something Custom?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        We offer custom enterprise solutions tailored to your
                        specific requirements. Contact our sales team to learn
                        more.
                    </p>
                    <button className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-lg font-medium transition-colors">
                        Contact Sales
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Plans;
