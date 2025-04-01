import React from "react";
import { cn } from "@/lib/utils";

const RegistrationGrid = ({ children, className }) => {
    return (
        <section
            className={cn("border-black border-2 flex px-2 py-1", className)}
        >
            {children}
        </section>
    );
};

export default RegistrationGrid;
