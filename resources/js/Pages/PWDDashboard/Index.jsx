import React, { useState } from "react";
import {
    ArrowRight,
    Heart,
    Users,
    FileText,
    Briefcase,
    GraduationCap,
    Shield,
    Accessibility,
    Building2,
} from "lucide-react";
import PWDLogo from "../../../images/pwd-logo.png";
import DashboardDiv from "@/Components/div/dashboard-div";

const Index = () => {
    // Dynamic PWD-related data
    const pwdServices = [
        {
            id: 1,
            title: "Healthcare Services",
            description:
                "Comprehensive medical care, rehabilitation services, and assistive devices for persons with disabilities to improve quality of life.",
            icon: Heart,
        },
        {
            id: 2,
            title: "Social Benefits",
            description:
                "Government assistance programs including disability allowances, transportation discounts, and priority access to services.",
            icon: Users,
        },
        {
            id: 3,
            title: "Legal Support",
            description:
                "Legal assistance for disability rights, anti-discrimination cases, and ensuring equal access to public services.",
            icon: FileText,
        },
        {
            id: 4,
            title: "Employment Programs",
            description:
                "Job placement services, vocational training, and workplace accommodation support for PWD employment opportunities.",
            icon: Briefcase,
        },
        {
            id: 5,
            title: "Education Support",
            description:
                "Inclusive education programs, special needs assistance, and educational accommodations for students with disabilities.",
            icon: GraduationCap,
        },
        {
            id: 6,
            title: "Protection Services",
            description:
                "Safeguarding PWD from abuse, neglect, and discrimination while promoting their rights and dignity.",
            icon: Shield,
        },
        {
            id: 7,
            title: "Accessibility Programs",
            description:
                "Infrastructure improvements, accessible transportation, and barrier-free environment initiatives for PWD inclusion.",
            icon: Accessibility,
        },
        {
            id: 8,
            title: "Community Centers",
            description:
                "Local PWD service centers providing registration, ID processing, and community-based rehabilitation programs.",
            icon: Building2,
        },
    ];

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
                    <a
                        href="https://ncda.gov.ph/disability-laws/republic-acts/republic-act-9442/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1 w-fit hover:bg-yellow-500 transition-colors"
                    >
                        Learn More <ArrowRight className="font-bold" />
                    </a>
                </div>
                <div className="flex justify-center md:justify-end">
                    <img
                        src={PWDLogo}
                        alt="PWD Logo - Persons with Disabilities"
                        className="h-32 sm:h-40 md:h-52 object-contain"
                    />
                </div>
            </div>

            <section className="mt-6">
                {/* Dynamic PWD Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {pwdServices.slice(0, 4).map((service) => (
                        <DashboardDiv
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                        />
                    ))}
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pwdServices.slice(4, 8).map((service) => (
                        <DashboardDiv
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Index;
