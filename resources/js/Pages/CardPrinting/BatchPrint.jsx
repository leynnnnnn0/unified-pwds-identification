import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, CheckCircle, PrinterIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import H1 from "@/Components/text/h1";
import MainLogo from "../../../images/mainLogo.jpg";
import Flag from "../../../images/philippines.jpg";

const BatchPrint = ({ cards }) => {
    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-6 p-10 print:hidden">
                <H1 title="Batch Print PWD Cards" />
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.get("/admin/card-printing")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                    <Button>
                        <CheckCircle className="mr-2 h-4 w-4" /> Mark all as
                        printed
                    </Button>
                    <Button onClick={handlePrint}>
                        <PrinterIcon className="mr-2 h-4 w-4" />
                        Print All Cards
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-8 print:gap-0">
                {cards.map((cardData) => (
                    <div
                        key={cardData.id}
                        className="mx-auto max-w-xl print:break-after-page print:min-h-[calc(100vh-1px)] print:py-8"
                    >
                        {/* Front of the Card */}
                        <div className="bg-white rounded-lg shadow-lg h-60 w-[450px] p-4 mb-4">
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
                                            {cardData.pwd_card_number ||
                                                "PWD-1213456"}
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

                        {/* Back of the Card */}
                        <div className="bg-white rounded-lg shadow-lg h-60 w-[450px] p-4 flex items-center flex-col justify-center">
                            <img
                                src={cardData.qr}
                                alt="QR Code"
                                className="size-32 sm:size-30"
                            />

                            <div className="text-xs text-gray-600 mb-3 text-center">
                                <p className="m-0 mb-1">
                                    This card is non-transferable. Unauthorized
                                    use will be penalized.
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
                ))}
            </div>

            {/* Print-specific styles */}
            <style jsx global>{`
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    @page {
                        size: A4 portrait;
                        margin: 10mm;
                    }
                    .print\\:break-after-page {
                        page-break-after: always;
                    }
                    .print\\:min-h-\\[calc\\(100vh-1px\\)\\] {
                        min-height: calc(100vh - 1px);
                    }
                    .print\\:py-8 {
                        padding-top: 2rem;
                        padding-bottom: 2rem;
                    }
                    .print\\:gap-0 {
                        gap: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default BatchPrint;
