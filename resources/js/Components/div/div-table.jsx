import React from "react";

const DivTable = ({ children }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg w-full h-fit p-5 flex gap-2">
            {children}
        </div>
    );
};

export default DivTable;
