import Layout from "@/Layouts/Layout";
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
            <div className="w-full h-72 rounded-lg bg-primary-color p-10 grid grid-cols-4 gap-5">
                <div className="col-span-3 space-y-5">
                    <h1 className="text-white font-bold text-4xl">
                        REPUBLIC ACT NO. 9442
                    </h1>
                    <p className="text-white/70">
                        AN ACT AMENDING REPUBLIC ACT NO. 7277, OTHERWISE KNOWN
                        AS THE "MAGNA CARTA FOR DISABLED PERSONS, AND FOR OTHER
                        PURPOSES"
                    </p>
                    <button className="bg-yellow-400 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-1">
                        Learn More <ArrowRight className="font-bold" />
                    </button>
                </div>
                <img src={PWDLogo} alt="pwd logo" className="h-52" />
            </div>

            <section>
                <div className="grid grid-cols-4 h">
                    <DashboardDiv />
                    <DashboardDiv title="Benefits" icon={LucideShipWheel} />
                    <DashboardDiv title="Tits" icon={PersonStanding} />
                    <DashboardDiv title="Fine Shyt" icon={EarOffIcon} />
                </div>

                <div className="grid grid-cols-4 h">
                    <DashboardDiv />
                    <DashboardDiv title="Benefits" icon={LucideShipWheel} />
                    <DashboardDiv title="Tits" icon={PersonStanding} />
                    <DashboardDiv title="Fine Shyt" icon={EarOffIcon} />
                </div>
            </section>
        </>
    );
};

export default Index;
