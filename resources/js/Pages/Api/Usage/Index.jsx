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
import { format, parseISO, isValid } from "date-fns";
import Table from "@/Components/table/table";
import TableHead from "@/Components/table/table-head";
import TH from "@/Components/table/th";
import TableBody from "@/Components/table/table-body";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";
import Pagination from "@/Components/pagination";

const Index = ({
    usageStats = [],
    transactions = { data: [], from: 0, to: 0, total: 0 },
}) => {
    // Safely format dates with error handling
    const safeFormatDate = (dateString, formatPattern) => {
        if (!dateString) return "Invalid date";

        try {
            // Try to parse the date string into a Date object
            const date =
                typeof dateString === "string"
                    ? parseISO(dateString)
                    : new Date(dateString);

            // Check if the resulting date is valid
            if (!isValid(date)) return "Invalid date";

            // Format the date if it's valid
            return format(date, formatPattern);
        } catch (error) {
            console.error("Error formatting date:", error, dateString);
            return "Invalid date";
        }
    };

    // Process chart data with safety checks
    const chartData =
        usageStats && Array.isArray(usageStats)
            ? usageStats
                  .filter((day) => day && day.date)
                  .map((day) => ({
                      name: safeFormatDate(day.date, "MMM dd"),
                      success: day.success || 0,
                      failed: day.failed || 0,
                  }))
            : [];

    // If no data, show placeholder
    const noData = !chartData || chartData.length === 0;

    // Calculate totals for summary with safety checks
    const totalSuccess = chartData.reduce(
        (sum, day) => sum + (day.success || 0),
        0
    );
    const totalFailed = chartData.reduce(
        (sum, day) => sum + (day.failed || 0),
        0
    );

    // Ensure transactions data is properly initialized to prevent errors
    const transactionData = transactions?.data || [];
    const transactionFrom = transactions?.from || 0;
    const transactionTo = transactions?.to || 0;
    const transactionTotal = transactions?.total || 0;

    return (
        <div className="w-full p-4 md:p-6">
            <h1 className="font-bold text-lg sm:text-xl border-b pb-3 sm:pb-5 mb-3 text-gray-800">
                Usage
            </h1>

            {/* Additional responsive summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-2">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h3 className="text-sm font-medium text-gray-500">
                        Total Requests
                    </h3>
                    <p className="text-2xl font-bold mt-1">
                        {totalSuccess + totalFailed}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h3 className="text-sm font-medium text-gray-500">
                        Success Rate
                    </h3>
                    <p className="text-2xl font-bold mt-1">
                        {totalSuccess > 0
                            ? Math.round(
                                  (totalSuccess /
                                      (totalSuccess + totalFailed)) *
                                      100
                              )
                            : 0}
                        %
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h3 className="text-sm font-medium text-gray-500">
                        Avg Requests/Day
                    </h3>
                    <p className="text-2xl font-bold mt-1">
                        {chartData.length > 0
                            ? Math.round(
                                  (totalSuccess + totalFailed) /
                                      chartData.length
                              )
                            : 0}
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <h2 className="text-base sm:text-lg font-medium text-gray-800">
                        Transaction Statistics
                    </h2>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1 sm:mr-2"></div>
                            <span className="text-xs sm:text-sm text-gray-600">
                                Success ({totalSuccess})
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-1 sm:mr-2"></div>
                            <span className="text-xs sm:text-sm text-gray-600">
                                Failed ({totalFailed})
                            </span>
                        </div>
                    </div>
                </div>

                {noData ? (
                    <div className="h-60 sm:h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-sm sm:text-base">
                            No API request data available
                        </p>
                    </div>
                ) : (
                    <div className="h-60 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    opacity={0.1}
                                />
                                <XAxis
                                    dataKey="name"
                                    stroke="#6b7280"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={{ stroke: "#e5e7eb" }}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    fontSize={10}
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
                                        fontSize: "12px",
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{
                                        fontSize: "12px",
                                        paddingTop: "20px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="success"
                                    name="Successful"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ r: 3, strokeWidth: 2 }}
                                    activeDot={{ r: 5, strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="failed"
                                    name="Failed"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ r: 3, strokeWidth: 2 }}
                                    activeDot={{ r: 5, strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-base sm:text-lg font-medium text-gray-800">
                        Transactions Details
                    </h2>
                    <div className="text-xs sm:text-sm text-gray-500">
                        Showing {transactionFrom}-{transactionTo} of{" "}
                        {transactionTotal} transactions
                    </div>
                </div>

                <TableContainer>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHead>
                                <TH className="">ID</TH>
                                <TH className="md:table-cell hidden">Method</TH>
                                <TH className="md:table-cell hidden">
                                    Secret Key
                                </TH>
                                <TH className="">Status</TH>
                                <TH className="">IP Address</TH>
                                <TH className="">Date</TH>
                            </TableHead>
                            <TableBody>
                                {transactionData.map((item) => (
                                    <tr
                                        key={
                                            item.id ||
                                            Math.random()
                                                .toString(36)
                                                .substr(2, 9)
                                        }
                                        className="hover:bg-gray-50"
                                    >
                                        <TD className="">
                                            #{item.id || "N/A"}
                                        </TD>
                                        <TD className="md:table-cell hidden">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                                    item.method === "GET"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : item.method === "POST"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {item.method || "UNKNOWN"}
                                            </span>
                                        </TD>
                                        <TD className="md:table-cell hidden">
                                            {item.secret_key
                                                ? `${item.secret_key.substring(
                                                      0,
                                                      8
                                                  )}...${item.secret_key.slice(
                                                      -4
                                                  )}`
                                                : "N/A"}
                                        </TD>
                                        <TD>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                                    item.is_successfull
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {item.is_successfull ? (
                                                    <>
                                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                                                        Success
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                                                        Failed
                                                    </>
                                                )}
                                            </span>
                                        </TD>
                                        <TD className="">
                                            {item.ip_address || "N/A"}
                                        </TD>
                                        <TD className="">
                                            {item.created_at
                                                ? safeFormatDate(
                                                      item.created_at,
                                                      "MMM dd, HH:mm"
                                                  )
                                                : "N/A"}
                                        </TD>
                                    </tr>
                                ))}

                                {transactionData.length === 0 && (
                                    <tr>
                                        <TD
                                            colSpan="6"
                                            className="text-center py-6"
                                        >
                                            No transaction data available
                                        </TD>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {transactionData.length > 0 && (
                        <div className="mt-4">
                            <Pagination
                                data={transactions}
                                className="text-xs sm:text-sm"
                            />
                        </div>
                    )}
                </TableContainer>
            </div>
        </div>
    );
};

export default Index;
