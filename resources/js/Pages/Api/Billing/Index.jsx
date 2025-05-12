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
        <>
            {!subscription && (
                <>
                    <div className="w-full h-fit rounded-lg">
                        <h1 className="font-bold text-xl border-b pb-5 mb-3 text-gray-800">
                            No billing to manage yet
                        </h1>
                        <p className="text-gray-600 text-sm mt-3">
                            You'll have billing options here once you've
                            subscribed to a product. If you recently purchased a
                            subscription try logging back in again to refresh
                            your session.
                        </p>
                    </div>

                    <Plans />
                </>
            )}

            {subscription && (
                <>
                    <h1 className="font-bold text-xl border-b pb-5 mb-3 text-gray-800">
                        Billing
                    </h1>

                    <div className="border rounded-lg shadow-xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-gray-800 text-lg font-bold">
                                    Current Plan (
                                    {subscription["name"].toUpperCase()})
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Active until {subscription["end_date"]}
                                </p>
                            </div>

                            <h1 className="text-4xl font-bold">
                                ${subscription["price"]}{" "}
                                <span className="text-gray-600 text-lg">
                                    /month
                                </span>
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-700 text-sm font-medium">
                                {subscription["api_requests"]} /{" "}
                                {subscription["request_limit"]} requests used
                            </p>

                            <Progress value={progressPercentage} />
                        </div>
                        <div className="flex items-center justify-end pt-5 border-t">
                            {isCancelled ? (
                                <Button
                                    className="bg-green-500"
                                    onClick={renewSubscription}
                                >
                                    Renew subscription
                                </Button>
                            ) : (
                                <Button
                                    onClick={cancelSubscription}
                                    variant="destructive"
                                >
                                    Cancel subscription
                                </Button>
                            )}
                        </div>
                    </div>

                    <TableContainer>
                        <div>
                            <h1 className="text-gray-800 text-lg font-bold">
                                Billing History
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Here you will see your billing history
                            </p>
                        </div>

                        <Table>
                            <TableHead>
                                <TH>Invoice Number</TH>
                                <TH>Amount</TH>
                                <TH>Date</TH>
                                <TH>Status</TH>
                                <TH>Actions</TH>
                            </TableHead>

                            <TableBody>
                                {invoices.map(function (item) {
                                    return (
                                        <tr key={item.id}>
                                            <TD>{item.invoice_id}</TD>
                                            <TD>{item.amount_formatted}</TD>
                                            <TD>{item.date}</TD>
                                            <TD>{item.status}</TD>
                                            <TD>
                                                <a
                                                    className="text-green-500 flex items-center gap-1 hover:underline"
                                                    href={item.pdf_url}
                                                    target="_blank"
                                                >
                                                    <Download className="size-4 hover:underline" />{" "}
                                                    Download PDF
                                                </a>
                                            </TD>
                                        </tr>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};

export default Index;
