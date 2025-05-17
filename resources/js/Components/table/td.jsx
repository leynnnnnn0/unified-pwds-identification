import React from "react";
import { cn } from "@/lib/utils";
const TD = ({ children, className }) => {
    return (
        <td
            className={cn(
                "text-xs sm:text-sm py-3 font-normal min-w-fit text-gray-700 whitespace-nowrap",
                className
            )}
        >
            {children}
        </td>
    );
};

export default TD;
