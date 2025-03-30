import React from "react";
import { cn } from "@/lib/utils"; // shadcn uses this utility

const RegistrationGrid = ({ children, className }) => {
    return (
        <section
            className={`px-2 py-1 border-black border-2 flex ${
                className || ""
            }`}
        >
            {children}
        </section>
    );
};

export default RegistrationGrid;
