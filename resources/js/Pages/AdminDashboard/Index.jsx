import LineChartComponent from "@/Components/charts/line-chart";
import PieChartComponent from "@/Components/charts/pie-chart";
import DashboardContainer from "@/Components/dashboard-container";
import React from "react";

const Index = () => {
    return (
        <>
            <div className="grid md:grid md:grid-cols-3 gap-5">
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

            <LineChartComponent />
        </>
    );
};

export default Index;
