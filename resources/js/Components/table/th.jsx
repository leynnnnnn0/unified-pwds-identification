import React from "react";

const TH = ({ children }) => {
    return (
        <th className="text-start text-black/50 font-light text-sm pr-7 min-w-fit whitespace-nowrap mr-3">
            {children}
        </th>
    );
};

export default TH;
