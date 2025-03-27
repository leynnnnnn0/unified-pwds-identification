import React from "react";
import Image from "../../../images/ceo.png";
import { MapPin, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Span from "@/Components/text/span";
import SpanValue from "@/Components/text/span-value";

const Index = () => {
    return (
        <>
            <div className="flex gap-10">
                <img src={Image} alt="" className="size-40" />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-black/70 text-2xl">
                            Mr. Simple Sayson
                        </h1>

                        <span className="bg-red-500 text-white font-bold text-xs rounded-lg px-5 py-1 flex items-center gap-1">
                            <AlertTriangle className="size-4" /> Not Verified
                        </span>
                    </div>
                    <p className="text-primary-color text-sm flex items-center gap-1">
                        <MapPin className="size-4 font-bold" /> Halayahay,
                        Cavite
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-1 w-fit">
                        <Span text="Phone Number:" />
                        <SpanValue text="09123456789" />
                        <Span text="Email:" />
                        <SpanValue text="mr.simple@gmail.com" />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="basic_information" className="w-full">
                <TabsList>
                    <TabsTrigger value="basic_information">
                        Basic Information
                    </TabsTrigger>
                    <TabsTrigger value="general_information">
                        General Information
                    </TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="digital_id">Digital ID</TabsTrigger>
                    <TabsTrigger value="account_security">
                        Account Security
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="basic_information">
                    <section>
                        <span className="text-black/70 text-xs">
                            PERSONAL INFORMATION
                        </span>
                        <div className="mt-5 grid grid-cols-2 gap-1 border-b pb-5 max-w-[500px] border-black/50">
                            <Span text="First Name:" />
                            <SpanValue text="Simple" />
                            <Span text="Middle Name:" />
                            <SpanValue text="Guy" />
                            <Span text="Last Name:" />
                            <SpanValue text="Sayson" />
                            <Span text="Date of Birth:" />
                            <SpanValue text="January 1, 2024" />
                            <Span text="Gender:" />
                            <SpanValue text="Female" />
                            <Span text="Nationality:" />
                            <SpanValue text="Chinese" />
                        </div>
                    </section>

                    <section>
                        <span className="text-black/70 text-xs">
                            ADDRESS INFORMATION
                        </span>
                        <div className="mt-5 grid grid-cols-2 gap-1 border-b pb-5 max-w-[500px] border-black/50">
                            <Span text="Address:" />
                            <SpanValue text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, animi placeat. Sunt." />
                            <Span text="Municipality:" />
                            <SpanValue text="Tanza" />
                            <Span text="Province/City:" />
                            <SpanValue text="Cavite" />
                            <Span text="Zipcode:" />
                            <SpanValue text="4107" />
                            <Span text="Country:" />
                            <SpanValue text="Philippines" />
                        </div>
                    </section>
                </TabsContent>
                <TabsContent value="account_security">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Index;
