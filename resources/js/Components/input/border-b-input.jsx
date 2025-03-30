import React from "react";

const BorderBInput = (props) => {
    return (
        <input
            className="p-0 border-0 h-6 w-full border-b outline-none focus:outline-none focus:ring-0 focus:shadow-none"
            {...props}
        />
    );
};

export default BorderBInput;
