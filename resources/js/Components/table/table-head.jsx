import React from "react";

const TableHead = ({ children }) => {
    return (
        <thead class="bg-gray-50 border-b border-gray-200">
            <tr>{children}</tr>
        </thead>
    );
};

export default TableHead;
