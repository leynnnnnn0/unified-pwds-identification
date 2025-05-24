import React, { useState } from "react";
import { CheckCircle, Info, Star } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

const PlanCard = ({ plan, isSelected, onSelect, onChoose }) => {
    return (
        <div
            className={`rounded-xl border-2 transition-all duration-300 h-full flex flex-col ${
                plan.color
            } ${plan.borderColor} ${plan.hoverColor} ${
                plan.recommended ? "shadow-lg md:scale-105" : "shadow-md"
            }`}
        >
            {plan.recommended && (
                <div className="bg-blue-600 text-white py-1 px-3 absolute -right-1 -top-1 rounded-lg font-medium text-xs flex items-center">
                    <Star className="w-3 h-3 mr-1" /> RECOMMENDED
                </div>
            )}

            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                        {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">/ {plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <Button
                    onClick={() => onChoose(plan.product_id, plan.id)}
                    className={`w-full py-2 rounded-lg text-white font-medium text-sm transition-colors ${
                        plan.buttonColor
                    } ${
                        isSelected ? "ring-2 ring-opacity-50 ring-blue-300" : ""
                    }`}
                >
                    {isSelected ? "Selected" : "Choose Plan"}
                </Button>
            </div>
        </div>
    );
};

const Plans = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const isAuthenticated = usePage().props.auth?.user;

    const plans = [
        {
            name: "Silver",
            price: "₱250",
            period: "month",
            features: [
                "100 API Requests per month",
                "Basic Support",
                "Standard Response Time",
            ],
            color: "bg-gray-50",
            borderColor: "border-gray-200",
            hoverColor: "hover:border-gray-400",
            buttonColor: "bg-gray-500 hover:bg-gray-600",
            id: "price_1RNo2DH0KVHxP8CWfAcg2ohS",
            product_id: "prod_SIOpCxb9QabHGm",
        },
        {
            name: "Gold",
            price: "₱310",
            period: "month",
            features: [
                "250 API Requests per month",
                "Priority Support",
                "Faster Response Time",
                "Advanced Analytics",
            ],
            color: "bg-yellow-50",
            borderColor: "border-yellow-200",
            hoverColor: "hover:border-yellow-400",
            buttonColor: "bg-yellow-500 hover:bg-yellow-600",
            id: "price_1RNo47H0KVHxP8CWpWPOA9Zs",
            product_id: "prod_SIOrkY2gJyW45l",
        },
        {
            name: "Platinum",
            price: "₱380",
            period: "month",
            features: [
                "Unlimited API Requests",
                "Premium Support",
                "Instant Response Time",
                "Advanced Analytics",
                "Custom Integrations",
            ],
            color: "bg-blue-50",
            borderColor: "border-blue-200",
            hoverColor: "hover:border-blue-400",
            buttonColor: "bg-blue-500 hover:bg-blue-600",
            recommended: true,
            id: "price_1RNo5aH0KVHxP8CWIQvMeBaD",
            product_id: "prod_SIOt2uy0I2upNo",
        },
    ];

    const handleSelectPlan = (planName) => {
        setSelectedPlan(planName);
    };

    const choosePlan = (product, plan) => {
        const checkoutUrl = `/api/billing/checkout?plan=${encodeURIComponent(
            plan
        )}&product=${encodeURIComponent(product)}`;

        if (!isAuthenticated) {
            window.location.href = "/api/login";
            return;
        }

        window.open(checkoutUrl);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Choose Your Plan
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Select the perfect subscription tier that suits your
                        needs and budget
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
                    {plans.map((plan) => (
                        <div key={plan.name} className="relative">
                            <PlanCard
                                plan={plan}
                                isSelected={selectedPlan === plan.name}
                                onSelect={handleSelectPlan}
                                onChoose={choosePlan}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
