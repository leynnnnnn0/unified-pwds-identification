import React from "react";

const FormH1 = ({ label }) => {
    return (
        <h1 className="font-bold md:text-lg text-sm text-primary-color border-b-2 pb-3 mb-5 col-span-4">
            {label}
        </h1>
    );
};

export default FormH1;
