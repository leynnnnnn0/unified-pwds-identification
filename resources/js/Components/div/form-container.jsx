import React from "react";
import { cn } from "@/lib/utils";
const FormContainer = ({ children, className }) => {
    return (
        <div
            className={cn(
                "w-full rounded-lg shadow-xl border p-10 grid gap-3",
                className
            )}
        >
            {children}
        </div>
    );
};

export default FormContainer;
