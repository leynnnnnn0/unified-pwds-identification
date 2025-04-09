import React from "react";

const Table = ({ children }) => {
    return (
        <table class="divide-y divide-gray-200 w-full sm:table hidden border border-gray-200">
            {children}
        </table>
    );
};

export default Table;
