import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", success: 10, failed: 0 },
    { name: "Feb", success: 15, failed: 0 },
    { name: "Mar", success: 15, failed: 2 },
    { name: "Apr", success: 36, failed: 7 },
];

const Index = () => {
    return (
        <div className="w-full">
            <h1 className="font-bold text-xl border-b pb-5 mb-3 text-gray-800">
                Usage
            </h1>

            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        Transaction Statistics
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600">
                                Success
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm text-gray-600">
                                Failed
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.1}
                            />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={{ stroke: "#e5e7eb" }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={{ stroke: "#e5e7eb" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "0.375rem",
                                    boxShadow:
                                        "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="success"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="failed"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Index;
