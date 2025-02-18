import React from "react";
import MainLogo from "../../../images/mainLogo.jpg";
import MainBanner from "../../../images/mainBanner.png";
const Home = () => {
    return (
        <div className="min-h-screen flex flex-col  px-40">
            <nav className="flex items-center justify-between h-20">
                <img src={MainLogo} className="h-8" />

                <ul className="flex items-center justify-between gap-10 font-bold text-blue-900 text-sm">
                    <li>Home</li>
                    <li>About</li>
                    <li>API</li>
                    <li>Services</li>
                    <li>FAQ's</li>
                </ul>

                <div className="flex items-center justify-between gap-3">
                    <button className="border border-blue-900 rounded-sm px-5 py-1 font-bold text-blue-900">
                        Sign up
                    </button>
                    <button className="border rounded-sm px-5 py-1 font-bold text-white bg-blue-900">
                        Sign in
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex items-center gap-10">
                <img src={MainBanner} alt="" />
                <div className="flex flex-col gap-5">
                    <div>
                        <h1 className="text-5xl font-bold text-blue-900">
                            Your One-Stop Solution for PWD ID Creation and
                            Verification
                        </h1>
                        <p className="text-lg text-gray-500">
                            A seamless connection between government support and
                            business innovation, delivering PWD services with
                            just a few clicks.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="border rounded-sm px-9 py-2 font-bold text-white bg-blue-900">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
