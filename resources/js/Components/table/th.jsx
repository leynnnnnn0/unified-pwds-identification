import React from "react";
import { cn } from "@/lib/utils";
const TH = ({ children, className }) => {
    return (
        <th
            className={cn(
                "text-start text-gray-800 font-medium text-xs pr-7 min-w-fit whitespace-nowrap mr-3",
                className
            )}
        >
            {children}
        </th>
    );
};

export default TH;
