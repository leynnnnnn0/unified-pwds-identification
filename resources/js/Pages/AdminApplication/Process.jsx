import React from "react";
import H1 from "@/Components/text/h1";
import FormField from "@/Components/form/form-field";
import Span from "@/Components/text/span";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/Input";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
const Process = ({ application, cardDetails }) => {
    const form = useForm({
        application_form_id: application.id,
        pwd_card_number: cardDetails.pwd_card_number,
        effective_date: cardDetails.effective_date,
        expiry_date: cardDetails.expiry_date,
        rfid_card_number: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(
            route(
                "admin.applications.store-identification-card",
                application.id
            ),
            {
                onSuccess: () => {
                    form.reset("rfid_card_number");
                    toast.success("Card Processed Successfully");
                },
                onError: (errors) => {
                    console.log(errors);
                    toast.error("Error Processing Card");
                },
            }
        );
    };
    return (
        <>
            <H1 title="Process Application" />
            <div className="border border-gray-300 rounded-lg p-5 grid grid-cols-2 gap-3">
                <FormField
                    label="PWD Card Number"
                    error={form.errors.pwd_card_number}
                >
                    <Input value={form.data.pwd_card_number} readOnly />
                </FormField>
                <FormField
                    label="RFID Card Number"
                    error={form.errors.rfid_card_number}
                >
                    <Input
                        placeholder="Scan the RFID Card"
                        value={form.data.rfid_card_number}
                        onChange={(e) =>
                            form.setData("rfid_card_number", e.target.value)
                        }
                    />
                </FormField>
                <FormField label="Effective Date">
                    <Input
                        type="date"
                        value={form.data.effective_date}
                        readOnly
                    />
                </FormField>
                <FormField label="Valid Until">
                    <Input type="date" value={form.data.expiry_date} readOnly />
                </FormField>
                <div className="flex items-center justify-end col-span-2">
                    <Button onClick={submit}>Submit</Button>
                </div>
            </div>
        </>
    );
};

export default Process;
