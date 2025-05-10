import React from "react";

const TD = ({ children }) => {
    return (
        <td className="text-sm py-2 font-normal min-w-fit">
            {children}
        </td>
    );
};

export default TD;
