import { Progress } from "@/Components/ui/progress";
import React from "react";

const Index = ({ subscription }) => {
    return (
        <>
            {!subscription && (
                <div className="w-full h-fit rounded-lg">
                    <h1 className="font-bold text-xl border-b pb-5 mb-3 text-gray-800">
                        No billing to manage yet
                    </h1>
                    <p className="text-gray-600 text-sm mt-3">
                        You'll have billing options here once you've subscribed
                        to a product. If you recently purchased a subscription
                        try logging back in again to refresh your session.
                    </p>
                </div>
            )}

            {/* <h1 className="font-bold text-xl border-b pb-5 mb-3 text-gray-800">
                Billing
            </h1> */}

            <div className="border-b rounded-lg shadow-xl mt-3 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-gray-800 text-lg font-bold">
                            Current Plan ({subscription["name"].toUpperCase()})
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Active until {subscription["end_date"]}
                        </p>
                    </div>

                    <h1 className="text-4xl font-bold">
                        ${subscription["price"]}{" "}
                        <span className="text-gray-600 text-lg">/month</span>
                    </h1>
                </div>

                <Progress value={10} />
            </div>
        </>
    );
};

export default Index;
