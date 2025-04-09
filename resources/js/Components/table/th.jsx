import React from "react";

const TH = ({ children }) => {
    return (
        <th class="text-start text-black/60 font-light text-sm pr-7 min-w-fit whitespace-nowrap mr-3 border-r border-gray-200 px-4 py-2 last:border-r-0">
            {children}
        </th>
    );
};

export default TH;
