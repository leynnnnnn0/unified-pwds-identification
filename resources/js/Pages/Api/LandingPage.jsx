import React, { useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    CheckIcon,
    Mail,
    Phone,
    MapPin,
    Menu,
    X,
    ArrowRight,
} from "lucide-react";
import CodeContainer from "@/Components/code-container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@inertiajs/react";
import Plans from "@/Components/plans";
import LOGO from "../../../images/apiLogo.png";

const LandingPage = () => {
    // Refs for scrolling to each section
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const pricingRef = useRef(null);
    const documentationRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Smooth scroll function
    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const features = [
        {
            title: "Fast Verification",
            description:
                "Verify PWD IDs in seconds with our high-performance API",
        },
        {
            title: "Secure & Compliant",
            description:
                "Enterprise-grade security with full regulatory compliance",
        },
        {
            title: "Easy Integration",
            description:
                "Simple API integration with comprehensive documentation",
        },
        {
            title: "Scalable Solution",
            description:
                "Scale from hundreds to millions of verifications seamlessly",
        },
        {
            title: "24/7 Support",
            description:
                "Round-the-clock technical support for your business needs",
        },
    ];

    const partners = [
        { id: 1, name: "Department of Health" },
        { id: 2, name: "National Council on Disability Affairs" },
        { id: 3, name: "Department of Social Welfare" },
        { id: 4, name: "Philippine Health Insurance" },
        { id: 5, name: "Department of Transportation" },
        { id: 6, name: "Local Government Units" },
    ];

    return (
        <div className="font-sans bg-gradient-to-b from-white to-blue-50">
            {/* Header - Fixed for better UX */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 px-4 md:px-8 lg:px-16 xl:px-32 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src={LOGO} alt="Logo" className="h-12" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection(homeRef)}
                            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection(aboutRef)}
                            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection(pricingRef)}
                            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection(documentationRef)}
                            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        >
                            Documentation
                        </button>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/api/login"
                            className="hidden sm:inline-flex rounded-full bg-primary px-4 py-2 text-sm text-white font-medium hover:bg-primary-dark transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/api/register"
                            className="hidden sm:inline-flex rounded-full bg-white px-4 py-2 text-sm text-primary font-medium border border-primary hover:bg-blue-50 transition-colors"
                        >
                            Register
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-primary" />
                            ) : (
                                <Menu className="h-6 w-6 text-primary" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden">
                    <nav className="flex flex-col space-y-6 text-center py-8">
                        <button
                            onClick={() => scrollToSection(homeRef)}
                            className="text-lg font-medium text-gray-800 hover:text-primary"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection(aboutRef)}
                            className="text-lg font-medium text-gray-800 hover:text-primary"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection(pricingRef)}
                            className="text-lg font-medium text-gray-800 hover:text-primary"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection(documentationRef)}
                            className="text-lg font-medium text-gray-800 hover:text-primary"
                        >
                            Documentation
                        </button>
                        <div className="pt-4 flex flex-col gap-4">
                            <Link
                                href="/api/login"
                                className="w-full rounded-full bg-primary py-3 text-white font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/api/register"
                                className="w-full rounded-full bg-white py-3 text-primary font-medium border border-primary"
                            >
                                Register
                            </Link>
                        </div>
                    </nav>
                </div>
            )}

            {/* Content with padding to account for fixed header */}
            <div className="pt-16">
                {/* Hero Section */}
                <section
                    ref={homeRef}
                    className="px-4 md:px-8 lg:px-16 xl:px-32 py-16 md:py-24 flex flex-col items-center justify-center min-h-[85vh] max-w-7xl mx-auto"
                >
                    <div className="flex flex-col items-center text-center">
                        <span className="bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            Trusted by Government & Businesses
                        </span>
                        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl text-gray-900 leading-tight">
                            The <span className="text-primary">Fastest</span>{" "}
                            PWD ID Verification Platform
                        </h1>
                        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
                            Streamline accessibility compliance with our secure,
                            reliable API solutions for instant PWD ID
                            verification.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                            <Button className="w-full sm:w-auto rounded-full px-8 py-6 bg-primary hover:bg-primary-dark text-white font-medium text-base">
                                Get Started Free
                            </Button>
                            <Button
                                onClick={() =>
                                    scrollToSection(documentationRef)
                                }
                                className="w-full sm:w-auto rounded-full px-8 py-6 bg-white text-primary border border-primary hover:bg-blue-50 font-medium text-base flex items-center gap-2"
                            >
                                View Documentation <ArrowRight size={16} />
                            </Button>
                        </div>

                        {/* <div className="mt-12 bg-blue-50 rounded-lg p-4 text-sm text-blue-700 max-w-md">
                            <p className="font-medium">
                                No credit card required to start
                            </p>
                            <p className="mt-1 text-blue-600">
                                Get 100 free verifications every month
                            </p>
                        </div> */}
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="py-12 bg-white">
                    <div className="px-4 md:px-8 lg:px-16 xl:px-32 max-w-7xl mx-auto">
                        <h2 className="text-center text-sm font-medium text-gray-600 uppercase tracking-wide mb-8">
                            Trusted by leading organizations
                        </h2>
                        <div className="py-4">
                            <Slider {...carouselSettings}>
                                {partners.map((partner) => (
                                    <div key={partner.id} className="px-4">
                                        <div className="h-12 flex items-center justify-center">
                                            <div className="text-gray-500 font-medium">
                                                {partner.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    ref={aboutRef}
                    className="px-4 md:px-8 lg:px-16 xl:px-32 py-20 max-w-7xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Comprehensive Verification Solutions
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Our API delivers fast, secure, and compliant PWD ID
                            verification for businesses of all sizes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                            >
                                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <CheckIcon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Solutions Section */}
                <section className="px-4 md:px-8 lg:px-16 xl:px-32 py-20 bg-gradient-to-br from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    API Solutions
                                </span>
                                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                                    Tailored verification solutions for every
                                    business
                                </h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Choose the plan that fits your
                                    organization's needs and scale as you grow.
                                    Our flexible API solutions adapt to your
                                    business requirements.
                                </p>

                                <div className="space-y-4 mt-8">
                                    {[
                                        "Basic Verification",
                                        "Premium Security",
                                        "Advanced Analytics",
                                        "Customizable Integration",
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckIcon className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    {item}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {index === 0 &&
                                                        "Quick verification for simple needs"}
                                                    {index === 1 &&
                                                        "Enhanced security protocols for sensitive data"}
                                                    {index === 2 &&
                                                        "Detailed verification analytics and reporting"}
                                                    {index === 3 &&
                                                        "Custom solutions for complex business requirements"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl bg-blue-50 flex flex-col">
                                    <h3 className="font-bold text-xl text-primary mb-2">
                                        Basic Verification
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Essential verification for accessibility
                                        compliance
                                    </p>
                                    <div className="mt-auto">
                                        <span className="text-3xl font-bold text-gray-900">
                                            ₱600
                                        </span>
                                        <span className="text-gray-600">
                                            /month
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            50 verifications included
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-xl bg-primary text-white flex flex-col">
                                    <div className="bg-blue-700 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded inline-block w-fit mb-2">
                                        Popular
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">
                                        Platinum Tier
                                    </h3>
                                    <p className="text-sm text-blue-100 mb-4">
                                        Good for big businesses
                                    </p>
                                    <div className="mt-auto">
                                        <span className="text-3xl font-bold">
                                            ₱900.00
                                        </span>
                                        <span className="text-blue-100">
                                            /month
                                        </span>
                                        <p className="text-xs text-blue-100 mt-1">
                                            Unlimited verifications included
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 mt-4">
                                    <Button
                                        onClick={() =>
                                            scrollToSection(pricingRef)
                                        }
                                        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                    >
                                        View All Pricing Options
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section
                    ref={pricingRef}
                    className="px-4 md:px-8 lg:px-16 xl:px-32 py-20"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Choose the perfect plan for your business needs
                                with no hidden fees
                            </p>
                        </div>

                        <Plans />
                    </div>
                </section>

                {/* Documentation Section */}
                <section
                    ref={documentationRef}
                    className="px-4 md:px-8 lg:px-16 xl:px-32 py-20 bg-white"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Comprehensive API Documentation
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Everything you need to integrate our
                                verification services into your applications
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <CodeContainer />

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Simple Integration
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Our API is designed for developers, with
                                    clear documentation and examples to get you
                                    up and running quickly. Implement PWD ID
                                    verification in minutes, not days.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-gray-700">
                                            RESTful API with JSON responses
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-gray-700">
                                            Libraries for major programming
                                            languages
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-gray-700">
                                            Detailed request and response
                                            examples
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button className="rounded-lg px-6 py-3 bg-primary hover:bg-primary-dark text-white">
                                        View Full Documentation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {/* <section className="px-4 md:px-8 lg:px-16 xl:px-32 py-16 bg-primary">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Ready to simplify PWD ID verification?
                        </h2>
                        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                            Get started today with our secure, compliant, and
                            easy-to-use API platform
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button className="w-full sm:w-auto rounded-lg px-8 py-3 bg-white text-primary hover:bg-gray-100">
                                Start Free Trial
                            </Button>
                            <Button className="w-full sm:w-auto rounded-lg px-8 py-3 bg-transparent text-white border border-white hover:bg-blue-800">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </section> */}

                {/* Footer */}
                <footer className="px-4 md:px-8 lg:px-16 xl:px-32 py-12 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            <div>
                                <div className="flex items-center space-x-2 mb-6">
                                    <img
                                        src={LOGO}
                                        alt="Logo"
                                        className="h-12"
                                    />
                                </div>
                                <p className="text-gray-400 mb-6">
                                    The leading platform for PWD ID
                                    verification, helping businesses meet
                                    accessibility compliance requirements.
                                </p>
                                <div className="flex space-x-4">
                                    {/* Social icons would go here */}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <button
                                            onClick={() =>
                                                scrollToSection(homeRef)
                                            }
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Home
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                scrollToSection(aboutRef)
                                            }
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Features
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                scrollToSection(pricingRef)
                                            }
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Pricing
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                scrollToSection(
                                                    documentationRef
                                                )
                                            }
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Documentation
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Resources
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            API Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Developer Guide
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Integration Examples
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            Support Center
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Contact Us
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-primary" />
                                        <a
                                            href="mailto:contact@pwdverify.com"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            contact@pwdverify.com
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-primary" />
                                        <a
                                            href="tel:+15551234567"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            +1 (555) 123-4567
                                        </a>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <MapPin className="h-5 w-5 text-primary mt-1" />
                                        <span className="text-gray-400">
                                            123 Tech Street, Manila, Philippines
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} PWD Verification
                                Platform. All rights reserved.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
