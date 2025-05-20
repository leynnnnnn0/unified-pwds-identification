import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, PrinterIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import H1 from "@/Components/text/h1";

const BatchPrint = ({ cards }) => {
    // Handle print functionality
    const handlePrint = () => {
        window.print();
    };

    // Auto-print after the component has mounted
    useEffect(() => {
        // Give time for images to load
        const timer = setTimeout(() => {
            window.print();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-6 p-10 print:hidden">
                <H1 title="Batch Print PWD Cards" />
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => router.get("/admin/card-printing")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                    <Button onClick={handlePrint}>
                        <PrinterIcon className="mr-2 h-4 w-4" />
                        Print All Cards
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {cards.map((cardData) => (
                    <div
                        key={cardData.id}
                        className="mx-auto max-w-xl print:mb-10 print:page-break-after"
                    >
                        <div className="flex flex-col gap-6">
                            {/* Card Front */}
                            <div className="border border-gray-800 rounded-lg p-5 bg-white w-full h-56 relative print:scale-100">
                                <div className="border-b-2 border-blue-700 pb-2 mb-3 text-center">
                                    <div>
                                        <h2 className="text-base font-bold m-0">
                                            Republic of the Philippines
                                        </h2>
                                        <h3 className="text-lg font-bold text-blue-700 mt-1 mb-0">
                                            PWD IDENTIFICATION CARD
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-24 h-24 border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {cardData.photo_path ? (
                                            <img
                                                src={`/storage/${cardData.photo_path}`}
                                                alt="PWD Photo"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-xs text-gray-500 text-center">
                                                No Photo
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex mb-1 text-xs">
                                            <span className="font-bold w-24">
                                                PWD ID No:
                                            </span>
                                            <span className="flex-1">
                                                {cardData.pwd_card_number}
                                            </span>
                                        </div>
                                        <div className="flex mb-1 text-xs">
                                            <span className="font-bold w-24">
                                                Name:
                                            </span>
                                            <span className="flex-1">
                                                {cardData.card_holder}
                                            </span>
                                        </div>
                                        <div className="flex mb-1 text-xs">
                                            <span className="font-bold w-24">
                                                Address:
                                            </span>
                                            <span className="flex-1 truncate">
                                                {cardData.address}
                                            </span>
                                        </div>
                                        <div className="flex mb-1 text-xs">
                                            <span className="font-bold w-24">
                                                Date of Birth:
                                            </span>
                                            <span className="flex-1">
                                                {cardData.birthdate}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-1">
                                            <div className="flex text-xs w-1/2">
                                                <span className="font-bold w-16">
                                                    Gender:
                                                </span>
                                                <span className="flex-1">
                                                    {cardData.gender}
                                                </span>
                                            </div>
                                            <div className="flex text-xs w-1/2">
                                                <span className="font-bold w-20">
                                                    Blood Type:
                                                </span>
                                                <span className="flex-1">
                                                    {cardData.blood_type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex mb-1 text-xs">
                                            <span className="font-bold w-24">
                                                Disability:
                                            </span>
                                            <span className="flex-1">
                                                {cardData.disability_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-2 mt-2 text-xs">
                                    <div className="flex">
                                        <span className="font-bold">
                                            Date Issued:
                                        </span>
                                        <span className="ml-2">
                                            {cardData.effective_date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Back */}
                            <div className="border border-gray-800 rounded-lg p-5 bg-white w-full h-56 relative flex flex-col">
                                <div className="bg-gray-100 p-3 rounded mb-3">
                                    <h3 className="text-sm font-bold mb-1 text-blue-700">
                                        EMERGENCY CONTACT
                                    </h3>
                                    <div className="flex mb-1 text-xs">
                                        <span className="font-bold w-24">
                                            Contact Person:
                                        </span>
                                        <span className="flex-1">
                                            {cardData.emergency_contact_person}
                                        </span>
                                    </div>
                                    <div className="flex text-xs">
                                        <span className="font-bold w-24">
                                            Contact Number:
                                        </span>
                                        <span className="flex-1">
                                            {cardData.emergency_contact_number}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-600 mb-3">
                                    <p className="m-0 mb-1">
                                        This card is non-transferable.
                                        Unauthorized use will be penalized.
                                    </p>
                                    <p className="m-0 mb-1">
                                        If found, please return to the nearest
                                        DSWD office or local government unit.
                                    </p>
                                    <p className="m-0">
                                        Application Form #:{" "}
                                        {cardData.application_form_number}
                                    </p>
                                </div>

                                <div className="flex justify-between mt-auto">
                                    <div className="w-2/5 text-center">
                                        <div className="border-t border-black mb-1"></div>
                                        <p className="text-xs m-0">
                                            Cardholder's Signature
                                        </p>
                                    </div>
                                    <div className="w-2/5 text-center">
                                        <div className="border-t border-black mb-1"></div>
                                        <p className="text-xs m-0">
                                            Issuing Officer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BatchPrint;
