import React, { useState } from "react";
import { Check, Key, Code, ExternalLink } from "lucide-react";
import CodeContainer from "@/Components/code-container";
import { Link } from "@inertiajs/react";
import APIKEYPAGE from "../../../images/api-page.png";
const Documentation = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">
                        Card Verification API
                    </h1>
                    <p className="text-xl">
                        Simple and secure card validation for your application
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                    <p className="mb-6">
                        Follow these simple steps to integrate our card
                        verification API into your application:
                    </p>

                    {/* Steps */}
                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                                <span className="flex items-center justify-center h-6 w-6 text-blue-600 font-bold">
                                    1
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Subscribe to a Plan
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Ensure you have an active subscription to
                                    access our API services.
                                </p>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <Check
                                            className="text-green-500 mr-2"
                                            size={20}
                                        />
                                        <span className="font-medium">
                                            Choose a plan that fits your needs
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check
                                            className="text-green-500 mr-2"
                                            size={20}
                                        />
                                        <span className="font-medium">
                                            Access to our verification endpoints
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/api"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-blue-700 transition w-fit"
                                    >
                                        <ExternalLink
                                            size={18}
                                            className="mr-2"
                                        />
                                        View Subscription Plans
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                                <span className="flex items-center justify-center h-6 w-6 text-blue-600 font-bold">
                                    2
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Generate an API Key
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Create a unique API key from your dashboard
                                    to authenticate your requests.
                                </p>
                                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                    <div className="flex items-center">
                                        <Key
                                            className="text-blue-600 mr-2"
                                            size={20}
                                        />
                                        <span className="font-medium">
                                            Your API key provides secure access
                                            to our services
                                        </span>
                                    </div>
                                </div>
                                <img
                                    src={APIKEYPAGE}
                                    alt="API Key Generation"
                                    className="rounded-lg border border-gray-200 w-full max-w-lg mb-4"
                                />
                                <div className="mt-4">
                                    <Link
                                        href="/api/api-keys"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-blue-700 transition w-fit"
                                    >
                                        <Key size={18} className="mr-2" />
                                        Generate API Key
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                                <span className="flex items-center justify-center h-6 w-6 text-blue-600 font-bold">
                                    3
                                </span>
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-bold mb-2">
                                    Implement the API
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Integrate our verification API into your
                                    application using the code examples below.
                                </p>

                                {/* Code tabs */}
                                <CodeContainer />

                                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                    <h4 className="font-bold mb-2">
                                        API Endpoint
                                    </h4>
                                    <code className="bg-gray-200 px-2 py-1 rounded text-blue-800">
                                        GET
                                        http://leyn19-001-site1.otempurl.com/api/verification
                                    </code>

                                    <h4 className="font-bold mt-4 mb-2">
                                        Required Parameters
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <code className="bg-gray-200 px-2 py-1 rounded text-blue-800 mr-2">
                                                secret_key
                                            </code>
                                            <span>
                                                Your unique API key generated
                                                from your dashboard
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <code className="bg-gray-200 px-2 py-1 rounded text-blue-800 mr-2">
                                                card_uid
                                            </code>
                                            <span>
                                                The unique identifier of the
                                                card to verify
                                            </span>
                                        </li>
                                    </ul>

                                    <h4 className="font-bold mt-4 mb-2">
                                        Response Format
                                    </h4>
                                    <pre className="bg-gray-200 p-3 rounded text-sm">
                                        {`{
  "status": "success",
  "data": {
    "is_valid": true,
    "card_details": {
      "uid": "1434534645654346545",
      "type": "standard",
      "expiry_date": "2025-12-31"
    }
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                                <span className="flex items-center justify-center h-6 w-6 text-blue-600 font-bold">
                                    4
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Ready to Go!
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    You've successfully integrated our card
                                    verification API. Your application can now
                                    verify cards in real-time.
                                </p>
                                <div className="bg-green-100 rounded-lg p-4 border-l-4 border-green-500">
                                    <div className="flex">
                                        <Check
                                            className="text-green-600 mr-2 flex-shrink-0"
                                            size={24}
                                        />
                                        <p className="text-green-800">
                                            Your implementation is complete.
                                            Start verifying cards with
                                            confidence!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-lg">
                                How secure is the API?
                            </h3>
                            <p className="text-gray-700">
                                Our API uses industry-standard encryption and
                                authentication measures to ensure your data
                                remains secure. All API requests must include
                                your secret key for validation.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">
                                What happens if my API key is compromised?
                            </h3>
                            <p className="text-gray-700">
                                If you suspect your API key has been
                                compromised, you should immediately revoke it
                                from your dashboard and generate a new one. Your
                                dashboard provides tools to monitor API usage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-white py-8 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">
                                Card Verification API
                            </h3>
                            <p className="text-gray-400">
                                © 2025 All Rights Reserved
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white"
                            >
                                Documentation
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white"
                            >
                                Support
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white"
                            >
                                Pricing
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
