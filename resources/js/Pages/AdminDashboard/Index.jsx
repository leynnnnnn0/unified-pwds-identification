import LineChartComponent from "@/Components/charts/line-chart";
import PieChartComponent from "@/Components/charts/pie-chart";
import DashboardContainer from "@/Components/dashboard-container";
import React from "react";

const Index = ({ counts, chartData }) => {
    console.log("Counts:", counts);
    return (
        <>
            <div className="grid md:grid md:grid-cols-4 gap-5">
                <DashboardContainer
                    title="Pending Applications"
                    value={counts.pending}
                />
                <DashboardContainer
                    title="Approved Applications"
                    value={counts.approved}
                />
                <DashboardContainer
                    title="Incomplete Applications"
                    value={counts.incomplete}
                />
                <DashboardContainer
                    title="Rejected Applications"
                    value={counts.rejected}
                />
            </div>

            <LineChartComponent
                chartData={chartData}
                title="PWD Applications Overview"
                description="Daily application submissions for the last 3 months"
            />
        </>
    );
};

export default Index;
