import Plans from "@/Components/plans";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableContainer from "@/Components/table/table-container";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { router } from "@inertiajs/react";
import { Download } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Index = ({ subscription, invoices }) => {
    let progressPercentage = 0;

    const [isCancelled, setIsCancelled] = useState(
        subscription ? subscription["is_cancelled"] : false
    );
    if (subscription) {
        progressPercentage =
            (parseInt(subscription["api_requests"]) /
                parseInt(subscription["request_limit"])) *
            100;
    }

    const cancelSubscription = () => {
        router.put(
            route("billing.cancel-subscription", subscription["product_id"]),
            {},
            {
                onSuccess: () => {
                    toast.success("Subscription cancelled.");
                    setIsCancelled(true);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while trying to cancel the subscription."
                    );
                },
            }
        );
    };

    const renewSubscription = () => {
        router.put(
            route("billing.renew-subscription", subscription["product_id"]),
            {},
            {
                onSuccess: () => {
                    toast.success("Subscription renewed.");
                    setIsCancelled(false);
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while trying to renew the subscription."
                    );
                },
            }
        );
    };

    return (
        <div className="p-4 md:p-6">
            {!subscription && (
                <div className="space-y-6">
                    <div className="w-full rounded-lg">
                        <h1 className="font-bold text-lg sm:text-xl border-b pb-3 sm:pb-5 mb-3 text-gray-800">
                            No billing to manage yet
                        </h1>
                        <p className="text-gray-600 text-xs sm:text-sm mt-3">
                            You'll have billing options here once you've
                            subscribed to a product. If you recently purchased a
                            subscription try logging back in again to refresh
                            your session.
                        </p>
                    </div>

                    <Plans />
                </div>
            )}

            {subscription && (
                <div className="space-y-6">
                    <h1 className="font-bold text-lg sm:text-xl border-b pb-3 sm:pb-5 mb-3 text-gray-800">
                        Billing
                    </h1>

                    <div className="border rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-gray-800 text-base sm:text-lg font-bold">
                                    Current Plan (
                                    {subscription["name"].toUpperCase()})
                                </h1>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    Active until {subscription["end_date"]}
                                </p>
                            </div>

                            <h1 className="text-2xl sm:text-4xl font-bold">
                                ${subscription["price"]}{" "}
                                <span className="text-gray-600 text-sm sm:text-lg">
                                    /month
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-gray-700 text-xs sm:text-sm font-medium">
                                {subscription["api_requests"]} /{" "}
                                {subscription["request_limit"]} requests used
                            </p>
                            <Progress value={progressPercentage} />
                        </div>

                        <div className="flex items-center justify-end pt-3 sm:pt-5 border-t">
                            {isCancelled ? (
                                <Button
                                    className="bg-green-500 text-xs sm:text-sm"
                                    onClick={renewSubscription}
                                >
                                    Renew subscription
                                </Button>
                            ) : (
                                <Button
                                    onClick={cancelSubscription}
                                    variant="destructive"
                                    className="text-xs sm:text-sm"
                                >
                                    Cancel subscription
                                </Button>
                            )}
                        </div>
                    </div>

                    <TableContainer>
                        <div className="mb-4">
                            <h1 className="text-gray-800 text-base sm:text-lg font-bold">
                                Billing History
                            </h1>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Here you will see your billing history
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHead>
                                    <TH className="text-xs sm:text-sm">
                                        Invoice Number
                                    </TH>
                                    <TH className="text-xs sm:text-sm">
                                        Amount
                                    </TH>
                                    <TH className="hidden sm:table-cell text-xs sm:text-sm">
                                        Date
                                    </TH>
                                    <TH className="text-xs sm:text-sm">
                                        Status
                                    </TH>
                                    <TH className="text-xs sm:text-sm">
                                        Actions
                                    </TH>
                                </TableHead>

                                <TableBody>
                                    {invoices.map(function (item) {
                                        return (
                                            <tr key={item.id}>
                                                <TD className="text-xs sm:text-sm">
                                                    {item.invoice_id}
                                                </TD>
                                                <TD className="text-xs sm:text-sm">
                                                    {item.amount_formatted}
                                                </TD>
                                                <TD className="hidden sm:table-cell text-xs sm:text-sm">
                                                    {item.date}
                                                </TD>
                                                <TD>
                                                    <span className="border border-green-700 text-white bg-green-400 text-xs rounded-lg px-2 py-1">
                                                        {item.status.toUpperCase()}
                                                    </span>
                                                </TD>
                                                <TD>
                                                    <a
                                                        className="text-green-500 flex items-center gap-1 hover:underline text-xs sm:text-sm"
                                                        href={item.pdf_url}
                                                        target="_blank"
                                                    >
                                                        <Download className="size-3 sm:size-4" />
                                                        <span className="hidden sm:inline">
                                                            Download PDF
                                                        </span>
                                                    </a>
                                                </TD>
                                            </tr>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default Index;
