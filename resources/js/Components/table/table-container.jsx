import React from "react";
const TableContainer = ({ children }) => {
    return (
        <div className="flex flex-col p-5 w-full h-fit rounded-lg border border-gray/20 space-y-5 overflow-auto overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {children}
        </div>
    );
};

export default TableContainer;
