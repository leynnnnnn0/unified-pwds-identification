import FormContainer from "@/Components/div/form-container";
import FormField from "@/Components/form/form-field";
import H1 from "@/Components/text/h1";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

const Index = ({ user }) => {
    const { toast } = useToast();

    // Initialize the form with user data
    const { data, setData, put, processing, errors } = useForm({
        username: user?.username || "",
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("my-account.update", user.id), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Your account has been updated successfully.",
                });
            },
        });
    };

    return (
        <>
            <H1 title="My Account" />
            <FormContainer onSubmit={handleSubmit}>
                <FormField label="Username" error={errors.username}>
                    <Input
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                    />
                </FormField>
                <FormField label="First Name" error={errors.first_name}>
                    <Input
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                    />
                </FormField>
                <FormField label="Middle Name" error={errors.middle_name}>
                    <Input
                        value={data.middle_name}
                        onChange={(e) => setData("middle_name", e.target.value)}
                    />
                </FormField>
                <FormField label="Last Name" error={errors.last_name}>
                    <Input
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                    />
                </FormField>
                <FormField label="Email" error={errors.email}>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </FormField>
                <FormField label="Phone Number" error={errors.phone_number}>
                    <Input
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                    />
                </FormField>

                <section className="col-span-2 flex items-center justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </section>
            </FormContainer>
        </>
    );
};

export default Index;
