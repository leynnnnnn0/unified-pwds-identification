import FormContainer from "@/Components/div/form-container";
import FormField from "@/Components/form/form-field";
import H1 from "@/Components/text/h1";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, MessageCircleWarningIcon } from "lucide-react";
import FormH1 from "@/Components/text/form-h1";

const Index = ({ user }) => {
    const { toast } = useToast();

    const [isAccountVerified, setIsAccountVerified] = useState(user.first_name);
    // Initialize the form with user data
    const { data, setData, put, processing, errors } = useForm({
        username: user?.username || "",
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
    });

    const updateFormPassword = useForm({
        password: "",
        password_confirmation: "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("my-account.update", user.id), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    className:
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white",
                    description:
                        "Your account details has been updated successfully.",
                });
                setIsAccountVerified(true);
            },
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();

        updateFormPassword.put(route("my-account.update-password", user.id), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    className:
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white",
                    description: "Your password has been updated successfully.",
                });
                updateFormPassword.reset();
                console.log("test");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    };
    return (
        <>
            <div className="flex items-center justify-between">
                <H1 title="My Account" />
                <span
                    className={`text-white font-bold text-xs rounded-lg px-5 py-1 flex items-center gap-1 ${
                        isAccountVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {!isAccountVerified ? (
                        <>
                            <MessageCircleWarningIcon className="size-4" />
                            Incomplete
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="size-4" />
                            Completed
                        </>
                    )}
                </span>
            </div>
            <FormContainer>
                <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5 col-span-2">
                    Personal Information
                </h1>
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
                <FormField
                    label="Middle Name"
                    error={errors.middle_name}
                    isRequired={false}
                >
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
                    <Button disabled={processing} onClick={handleSubmit}>
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </section>
            </FormContainer>

            <FormContainer className="flex flex-col">
                <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5">
                    Account Security
                </h1>

                <FormField
                    label="Password"
                    error={updateFormPassword.errors.password}
                >
                    <Input
                        type="password"
                        value={updateFormPassword.data.password}
                        onChange={(e) =>
                            updateFormPassword.setData(
                                "password",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField
                    label="Confirm Password"
                    error={updateFormPassword.errors.password_confirmation}
                >
                    <Input
                        type="password"
                        value={updateFormPassword.data.password_confirmation}
                        onChange={(e) =>
                            updateFormPassword.setData(
                                "password_confirmation",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <section className="col-span-2 flex items-center justify-end">
                    <Button  onClick={updatePassword}>Update</Button>
                </section>
            </FormContainer>
        </>
    );
};

export default Index;
