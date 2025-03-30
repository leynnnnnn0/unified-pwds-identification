import H1 from "@/Components/text/h1";
import React from "react";
import DOHLogo from "../../../images/doh.png";
const Create = () => {
    return (
        <>
            <header className="flex w-full justify-center gap-10">
                <img src={DOHLogo} alt="DOH Logo" className="h-24" />
                <section className="flex flex-col items-center justify-center">
                    <h1 className="text-gray-700 font-bold text-xl">
                        Department of Health
                    </h1>
                    <h1 className="text-gray-700 font-bold text-sm">
                        Philippine Registry For Person with Disablities
                    </h1>
                    <h1 className="text-gray-700 font-bold text-xl">
                        Application Form
                    </h1>
                </section>
            </header>
        </>
    );
};

export default Create;
