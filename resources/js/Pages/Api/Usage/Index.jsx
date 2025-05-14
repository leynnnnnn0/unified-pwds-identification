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
    { name: "", success: 0, failed: 0 },
    { name: "Feb", success: 15, failed: 0 },
];

import { format } from "date-fns";
import Table from "@/Components/table/table";
import TableHead from "@/Components/table/table-head";
import TH from "@/Components/table/th";
import TableBody from "@/Components/table/table-body";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";
import Pagination from "@/Components/pagination";

const Index = ({ usageStats, transactions }) => {
    const chartData = usageStats
        ? usageStats.map((day) => ({
              name: format(new Date(day.date), "MMM dd"),
              success: day.success,
              failed: day.failed,
          }))
        : [];

    // If no data, show placeholder
    const noData = chartData.length === 0;

    // Calculate totals for summary
    const totalSuccess = chartData.reduce((sum, day) => sum + day.success, 0);
    const totalFailed = chartData.reduce((sum, day) => sum + day.failed, 0);
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

                {noData ? (
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                            No API request data available
                        </p>
                    </div>
                ) : (
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
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
                                    name="Successful"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6, strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="failed"
                                    name="Failed"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6, strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-800">
                    Transactions Details
                </h2>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TH>Id</TH>
                            <TH>Method</TH>
                            <TH>Secret Key</TH>
                            <TH>Is Successful</TH>
                            <TH>IP Address</TH>
                            <TH>Date And Time</TH>
                        </TableHead>
                        <TableBody>
                            {transactions.data.map((item) => (
                                <tr key={item.id}>
                                    <TD>{item.id}</TD>
                                    <TD>{item.method}</TD>
                                    <TD>{item.secret_key}</TD>
                                    <TD>
                                        {item.is_successfull ? "True" : "False"}
                                    </TD>
                                    <TD>{item.ip_address}</TD>
                                    <TD>{item.created_at}</TD>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination data={transactions} />
                </TableContainer>
            </div>
        </div>
    );
};

export default Index;
