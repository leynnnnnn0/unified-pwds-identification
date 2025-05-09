import React from "react";

const DashboardContainer = ({ title, value }) => {
    return (
        <div className="border rounded-lg p-5 h-32 w-full flex flex-col gap-1">
            <h1 className="font-poppins font-medium text-sm text-primary-color">
                {title}
            </h1>
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-xs text-gray-500">
                +20 higher from previous month
            </span>
        </div>
    );
};

export default DashboardContainer;
