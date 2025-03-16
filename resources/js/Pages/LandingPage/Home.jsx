import React from "react";
import MainLogo from "../../../images/mainLogo.jpg";
import MainBanner from "../../../images/mainBanner.png";
import LandingPageImage from "../../../images/landingPage.png";
import AboutPageImage from "../../../images/aboutPage.png";
import AboutPageImageLogo from "../../../images/aboutPageLogo.png";
import MissionVisionPage from "../../../images/missionVisionPage.png";
const Home = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col relative">
                <img
                    src={LandingPageImage}
                    className="max-h-screen absolute min-w-full inset-0 z-0"
                />

                <div className="px-40 z-10 min-h-screen flex flex-col">
                    <nav className="flex items-center justify-between h-20 ">
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

                    <main className="flex-1 flex items-center justify-start gap-10">
                        <div className="flex flex-col gap-5 w-[700px]">
                            <div>
                                <h1 className="text-5xl font-bold text-blue-900">
                                    Your One-Stop Solution for PWD ID Creation
                                    and Verification
                                </h1>
                                <p className="text-lg text-gray-500 w-[550px]">
                                    A seamless connection between government
                                    support and business innovation, delivering
                                    PWD services with just a few clicks.
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
            </div>

            <div className="flex flex-col relative">
                <img
                    src={AboutPageImage}
                    className="max-h-full absolute min-w-full inset-0 z-0"
                />

                <section className="flex items-center justify-center gap-5 z-10 px-40 py-20">
                    <img src={AboutPageImageLogo} alt="" className="size-60" />

                    <div className="flex flex-col gap-3">
                        <h1 className="text-black font-bold text-2xl">
                            About Us
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Rerum facilis sequi necessitatibus. Eum culpa
                            reiciendis quaerat exercitationem iste natus illum
                            animi, provident adipisci doloremque? Magnam, natus
                            hic! Voluptas dolorem quia quam? Officia placeat
                            laboriosam, porro animi quam aspernatur dolore
                            repellendus magni iste, ab odio vitae eius! Totam
                            numquam eligendi iusto. Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Quae cupiditate
                            delectus expedita dicta blanditiis sit. Ducimus
                            repellendus excepturi id laborum, eveniet animi quae
                            vel nostrum ea distinctio sapiente, iusto omnis.
                        </p>
                    </div>
                </section>
            </div>

            <div className="flex flex-col relative min-h-screen">
                <img
                    src={MissionVisionPage}
                    className="max-h-full absolute min-w-full z-0 bottom-0"
                />

                <div className="flex flex-col items-center gap-10 px-40 py-10 z-10">
                    <h1 className="text-4xl font-bold text-blue-900 text-center">
                        Mission & Vision
                    </h1>

                    <div className="grid grid-cols-2 gap-10 h-fit">
                        <section className="rounded-lg shadow-lg bg-green-500 h-52 w-96"></section>
                        <section className="rounded-lg shadow-lg bg-green-500 h-52 w-96"></section>
                        <section className="rounded-lg shadow-lg bg-green-500 h-52 w-96"></section>
                        <section className="rounded-lg shadow-lg bg-green-500 h-52 w-96"></section>
                    </div>
                </div>
            </div>

            <div className="min-h-screen flex items-center flex-col gap-10 py-10 z-10">
                <h1 className="text-4xl font-bold text-blue-900 text-center">
                    Meet Our Developers
                </h1>

                <section className="flex items-center justify-center gap-5">
                    <section className="rounded-lg shadow-lg bg-blue-900 w-60 h-[350px]"></section>
                    <section className="rounded-lg shadow-lg bg-blue-900 w-60 h-[450px]"></section>
                    <section className="rounded-lg shadow-lg bg-blue-900 w-60 h-[500px]"></section>
                    <section className="rounded-lg shadow-lg bg-blue-900 w-60 h-[450px]"></section>
                    <section className="rounded-lg shadow-lg bg-blue-900 w-60 h-[350px]"></section>
                </section>
            </div>

            <div className="h-52 bg-indigo-900 flex items-center justify-center">
                <div className="flex items-center gap-5">
                <img src={AboutPageImageLogo} className="size-20"/>
                <div>
                    <h1 className="text-white font-bold text-lg">Contact Us</h1>
                </div>
                </div>
            </div>
        </>
    );
};

export default Home;
