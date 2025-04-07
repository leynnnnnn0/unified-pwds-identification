import React from "react";
import FlexCol from "@/Components/div/flex-col";
import { cn } from "@/lib/utils";
const FormField = ({
    className,
    label,
    children,
    error = "",
    isRequired = true,
}) => {
    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            <span className="text-xs text-gray-700 font-bold">
                {label}
                {isRequired && <span className="text-red-500">*</span>}
            </span>
            {children}
            <span className="text-xs text-red-500">{error}</span>
        </div>
    );
};

export default FormField;
