import * as React from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const LineChartComponent = ({
    chartData = [],
    title = "PWD Applications Data",
    description = "Showing total applications for the last 3 months",
}) => {
    const [activeChart, setActiveChart] = React.useState("applications");

    const total = React.useMemo(() => {
        if (!chartData || chartData.length === 0) {
            return { applications: 0, desktop: 0, mobile: 0 };
        }

        return {
            applications: chartData.reduce(
                (acc, curr) => acc + (curr.applications || 0),
                0
            ),
            desktop: chartData.reduce(
                (acc, curr) => acc + (curr.desktop || 0),
                0
            ),
            mobile: chartData.reduce(
                (acc, curr) => acc + (curr.mobile || 0),
                0
            ),
        };
    }, [chartData]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded-md p-4 w-[160px] shadow-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                        {new Date(label).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                    <div className="space-y-1">
                        {payload.map((entry, index) => (
                            <p key={index} className="font-semibold text-sm">
                                <span
                                    className="inline-block w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: entry.color }}
                                ></span>
                                {entry.name}: {entry.value.toLocaleString()}
                            </p>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    // Show loading state if no data
    if (!chartData || chartData.length === 0) {
        return (
            <Card className="w-full">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="w-full h-[250px] flex items-center justify-center">
                        <p className="text-muted-foreground">
                            Loading chart data...
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <div className="flex">
                    {/* Summary stats */}
                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                        <span className="text-xs text-muted-foreground">
                            Total Applications
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.applications.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
                <div className="w-full h-[300px] pl-2 pr-2 sm:pl-0 sm:pr-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                                bottom: 12,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                dataKey="applications"
                                stroke="#00458b"
                                type="monotone"
                                strokeWidth={2}
                                dot={{ fill: "#00458b", strokeWidth: 2, r: 4 }}
                                activeDot={{
                                    r: 6,
                                    stroke: "#00458b",
                                    strokeWidth: 2,
                                }}
                                name="Applications"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default LineChartComponent;
