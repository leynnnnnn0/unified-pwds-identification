import React from "react";

const TD = ({ children }) => {
    return (
        <td className="text-sm py-3 font-normal min-w-fit text-gray-700">
            {children}
        </td>
    );
};

export default TD;
