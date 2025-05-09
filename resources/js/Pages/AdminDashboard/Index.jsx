import DashboardContainer from "@/Components/dashboard-container";
import React from "react";

const Index = () => {
    return (
        <>
            <div className="flex items center justify-bewtween gap-5">
                <DashboardContainer
                    title="Pending Applications"
                    value="1,240"
                />
                <DashboardContainer
                    title="Incomplete Applications"
                    value="1,240"
                />
                <DashboardContainer
                    title="Rejected Applications"
                    value="1,240"
                />
            </div>
        </>
    );
};

export default Index;
