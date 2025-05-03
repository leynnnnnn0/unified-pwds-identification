import React from "react";

const TD = ({ children }) => {
    return (
        <td className="text-sm py-2 font-normal min-w-fit border-r border-gray-200 px-4 last:border-r-0">
            {children}
        </td>
    );
};

export default TD;
