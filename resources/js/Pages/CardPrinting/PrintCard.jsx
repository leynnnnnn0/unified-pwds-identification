import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, CheckCircle, PrinterIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import H1 from "@/Components/text/h1";
import MainLogo from "../../../images/mainLogo.jpg";
import Flag from "../../../images/philippines.jpg";
import toast from "react-hot-toast";

const PrintCard = ({ cardData }) => {
    const printRef = useRef();
    const [isMarkingPrinted, setIsMarkingPrinted] = useState(false);

    // Handle print functionality
    const handlePrint = () => {
        window.print();
    };

    // Navigate back to the list
    const handleBack = () => {
        router.get("/admin/card-printing");
    };

    // Handle mark as printed
    const handleMarkAsPrinted = () => {
        setIsMarkingPrinted(true);

        router.put(
            route("admin.card-printing.mark-as-printed", cardData.id),
            {},
            {
                onSuccess: () => {
                    toast.success("Marked card as printed successfully!");
                },
                onError: (errors) => {
                    toast.error(
                        "Error occurred while marking card as printed. Please try again."
                    );
                },
                onFinish: () => {
                    setIsMarkingPrinted(false);
                },
            }
        );
    };

    return (
        <div className="p-10">
            <div className="flex items-center justify-between mb-6 print:hidden">
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                    <Button
                        onClick={handleMarkAsPrinted}
                        disabled={isMarkingPrinted || cardData.is_printed}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {isMarkingPrinted
                            ? "Marking as printed..."
                            : cardData.is_printed
                            ? "Already Printed"
                            : "Mark as printed"}
                    </Button>
                    <Button onClick={handlePrint}>
                        <PrinterIcon className="mr-2 h-4 w-4" />
                        Print Card
                    </Button>
                </div>
            </div>

            {/* Card Preview Container */}
            <div className="bg-white p-6 mb-6 print:p-0 print:shadow-none space-y-3 flex ">
                <div ref={printRef} className="mx-auto max-w-xl">
                    <section className="flex flex-col md:flex-row items-center gap-6 justify-center">
                        {/* ID Card Front */}
                        <div className="bg-white rounded-lg shadow-lg h-60 w-[450px] p-4 mb-4 md:mb-0">
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
                                        src={cardData["photo"]}
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
                                        <p className="text-[7px]">ID Number:</p>
                                        <p className="border-b border-spacing-1 text-[10px] md:text-xs text-start">
                                            PWD-1213456
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">
                                            Card Holder:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] md:text-xs text-start">
                                            {cardData.card_holder}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">
                                            Type of Disabilities:
                                        </p>
                                        <p className="border-b border-spacing-1 text-[10px] md:text-xs text-start">
                                            {cardData.disabilities}
                                        </p>
                                    </div>

                                    <div className="flex flex-col justify-start">
                                        <p className="text-[7px]">Address:</p>
                                        <p className="border-b border-spacing-1 text-[10px] md:text-xs text-start">
                                            {cardData.address}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    <div className="bg-white rounded-lg shadow-lg h-60 w-[450px] p-4 flex items-center flex-col justify-center">
                        <img
                            src={cardData.qr}
                            alt="QR Code"
                            className="size-32 sm:size-30"
                        />

                        <div className="text-xs text-gray-600 mb-3 text-center">
                            <p className="m-0 mb-1">
                                This card is non-transferable. Unauthorized use
                                will be penalized.
                            </p>
                            <p className="m-0 mb-1">
                                If found, please return to the nearest local
                                government unit.
                            </p>
                            <p className="m-0">
                                Application Form #:{" "}
                                {cardData.application_form_number}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintCard;
