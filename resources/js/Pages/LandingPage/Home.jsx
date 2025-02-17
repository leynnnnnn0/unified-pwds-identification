import React from "react";
import MainLogo from "../../../images/mainLogo.jpg";
const Home = () => {
    return (
        <div>
            <nav className="flex items-center justify-between h-20 px-10">
                <img src={MainLogo} className="h-8" />

                <ul className="flex items-center justify-between gap-10 font-bold text-blue-900 text-sm">
                    <li>Home</li>
                    <li>About</li>
                    <li>API</li>
                    <li>Documentation</li>
                    <li>FAQ's</li>
                </ul>

                <div className="flex items-center justify-between gap-3">
                    <button className="border border-blue-900 rounded-full px-5 py-1 font-bold text-blue-900">
                        Sign up
                    </button>
                    <button className="border rounded-full px-5 py-1 font-bold text-white bg-blue-900">
                        Sign in
                    </button>
                </div>
            </nav>

            <main className="h-full bg-red-500 w-full">test</main>
        </div>
    );
};

export default Home;
