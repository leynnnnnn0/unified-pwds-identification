import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/Input";
import axios from "axios";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CheckCircle, TriangleAlertIcon } from "lucide-react";

const Index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [identificationNumber, setIdentificationNumber] = useState("");
    const [cardDetails, setCardDetails] = useState({});
    const [cardHolder, setCardHolder] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const submit = (e) => {
        console.log("submit");
        setIsLoading(true);
        e.preventDefault();
        if (!identificationNumber) return;
        console.log(identificationNumber);
        axios
            .get(
                route("api.manual-verification.verify", {
                    card_uid: identificationNumber,
                })
            )
            .then((res) => {
                if (res.data.data.is_found) {
                    setCardDetails({
                        card_holder: res.data.data.card_details.card_holder,
                        effective_date: res.data.data.card_details.effective_date,
                        expiry_date: res.data.data.card_details.expiry_date,
                    });
                    setIsOpen(true);
                    console.log("Test");
                } else {
                    setIsErrorOpen(true);
                }
                console.log(res);
            })
            .catch((res) => {
                if (res.response.data.success == false) {
                    setErrorMessage(res.response.data.message);
                    setIsErrorOpen(true);
                }
                console.log(res);
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-green-500 font-bold">
                            <CheckCircle />
                            PWD Card User Found
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-2">
                        <h1>Card Holder Name: {cardDetails.card_holder}</h1>
                        <h1>Effective Date: {cardDetails.effective_date}</h1>
                        <h1>Valid Until: {cardDetails.expiry_date}</h1>
                    </div>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="w-full hover:bg-green-300 bg-green-500 flex items-center justify-center"
                        >
                            Okay
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isErrorOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 justify-center text-red-500 font-bold">
                            <TriangleAlertIcon />
                            No Data Found
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="w-full text-center flex items-center">
                                {errorMessage ||
                                    "No user found with this card number. Please make sure that the RFID card number or the PWD card number is correct."}
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <Button
                            onClick={() => setIsErrorOpen(false)}
                            className="w-full hover:bg-red-300 bg-red-500 flex items-center justify-center"
                        >
                            Okay
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-[500px] rounded-2xl shadow-xl h-52 p-5">
                    <div className="flex flex-col items-center gap-3 w-full">
                        <h1 className="font-bold text-black text-2xl">
                            ID Verification
                        </h1>
                        <Input
                            className="h-14"
                            placeholder="Scan the RFID Card or Input the card number"
                            onChange={(e) =>
                                setIdentificationNumber(e.target.value)
                            }
                        />
                        <Button
                            disabled={isLoading}
                            onClick={submit}
                            className="w-full bg-black"
                        >
                            {isLoading ? "Verifying..." : "Verify ID"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
