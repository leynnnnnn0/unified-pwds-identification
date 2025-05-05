import React, { useState } from "react";
import Image from "../../../images/defaultImage.jpg";
import { MapPin, AlertTriangle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Span from "@/Components/text/span";
import SpanValue from "@/Components/text/span-value";
import TableContainer from "@/Components/table/table-container";
import Table from "@/Components/table/table";
import TableHead from "@/Components/table/table-head";
import TH from "@/Components/table/th";
import TableBody from "@/Components/table/table-body";
import TD from "@/Components/table/td";
import MainLogo from "../../../images/mainLogo.jpg";
import Flag from "../../../images/philippines.jpg";
const Index = ({ application, image, qr }) => {
    const getFileUrl = (path) => {
        return `/storage/${path}`;
    };

    return (
        <>
            <div className="flex gap-10">
                <img src={image ?? Image} alt="" className="size-40" />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-black/70 text-2xl">
                            {application.first_name +
                                " " +
                                application.last_name}
                        </h1>

                        <span className="bg-green-500 text-white font-bold text-xs rounded-lg px-5 py-1 flex items-center gap-1">
                            <CheckCircle className="size-4" /> Verified
                        </span>
                    </div>
                    <p className="text-primary-color text-sm flex items-center gap-1">
                        <MapPin className="size-4 font-bold" />{" "}
                        {application.municipality + ", " + application.province}
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-1 w-fit">
                        <Span label="Phone Number:" />
                        <SpanValue text={application.mobile_no} />
                        <Span label="Email:" />
                        <SpanValue text={application.email_address ?? "None"} />
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
                            <Span label="First Name:" />
                            <SpanValue text={application.first_name} />
                            <Span label="Middle Name:" />
                            <SpanValue text={application.middle_name} />
                            <Span label="Last Name:" />
                            <SpanValue text={application.last_name} />
                            <Span label="Date of Birth:" />
                            <SpanValue text={application.date_of_birth} />
                            <Span label="Gender:" />
                            <SpanValue text={application.sex} />
                        </div>
                    </section>

                    <section>
                        <span className="text-black/70 text-xs">
                            ADDRESS INFORMATION
                        </span>
                        <div className="mt-5 grid grid-cols-2 gap-1 border-b pb-5 max-w-[500px] border-black/50">
                            <Span label="Address:" />
                            <SpanValue text={application.house_no_and_street} />
                            <Span label="Municipality:" />
                            <SpanValue text={application.municipality} />
                            <Span label="Province/City:" />
                            <SpanValue text={application.province} />
                            <Span label="Region:" />
                            <SpanValue text={application.region} />
                            <Span label="Country:" />
                            <SpanValue text="Philippines" />
                        </div>
                    </section>
                </TabsContent>
                <TabsContent value="documents">
                    <Table>
                        <TableHead>
                            <TH>File Name</TH>
                            <TH>Status</TH>
                            <TH>Remarks</TH>
                        </TableHead>
                        <TableBody>
                            {application.supporting_documents.map((item) => (
                                <tr key={item.id}>
                                    <TD>
                                        <a
                                            href={getFileUrl(item.path)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {item.name}
                                        </a>
                                    </TD>
                                    <TD>{item.status}</TD>
                                    <TD>{item.remarks}</TD>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="digital_id">
                    <section className="mt-5 flex items-center gap-5">
                        <div className="bg-white rouded-lg shadow-lg h-52 w-96 p-4">
                            <section className="flex items-center justify-between">
                                <img
                                    src={MainLogo}
                                    alt="upid logo"
                                    className="h-3"
                                />
                                <span className="text-gray-700 font-bold text-xs">
                                    Republic of the Philippines{" "}
                                </span>
                                <img
                                    src={Flag}
                                    alt="upid logo"
                                    className="h-3"
                                />
                            </section>

                            <section className="flex gap-5 h-full items-center">
                                <div className="flex flex-col gap-1">
                                    <img
                                        src={image ?? Image}
                                        alt=""
                                        className="size-24"
                                    />

                                    <div className="flex flex-col">
                                        <div className="border-b  border-gray-500 h-auto mt-5"></div>
                                        <span className="text-center text-[9px]">
                                            Signature
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1  flex flex-col gap-2">
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">ID Number:</p>
                                        <p className="border-b border-spacing-1 text-[10px] text-start">
                                            PWD-1213456
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">
                                            Card Holder:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] text-start">
                                            {application.first_name +
                                                " " +
                                                application.middle_name +
                                                " " +
                                                application.last_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">
                                            Type of Disabilities:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] text-start">
                                            Mental, Deaf
                                        </p>
                                    </div>

                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">Address:</p>
                                        <p className="border-b border-spacing-1 text-[10px] text-start">
                                            {application.house_no_and_street +
                                                " " +
                                                application.municipality +
                                                ", " +
                                                application.province}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="bg-white rouded-lg shadow-lg h-52 w-96 p-4">
                            <img src={qr} alt="test" className="size-40" />
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Index;
