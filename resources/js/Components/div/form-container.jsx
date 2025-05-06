import React from "react";
import { cn } from "@/lib/utils";
const FormContainer = ({ children, className }) => {
    return (
        <div
            className={cn(
                "w-full rounded-lg shadow-xl border p-10 grid grid-cols-2 gap-3 auto-rows-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export default FormContainer;
