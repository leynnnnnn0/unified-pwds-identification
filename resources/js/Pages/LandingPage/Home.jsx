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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".animate-on-scroll").forEach((section) => {
            observer.observe(section);
        });

        return () => {
            document
                .querySelectorAll(".animate-on-scroll")
                .forEach((section) => {
                    observer.unobserve(section);
                });
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 sm:py-10 min-h-screen flex flex-col relative overflow-hidden">
                <nav className="flex items-center justify-between relative z-20">
                    <img src={MainLogo} alt="logo" className="h-6 sm:h-8" />

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

                    <ul className="hidden md:flex items-center justify-between gap-4 lg:gap-10 font-bold font-[inter] text-[#495263] text-xs">
                        <li className="hover:text-blue-700 transition-colors duration-300">
                            Home
                        </li>
                        <li className="hover:text-blue-700 transition-colors duration-300">
                            About
                        </li>
                        <li className="hover:text-blue-700 transition-colors duration-300">
                            API
                        </li>
                        <li className="hover:text-blue-700 transition-colors duration-300">
                            Services
                        </li>
                        <li className="hover:text-blue-700 transition-colors duration-300">
                            FAQ's
                        </li>
                    </ul>

                    <div
                        className={`absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition-all duration-300 z-30 ${
                            isMenuOpen
                                ? "max-h-fit py-4"
                                : "max-h-0 overflow-hidden"
                        }`}
                    >
                        <ul className="flex flex-col items-center gap-4 font-bold font-[inter] text-[#495263] text-sm">
                            <li className="hover:text-blue-700 transition-colors duration-300">
                                Home
                            </li>
                            <li className="hover:text-blue-700 transition-colors duration-300">
                                About
                            </li>
                            <li className="hover:text-blue-700 transition-colors duration-300">
                                API
                            </li>
                            <li className="hover:text-blue-700 transition-colors duration-300">
                                Services
                            </li>
                            <li className="hover:text-blue-700 transition-colors duration-300">
                                FAQ's
                            </li>
                            <li className="hover:text-blue-700 transition-colors duration-300 cursor-pointer hover:underline">
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a
                                    href="/register"
                                    className="px-5 py-2 bg-blue-900 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Create an Account
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden md:flex items-center justify-center gap-3 lg:gap-5 text-gray-500 font-[inter] font-bold">
                        <h1 className="font-[inter] text-xs hover:text-blue-700 transition-colors duration-300">
                            <a href="/login">Login</a>
                        </h1>
                        <a
                            href="/register"
                            className="font-[inter] px-3 lg:px-5 py-2 bg-blue-900 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Create an Account
                        </a>
                    </div>
                </nav>

                <div
                    id="hero"
                    className="flex-1 flex items-center justify-center flex-col py-8 animate-on-scroll relative z-10"
                >
                    <h1
                        className={`z-0 font-[montserrat] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full sm:w-[90%] md:w-[80%] lg:w-[800px] text-center text-[#1F1F1F] transition-all duration-1000 ${
                            isVisible["hero"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        Your One-Stop Solution for PWD ID Creation and
                        Verification
                    </h1>
                    <p
                        className={`w-full sm:w-[90%] md:w-[80%] lg:w-[700px] text-[#5B5A62] font-[inter] mt-3 md:mt-5 text-center text-sm sm:text-base transition-all duration-1000 delay-300 ${
                            isVisible["hero"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        A seamless connection between government support and
                        business innovation, delivering PWD services with just a
                        few taps.
                    </p>
                    <div
                        className={`items-center flex justify-center transition-all duration-1000 delay-500 ${
                            isVisible["hero"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <button className="font-[inter] px-6 sm:px-10 md:px-15 py-3 md:py-4 bg-blue-900 text-white rounded-full text-lg md:text-xl font-bold mt-5 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
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
            </div>

            <div
                id="steps"
                className="flex items-center justify-center py-10 flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 animate-on-scroll"
            >
                <h1
                    className={`text-[#0D8772] font-[poppins] font-bold transition-all duration-700 ${
                        isVisible["steps"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    HOW IT WORKS
                </h1>
                <h1
                    className={`font-[montserrat] font-bold text-2xl sm:text-3xl md:text-4xl w-full sm:w-[90%] md:w-[80%] lg:w-[800px] text-center text-[#1F1F1F] transition-all duration-700 delay-200 ${
                        isVisible["steps"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Simple steps to get your UPID
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-10 md:mt-20 w-full">
                    <div
                        className={`flex flex-col items-center justify-center h-auto py-6 md:h-96 rounded-lg shadow-lg flex-1 p-4 md:p-10 gap-3 transition-all duration-700 ${
                            isVisible["steps"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-20"
                        } hover:shadow-xl hover:transform hover:scale-105`}
                    >
                        <img
                            src={Step1}
                            alt="Create a request"
                            className="max-w-full h-auto"
                        />
                        <h1 className="font-[inter] text-[#292929] font-bold text-center">
                            Create a request
                        </h1>
                        <p className="font-[inter] text-[#6F6F75] text-center text-sm">
                            Fill out our simple application form with your
                            personal details and submit the required
                            documentation through our secure portal.
                        </p>
                    </div>
                    <div
                        className={`flex flex-col items-center justify-center h-auto py-6 md:h-96 rounded-lg shadow-lg flex-1 p-4 md:p-10 gap-3 transition-all duration-700 delay-200 ${
                            isVisible["steps"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-20"
                        } hover:shadow-xl hover:transform hover:scale-105`}
                    >
                        <img
                            src={Step2}
                            alt="Wait for verification"
                            className="max-w-full h-auto"
                        />
                        <h1 className="font-[inter] text-[#292929] font-bold text-center">
                            Wait for verification
                        </h1>
                        <p className="font-[inter] text-[#6F6F75] text-center text-sm">
                            Our team will carefully review your application and
                            verify your identity. This process typically takes
                            1-3 business days to complete.
                        </p>
                    </div>
                    <div
                        className={`flex flex-col items-center justify-center h-auto py-6 md:h-96 rounded-lg shadow-lg flex-1 p-4 md:p-10 gap-3 transition-all duration-700 delay-400 ${
                            isVisible["steps"]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-20"
                        } hover:shadow-xl hover:transform hover:scale-105`}
                    >
                        <img
                            src={Step3}
                            alt="Enjoy the perks"
                            className="max-w-full h-auto"
                        />
                        <h1 className="font-[inter] text-[#292929] font-bold text-center">
                            Enjoy the perks of UPID
                        </h1>
                        <p className="font-[inter] text-[#6F6F75] text-center text-sm">
                            Access all UPID benefits including streamlined
                            verification across services, enhanced security
                            features, and simplified digital transactions.
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="mission"
                className="flex items-center justify-center py-10 flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 bg-blue-500/10 animate-on-scroll"
            >
                <h1
                    className={`text-blue-900 font-[poppins] font-bold transition-all duration-700 ${
                        isVisible["mission"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    About Us
                </h1>
                <h1
                    className={`font-[montserrat] font-bold text-2xl sm:text-3xl md:text-4xl w-full sm:w-[90%] md:w-[80%] lg:w-[800px] text-center text-[#292929] transition-all duration-700 delay-200 ${
                        isVisible["mission"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Our Mission and Vision
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-10 md:mt-20 w-full">
                    <div
                        className={`bg-white flex flex-col items-center justify-center h-auto py-6 md:h-96 rounded-lg shadow-lg flex-1 p-4 md:p-10 gap-3 transition-all duration-700 ${
                            isVisible["mission"]
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-20"
                        } hover:shadow-xl hover:border-l-4 hover:border-blue-600`}
                    >
                        <img src={MISSION} alt="Mission" className="h-32" />
                        <h1 className="font-[inter] text-[#292929] font-bold text-center text-2xl">
                            Mission
                        </h1>
                        <p className="font-[inter] text-[#6F6F75] text-center text-sm">
                            Our mission is to assist the government and
                            businesses in efficiently creating and verifying PWD
                            (Persons with Disabilities) IDs to combat fraud
                            while promoting and protecting the rights of
                            individuals with disabilities.
                        </p>
                    </div>

                    <div
                        className={`bg-white flex flex-col items-center justify-center h-auto py-6 md:h-96 rounded-lg shadow-lg flex-1 p-4 md:p-10 gap-3 transition-all duration-700 delay-300 ${
                            isVisible["mission"]
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-20"
                        } hover:shadow-xl hover:border-r-4 hover:border-blue-600`}
                    >
                        <img src={VISION} alt="Vision" className="h-32" />
                        <h1 className="font-[inter] text-[#292929] font-bold text-center text-2xl">
                            Vision
                        </h1>
                        <p className="font-[inter] text-[#6F6F75] text-center text-sm">
                            To be the nationwide standard for PWD ID
                            verification, fostering an inclusive, fraud-free,
                            and efficient system where persons with disabilities
                            can access their benefits with ease and dignity. We
                            envision a future where businesses confidently
                            provide PWD discounts, knowing that each transaction
                            is secure, transparent, and fair for all.
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="team"
                className="flex items-center justify-center py-10 flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 animate-on-scroll"
            >
                <h1
                    className={`text-[#0D8772] font-[poppins] font-bold transition-all duration-700 ${
                        isVisible["team"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Who are we?
                </h1>
                <h1
                    className={`font-[montserrat] font-bold text-2xl sm:text-3xl md:text-4xl w-full sm:w-[90%] md:w-[80%] lg:w-[800px] text-center text-[#1F1F1F] transition-all duration-700 delay-200 ${
                        isVisible["team"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Meet the people behind this project
                </h1>

                <section
                    className={`flex flex-wrap items-center justify-center gap-5 mt-10 transition-all duration-1000 ${
                        isVisible["team"] ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <section className="rounded-lg shadow-xl bg-white w-40 sm:w-48 md:w-52 h-auto p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 transform transition-all duration-300 hover:scale-105">
                        <img
                            src={UI}
                            className="w-full h-auto sm:h-[250px] object-cover"
                            alt="Collins Matela"
                        />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-blue-900 font-bold text-sm sm:text-base">
                                Collins Matela
                            </h1>
                            <p className="text-gray-700 text-xs">UI/UX</p>
                        </div>
                    </section>
                    <section className="rounded-lg shadow-xl bg-white w-40 sm:w-48 md:w-52 h-auto p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 transform transition-all duration-300 hover:scale-105">
                        <img
                            src={FULLSTACK}
                            className="w-full h-auto sm:h-[300px] object-cover"
                            alt="Nathaniel Alvarez"
                        />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-blue-900 font-bold text-sm sm:text-base">
                                Nathaniel Alvarez
                            </h1>
                            <p className="text-gray-700 text-xs">
                                Full Stack Developer
                            </p>
                        </div>
                    </section>
                    <section className="rounded-lg shadow-xl bg-white w-40 sm:w-48 md:w-52 h-auto p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 transform transition-all duration-300 hover:scale-105">
                        <img
                            src={BACKEND}
                            className="w-full h-auto sm:h-[350px] object-cover"
                            alt="CJ Batingal"
                        />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-blue-900 font-bold text-sm sm:text-base">
                                CJ Batingal
                            </h1>
                            <p className="text-gray-700 text-xs">CEO</p>
                        </div>
                    </section>
                    <section className="rounded-lg shadow-xl bg-white w-40 sm:w-48 md:w-52 h-auto p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 transform transition-all duration-300 hover:scale-105">
                        <img
                            src={CEO}
                            className="w-full h-auto sm:h-[300px] object-cover"
                            alt="Mark Justin Sayson"
                        />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-blue-900 font-bold text-sm sm:text-base">
                                Mark Justin Sayson
                            </h1>
                            <p className="text-gray-700 text-xs">
                                Full Stack Developer
                            </p>
                        </div>
                    </section>
                    <section className="rounded-lg shadow-xl bg-white w-40 sm:w-48 md:w-52 h-auto p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 transform transition-all duration-300 hover:scale-105">
                        <img
                            src={FRONTEND}
                            className="w-full h-auto sm:h-[250px] object-cover"
                            alt="Pious Hernandez"
                        />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-blue-900 font-bold text-sm sm:text-base">
                                Pious Hernandez
                            </h1>
                            <p className="text-gray-700 text-xs">
                                Frontend Developer
                            </p>
                        </div>
                    </section>
                </section>
            </div>

            <div className="bg-blue-500/10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 sm:py-15">
                <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-10">
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <img
                            src={MainLogo}
                            className="max-h-9 max-w-24"
                            alt="UPID Logo"
                        />
                        <p className="mt-4 text-sm text-gray-600">
                            Providing innovative solutions for PWD ID creation
                            and verification.
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
        </>
    );
};

Home.layout = null;

export default Home;
