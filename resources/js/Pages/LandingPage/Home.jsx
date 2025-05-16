import React from "react";
import { useState, useEffect } from "react";
import MainLogo from "../../../images/mainLogo.jpg";
import Step1 from "../../../images/step1.png";
import Step2 from "../../../images/step2.png";
import Step3 from "../../../images/step3.png";
import UI from "../../../images/ui.png";
import FRONTEND from "../../../images/front.png";
import FULLSTACK from "../../../images/full.png";
import CEO from "../../../images/ceo.png";
import BACKEND from "../../../images/back.png";
import MISSION from "../../../images/mission.jpg";
import VISION from "../../../images/vision.jpg";

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState({});
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));

                        // Update active section for navigation highlighting
                        if (entry.target.id) {
                            setActiveSection(entry.target.id);
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: "-100px 0px" }
        );

        document.querySelectorAll(".observe-section").forEach((section) => {
            observer.observe(section);
        });

        return () => {
            document.querySelectorAll(".observe-section").forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    const navItems = [
        { id: "home", label: "Home" },
        { id: "steps", label: "How It Works" },
        { id: "mission", label: "About" },
        { id: "team", label: "Team" },
        { id: "contact", label: "Contact" },
    ];
    return (
        <>
            <div className="min-h-screen max-w-screen flex flex-col bg-white relative">
                {/* Fixed Header */}
                <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm py-4 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 z-50">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={MainLogo}
                                alt="UPID Logo"
                                className="h-8 mr-4"
                            />
                        </div>

                        <button
                            className="md:hidden z-10 text-gray-700"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        <ul className="hidden md:flex items-center justify-between gap-6 lg:gap-10 font-medium font-[inter] text-gray-600 text-sm">
                            {navItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={`cursor-pointer transition-colors duration-300 hover:text-primary-color ${
                                        activeSection === item.id
                                            ? "text-primary-color font-bold"
                                            : ""
                                    }`}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>

                        <div className="hidden md:flex items-center justify-center gap-3 lg:gap-5">
                            <a
                                href="/login"
                                className="font-[inter] text-sm text-gray-700 hover:text-primary-color transition-colors duration-300"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                className="font-[inter] px-5 py-2 bg-primary-color text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Create an Account
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <div
                        className={`fixed inset-0 bg-white h-fit z-40 md:hidden max-w-screen transition-transform duration-300 ease-in-out ${
                            isMenuOpen ? "translate-x-0" : "hidden"
                        }`}
                    >
                        <div className="flex flex-col h-full p-8">
                            <div className="flex justify-between items-center mb-10">
                                <img
                                    src={MainLogo}
                                    alt="UPID Logo"
                                    className="h-8"
                                />
                                <button
                                    className="text-gray-700"
                                    onClick={toggleMenu}
                                    aria-label="Close menu"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <ul className="flex flex-col gap-6 font-medium text-lg">
                                {navItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="hover:text-primary-color transition-colors duration-300"
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto flex flex-col gap-4">
                                <a
                                    href="/login"
                                    className="py-3 text-center text-gray-700 hover:text-primary-color transition-colors duration-300"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="py-3 bg-primary-color text-white rounded-full font-medium hover:bg-blue-800 transition-all duration-300 text-center shadow-md"
                                >
                                    Create an Account
                                </a>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section
                    id="home"
                    className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-16 md:py-24 flex flex-col items-center observe-section relative overflow-hidden"
                >
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-l from-blue-50 to-transparent opacity-70 rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-r from-blue-50 to-transparent opacity-70 rounded-tr-full"></div>
                    </div>

                    <div className="max-w-5xl mx-auto text-center z-10 flex flex-col justify-center items-center">
                        <h1
                            className={`font-[montserrat] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight transition-all duration-1000 ${
                                isVisible["home"]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            Your One-Stop Solution for{" "}
                            <span className="text-primary-color">PWD ID</span>{" "}
                            Creation and Verification
                        </h1>

                        <p
                            className={`max-w-3xl mx-auto text-gray-600 font-[inter] mt-6 md:mt-8 text-center text-base sm:text-lg transition-all duration-1000 delay-300 ${
                                isVisible["home"]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            A seamless connection between government support and
                            business innovation, delivering PWD services with
                            just a few taps.
                        </p>

                        <div
                            className={`flex items-center justify-center w-full mt-8 md:mt-12 transition-all duration-1000 delay-500 ${
                                isVisible["home"]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <button
                                onClick={() => scrollToSection("steps")}
                                className="font-[inter] px-8 py-4 bg-primary-color text-white rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                            >
                                Get Started
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section
                    id="steps"
                    className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 observe-section"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span
                                className={`inline-block text-tertiary-color font-semibold uppercase tracking-wider text-sm mb-3 transition-all duration-700 ${
                                    isVisible["steps"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                HOW IT WORKS
                            </span>
                            <h2
                                className={`font-[montserrat] font-bold text-3xl md:text-4xl text-gray-900 transition-all duration-700 delay-200 ${
                                    isVisible["steps"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                Simple steps to get your UPID
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                            <div
                                className={`bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-700 ${
                                    isVisible["steps"]
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-20"
                                } hover:shadow-2xl hover:transform hover:scale-105 border-b-4 border-primary-color`}
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="bg-blue-50 p-4 rounded-full">
                                        <img
                                            src={Step1}
                                            alt="Create a request"
                                            className="h-20 w-20 object-contain"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-[inter] text-gray-900 font-bold text-xl text-center mb-4">
                                    Create a Request
                                </h3>
                                <p className="font-[inter] text-gray-600 text-center">
                                    Fill out our simple application form with
                                    your personal details and submit the
                                    required documentation through our secure
                                    portal.
                                </p>
                            </div>

                            <div
                                className={`bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-700 delay-200 ${
                                    isVisible["steps"]
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-20"
                                } hover:shadow-2xl hover:transform hover:scale-105 border-b-4 border-secondary-color`}
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="bg-orange-50 p-4 rounded-full">
                                        <img
                                            src={Step2}
                                            alt="Wait for verification"
                                            className="h-20 w-20 object-contain"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-[inter] text-gray-900 font-bold text-xl text-center mb-4">
                                    Wait for Verification
                                </h3>
                                <p className="font-[inter] text-gray-600 text-center">
                                    Our team will carefully review your
                                    application and verify your identity. This
                                    process typically takes 1-3 business days to
                                    complete.
                                </p>
                            </div>

                            <div
                                className={`bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-700 delay-400 ${
                                    isVisible["steps"]
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-20"
                                } hover:shadow-2xl hover:transform hover:scale-105 border-b-4 border-tertiary-color`}
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="bg-teal-50 p-4 rounded-full">
                                        <img
                                            src={Step3}
                                            alt="Enjoy the perks"
                                            className="h-20 w-20 object-contain"
                                        />
                                    </div>
                                </div>
                                <h3 className="font-[inter] text-gray-900 font-bold text-xl text-center mb-4">
                                    Enjoy the Perks of UPID
                                </h3>
                                <p className="font-[inter] text-gray-600 text-center">
                                    Access all UPID benefits including
                                    streamlined verification across services,
                                    enhanced security features, and simplified
                                    digital transactions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission and Vision Section */}
                <section
                    id="mission"
                    className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-16 md:py-24 bg-primary-color/5 observe-section"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span
                                className={`inline-block text-primary-color font-semibold uppercase tracking-wider text-sm mb-3 transition-all duration-700 ${
                                    isVisible["mission"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                ABOUT US
                            </span>
                            <h2
                                className={`font-[montserrat] font-bold text-3xl md:text-4xl text-gray-900 transition-all duration-700 delay-200 ${
                                    isVisible["mission"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                Our Mission and Vision
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                            <div
                                className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-700 ${
                                    isVisible["mission"]
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-20"
                                } hover:shadow-2xl group`}
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={MISSION}
                                        alt="Mission"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-[inter] text-primary-color font-bold text-2xl mb-4 flex items-center">
                                        <svg
                                            className="w-6 h-6 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        Mission
                                    </h3>
                                    <p className="font-[inter] text-gray-600">
                                        Our mission is to assist the government
                                        and businesses in efficiently creating
                                        and verifying PWD (Persons with
                                        Disabilities) IDs to combat fraud while
                                        promoting and protecting the rights of
                                        individuals with disabilities.
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-700 delay-300 ${
                                    isVisible["mission"]
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-20"
                                } hover:shadow-2xl group`}
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={VISION}
                                        alt="Vision"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-[inter] text-primary-color font-bold text-2xl mb-4 flex items-center">
                                        <svg
                                            className="w-6 h-6 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        Vision
                                    </h3>
                                    <p className="font-[inter] text-gray-600">
                                        To be the nationwide standard for PWD ID
                                        verification, fostering an inclusive,
                                        fraud-free, and efficient system where
                                        persons with disabilities can access
                                        their benefits with ease and dignity. We
                                        envision a future where businesses
                                        confidently provide PWD discounts,
                                        knowing that each transaction is secure,
                                        transparent, and fair for all.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section
                    id="team"
                    className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-16 md:py-24 observe-section"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <span
                                className={`inline-block text-tertiary-color font-semibold uppercase tracking-wider text-sm mb-3 transition-all duration-700 ${
                                    isVisible["team"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                WHO ARE WE?
                            </span>
                            <h2
                                className={`font-[montserrat] font-bold text-3xl md:text-4xl text-gray-900 transition-all duration-700 delay-200 ${
                                    isVisible["team"]
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                Meet the People Behind This Project
                            </h2>
                        </div>

                        <div
                            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-1000 ${
                                isVisible["team"] ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <div className="rounded-xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-300">
                                <div className="h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={UI}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Collins Matela"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-primary-color font-bold text-lg truncate">
                                        Collins Matela
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        UI/UX Designer
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-300">
                                <div className="h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={FULLSTACK}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Nathaniel Alvarez"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-primary-color font-bold text-lg truncate">
                                        Nathaniel Alvarez
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Full Stack Developer
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-300">
                                <div className="h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={BACKEND}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="CJ Batingal"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-primary-color font-bold text-lg truncate">
                                        CJ Batingal
                                    </h3>
                                    <p className="text-gray-600 text-sm">CEO</p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-300">
                                <div className="h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={CEO}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Mark Justin Sayson"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-primary-color font-bold text-lg truncate">
                                        Mark Justin Sayson
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Full Stack Developer
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl transition-all duration-300">
                                <div className="h-44 sm:h-48 overflow-hidden">
                                    <img
                                        src={FRONTEND}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Pious Hernandez"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-primary-color font-bold text-lg truncate">
                                        Pious Hernandez
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Frontend Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-blue-500/10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 sm:py-15">
                    <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-10">
                        <div className="flex flex-col flex-1 min-w-[200px]">
                            <img
                                src={MainLogo}
                                className="max-h-9 max-w-24"
                                alt="UPID Logo"
                            />
                            <p className="mt-4 text-sm text-gray-600">
                                Providing innovative solutions for PWD ID
                                creation and verification.
                            </p>
                        </div>

                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <h1 className="font-[montserrat] text-[#292929] font-bold mb-3">
                                Support
                            </h1>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                FAQ
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                How it Works
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                Features
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                Contact
                            </p>
                        </div>

                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <h1 className="font-[montserrat] text-[#292929] font-bold mb-3">
                                Links
                            </h1>
                            <a
                                href="https://www.facebook.com/share/1BhYXfJZJK/?mibextid=wwXIfr"
                                target="_blank"
                                className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer"
                            >
                                Facebook
                            </a>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                Instagram
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                Youtube
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm hover:text-blue-700 transition-colors duration-300 cursor-pointer">
                                Twitter
                            </p>
                        </div>

                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <h1 className="font-[montserrat] text-[#292929] font-bold mb-3">
                                Get in Touch
                            </h1>
                            <p className="font-[poppins] text-[#727278] text-sm">
                                123-456-789 10
                            </p>
                            <p className="font-[poppins] text-[#727278] text-sm">
                                upidofficial@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} UPID. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
};

Home.layout = null;

export default Home;
