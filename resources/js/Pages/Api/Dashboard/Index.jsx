import DashboardContainer from "@/Components/dashboard-container";
import APILayout from "@/Layouts/APILayout";
import React from "react";

const Index = () => {
    return (
        <>
            <div className="flex items-center justify-between gap-3">
                <DashboardContainer title="Total Requests Left" value={3} />
                <DashboardContainer title="Total Requests Made" value={3} />
                <DashboardContainer title="Total Requests Made" value={3} />
            </div>
        </>
    );
};

export default Index;
