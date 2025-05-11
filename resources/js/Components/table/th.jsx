import React from "react";

const TH = ({ children }) => {
    return (
        <th className="text-start text-gray-800 font-medium text-xs pr-7 min-w-fit whitespace-nowrap mr-3">
            {children}
        </th>
    );
};

export default TH;
