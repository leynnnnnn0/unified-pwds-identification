import React, { useState } from "react";
import Image from "../../../images/defaultImage.jpg";
import { MapPin, AlertTriangle, CheckCircle, Menu } from "lucide-react";
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
import GeneralInformationTab from "@/Components/profile-tabs/general-information-tab";

const Index = ({ application, image, qr }) => {
    const getFileUrl = (path) => {
        return `/storage/${path}`;
    };

    return (
        <div className="w-full px-4 md:px-6 py-4 max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 mb-8">
                <img
                    src={image ?? Image}
                    alt="Profile"
                    className="size-32 sm:size-40 object-cover rounded-md"
                />
                <div className="flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h1 className="font-bold text-black/70 text-xl sm:text-2xl">
                            {application.first_name +
                                " " +
                                application.last_name}
                        </h1>

                        <span className="bg-green-500 text-white font-bold text-xs rounded-lg px-3 sm:px-5 py-1 flex items-center gap-1 w-fit">
                            <CheckCircle className="size-4" /> Verified
                        </span>
                    </div>
                    <p className="text-primary-color text-sm flex items-center gap-1 mt-1">
                        <MapPin className="size-4 font-bold" />{" "}
                        {application.municipality + ", " + application.province}
                    </p>

                    <div className="mt-4 sm:mt-6 md:mt-10 grid grid-cols-1 xs:grid-cols-2 gap-1 w-full sm:w-fit">
                        <Span label="Phone Number:" />
                        <SpanValue text={application.mobile_no} />
                        <Span label="Email:" />
                        <SpanValue text={application.email_address ?? "None"} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="basic_information" className="w-full">
                <TabsList className="flex flex-wrap">
                    <TabsTrigger
                        value="basic_information"
                        className="text-xs sm:text-sm"
                    >
                        Basic Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="general_information"
                        className="text-xs sm:text-sm"
                    >
                        General Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="documents"
                        className="text-xs sm:text-sm"
                    >
                        Documents
                    </TabsTrigger>
                    <TabsTrigger
                        value="digital_id"
                        className="text-xs sm:text-sm"
                    >
                        Digital ID
                    </TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic_information" className="mt-6">
                    <section className="mb-6">
                        <span className="text-black/70 text-xs font-medium">
                            PERSONAL INFORMATION
                        </span>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
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
                        <span className="text-black/70 text-xs font-medium">
                            ADDRESS INFORMATION
                        </span>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
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

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHead>
                                <TH>File Name</TH>
                                <TH>Status</TH>
                                <TH>Remarks</TH>
                            </TableHead>
                            <TableBody>
                                {application.supporting_documents.map(
                                    (item) => (
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
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                {/* General Information Tab */}
                <TabsContent value="general_information" className="mt-6">
                    <GeneralInformationTab application={application} />
                </TabsContent>

                {/* Digital ID Tab */}
                <TabsContent value="digital_id" className="mt-6">
                    <section className="flex flex-col md:flex-row items-center gap-6 justify-center">
                        {/* ID Card Front */}
                        <div className="bg-white rounded-lg shadow-lg h-auto w-full max-w-sm p-4 mb-4 md:mb-0">
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

                            <section className="flex gap-4 h-full items-center mt-2">
                                <div className="flex flex-col gap-1">
                                    <img
                                        src={image ?? Image}
                                        alt="User photo"
                                        className="size-16 sm:size-24 object-cover"
                                    />

                                    <div className="flex flex-col w-16 sm:w-24">
                                        <div className="border-b border-gray-500 h-auto mt-3 sm:mt-5"></div>
                                        <span className="text-center text-[9px]">
                                            Signature
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px] sm:text-xs">
                                            ID Number:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] sm:text-sm text-start">
                                            PWD-1213456
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px] sm:text-xs">
                                            Card Holder:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] sm:text-sm text-start">
                                            {application.first_name +
                                                " " +
                                                application.middle_name +
                                                " " +
                                                application.last_name}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px] sm:text-xs">
                                            Type of Disabilities:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] sm:text-sm text-start">
                                            {application.disabilities_list}
                                        </p>
                                    </div>

                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px] sm:text-xs">
                                            Address:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] sm:text-sm text-start">
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

                        {/* QR Code */}
                        <div className="bg-white rounded-lg shadow-lg h-auto w-full max-w-sm p-4 flex justify-center">
                            <img
                                src={qr}
                                alt="QR Code"
                                className="size-32 sm:size-40"
                            />
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Index;
