import React, { useState } from "react";
import {
    ArrowRight,
    LucideShipWheel,
    PersonStanding,
    EarOffIcon,
} from "lucide-react";
import PWDLogo from "../../../images/pwd-logo.png";
import DashboardDiv from "@/Components/div/dashboard-div";

const Index = () => {
    return (
        <>
            {/* Hero Section - Made responsive with flex-col on mobile */}
            <div className="w-full rounded-lg bg-primary-color p-4 md:p-6 lg:p-10 flex flex-col md:grid md:grid-cols-4 gap-5">
                <div className="md:col-span-3 space-y-3 md:space-y-5">
                    <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                        REPUBLIC ACT NO. 9442
                    </h1>
                    <p className="text-white/70 text-sm sm:text-base">
                        AN ACT AMENDING REPUBLIC ACT NO. 7277, OTHERWISE KNOWN
                        AS THE "MAGNA CARTA FOR DISABLED PERSONS, AND FOR OTHER
                        PURPOSES"
                    </p>
                    <button className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1">
                        Learn More <ArrowRight className="font-bold" />
                    </button>
                </div>
                <div className="flex justify-center md:justify-end">
                    <img
                        src={PWDLogo}
                        alt="pwd logo"
                        className="h-32 sm:h-40 md:h-52 object-contain"
                    />
                </div>
            </div>

            <section className="mt-6">
                {/* First Row - Responsive grid that stacks on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <DashboardDiv />
                    <DashboardDiv title="Benefits" icon={LucideShipWheel} />
                    <DashboardDiv title="Services" icon={PersonStanding} />
                    <DashboardDiv title="Resources" icon={EarOffIcon} />
                </div>

                {/* Second Row - Responsive grid that stacks on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardDiv />
                    <DashboardDiv title="Benefits" icon={LucideShipWheel} />
                    <DashboardDiv title="Services" icon={PersonStanding} />
                    <DashboardDiv title="Resources" icon={EarOffIcon} />
                </div>
            </section>
        </>
    );
};

export default Index;
