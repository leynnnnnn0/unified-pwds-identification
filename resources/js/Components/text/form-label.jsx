import React from "react";

const FormLabel = ({ isRequired = true, label, className }) => {
    return (
        <span className={`text-xs text-gray-700 font-bold ${className || ""}`}>
            {label}
            {isRequired && <span className="text-red-500">*</span>}
        </span>
    );
};

export default FormLabel;
