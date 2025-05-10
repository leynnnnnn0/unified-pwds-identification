import React from "react";
import Logo from "../../../images/mainLogo.jpg";
import { Button } from "@/Components/ui/button";
import BANDWDOH from "../../../images/doh.png";
import BANDWLOGO from "../../../images/mainLogo.jpg";
import { CheckIcon, Mail, Phone, MapPin } from "lucide-react";
import CodeContainer from "@/Components/code-container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPage = () => {
    // Settings for the image carousel
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const partners = [
        { id: 1, logo: BANDWDOH, alt: "DOH Logo" },
        { id: 2, logo: BANDWLOGO, alt: "Main Logo" },
        { id: 3, logo: BANDWDOH, alt: "DOH Logo" },
        { id: 4, logo: BANDWLOGO, alt: "Main Logo" },
        { id: 5, logo: BANDWDOH, alt: "DOH Logo" },
    ];

    return (
        <div className="px-4 md:px-32 py-5 min-h-screen font-monteserat bg-gradient-to-b from-white to-blue-50">
            {/* Header */}
            <div className="flex items-center justify-between">
                <img src={Logo} className="h-8" alt="Company Logo" />

                <div className="hidden md:flex items-center justify-between gap-10">
                    <span className="text-sm text-primary font-bold hover:text-primary-dark cursor-pointer transition-colors">
                        Home
                    </span>
                    <span className="text-sm text-primary font-bold hover:text-primary-dark cursor-pointer transition-colors">
                        Pricing
                    </span>
                    <span className="text-sm text-primary font-bold hover:text-primary-dark cursor-pointer transition-colors">
                        Documentation
                    </span>
                    <span className="text-sm text-primary font-bold hover:text-primary-dark cursor-pointer transition-colors">
                        About Us
                    </span>
                </div>

                <button className="rounded-full bg-primary text-sm px-6 py-2 text-white font-bold hover:bg-primary-dark transition-colors">
                    Login
                </button>
            </div>

            {/* Hero Section */}
            <div className="mt-20 md:mt-40 w-full flex items-center justify-center">
                <div className="flex flex-col gap-5 items-center">
                    <h1 className="font-bold text-3xl md:text-5xl max-w-[900px] text-center text-primary">
                        The fastest and most powerful platform for PWD ID
                        verification
                    </h1>
                    <p className="text-gray-600 text-center max-w-[600px]">
                        Build transformative AI experiences powered by
                        industry-leading models and tools.
                    </p>

                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        <Button className="rounded-full px-8 md:px-10 py-3 md:py-5 bg-primary hover:bg-primary-dark text-white">
                            Get Started
                        </Button>
                        <Button className="rounded-full px-8 md:px-10 py-3 md:py-5 bg-white text-primary border border-primary hover:bg-gray-50">
                            View API Pricing
                        </Button>
                    </div>
                </div>
            </div>

            {/* Partners Carousel */}
            <div className="mt-16">
                <Slider {...carouselSettings}>
                    {partners.map((partner) => (
                        <div key={partner.id} className="px-2">
                            <div className="flex items-center justify-center h-24">
                                <img
                                    src={partner.logo}
                                    alt={partner.alt}
                                    className="max-h-full max-w-full object-contain h-24"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* API Solutions */}
            <div className="mt-16 flex items-center flex-col justify-center gap-7">
                <h1 className="font-bold text-2xl md:text-3xl max-w-[900px] text-center text-primary">
                    API Verification Solutions
                </h1>
                <p className="max-w-[700px] text-center text-gray-600">
                    Streamline PWD ID verification with our secure, reliable API
                    solutions designed for businesses of all sizes. Fast,
                    compliant, and integration-ready.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-7 w-full">
                    <div className="p-5 rounded-lg border w-full h-fit space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            Basic Verification
                        </h1>
                        <p className="text-gray-600">
                            Essential verification solution for businesses
                            starting to implement accessibility compliance
                        </p>

                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <p
                                    key={item}
                                    className="flex gap-2 items-center text-sm text-gray-700"
                                >
                                    <CheckIcon className="size-5 text-green-500" />
                                    Fast Verification
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 rounded-lg border w-full h-fit space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            Business Plus
                        </h1>
                        <p className="text-gray-600">
                            Advanced solution balancing comprehensive
                            verification with operational efficiency
                        </p>

                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <p
                                    key={item}
                                    className="flex gap-2 items-center text-sm text-gray-700"
                                >
                                    <CheckIcon className="size-5 text-green-500" />
                                    Fast Verification
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* API Power Section */}
            <div className="px-0 bg-white w-full mt-20 py-10">
                <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
                    Access the power of our models with APIs
                </h1>

                <div className="mt-10 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-10 w-full px-4 md:px-0">
                    <CodeContainer />
                    <div className="flex flex-col gap-5 max-w-[500px]">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            Web Search
                        </h1>
                        <p className="text-gray-600">
                            Enhance model responses with up-to-date and clearly
                            cited answers from the web using the same
                            capabilities as ChatGPT search.
                        </p>
                        <a
                            href="#"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                            Learn more <span className="text-lg">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-primary-color text-white mt-20 py-10 px-4 md:px-32">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img
                            src={Logo}
                            className="h-8 mb-4"
                            alt="Company Logo"
                        />
                        <p className="text-sm text-white/80">
                            The fastest and most powerful platform for PWD ID
                            verification.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    API Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Developer Guides
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li className="flex items-center gap-2">
                                <Mail className="size-4" />
                                contact@pwdverification.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="size-4" />
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="size-4" />
                                123 Tech Street, Manila, Philippines
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-10 pt-6 text-sm text-white/60 text-center">
                    <p>
                        © {new Date().getFullYear()} PWD Verification Platform.
                        All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
