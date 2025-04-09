import H1 from "@/Components/text/h1";
import React, { useState, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Span from "@/Components/text/span";
import { Input } from "@/components/ui/Input";
import BorderBInput from "@/Components/Input/border-b-Input";
import FormField from "@/Components/form/form-field";
import FormH1 from "@/Components/text/form-h1";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PanelBottom } from "lucide-react";

import {
    civilStatus,
    typeOfDisabilities,
    congenitalCause,
    acquiredCause,
    educationalAttainment,
    statusOfEmployment,
    typesOfEmployment,
    occupations,
    categoryOfEmployment,
} from "@/lib/formOptions";

import { useToast } from "@/hooks/use-toast";

const Create = () => {
    const { toast } = useToast();
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const form = useForm({
        type_of_registration: "new_applicant",
        pwd_number: null,
        photo: null,

        first_name: "",
        middle_name: null,
        last_name: null,
        suffix: null,
        date_of_birth: null,
        sex: null,
        civil_status: null,
        type_of_disability: null,
        cause_of_disability: null,

        house_no_and_street: null,
        barangay: null,
        municipality: null,
        province: null,
        region: null,

        landline_no: null,
        mobile_no: null,
        email_address: null,

        educational_attainment: null,

        status_of_employment: null,
        types_of_employment: null,
        category_of_employment: null,

        work_field: null,
        other_field: null,

        organization_affiliated: null,
        contact_person: null,
        office_address: null,
        telephone_no: null,

        sss_no: null,
        gsis_no: null,
        pag_ibig_no: null,
        psn_no: null,
        philhealth_no: null,

        father_last_name: null,
        father_first_name: null,
        father_middle_name: null,
        mother_last_name: null,
        mother_first_name: null,
        mother_middle_name: null,
        guardian_last_name: null,
        guardian_first_name: null,
        guardian_middle_name: null,
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
                form.setData("photo", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const submitForm = (e) => {
        e.preventDefault();
        form.post(route("registration.store"), {
            onSuccess: () => {
                setPreviewImage(null);
                form.reset();
                toast({
                    className:
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                    description: "Your message has been sent.",
                });
            },
            onError: (errors) => {
                console.error(errors);
                toast({
                    className:
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            },
        });
    };

    return (
        <>
            <H1 title="Registration Form" />
            <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-4 gap-3 auto-rows-auto">
                <FormField
                    className="col-span-3"
                    label="Type of Registration"
                    error={form.errors.type_of_registration}
                >
                    <RadioGroup
                        value={form.data.type_of_registration}
                        onValueChange={(value) =>
                            form.setData("type_of_registration", value)
                        }
                        className="flex w-full"
                    >
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="new_applicant"
                                id="new_applicant"
                            />
                            <Span
                                label="New Applicant"
                                htmlFor="new_applicant"
                            />
                        </div>
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem value="renewal" id="renewal" />
                            <Span label="Renewal" htmlFor="renewal" />
                        </div>
                    </RadioGroup>
                </FormField>

                <FormField
                    label='1"x1" Photo'
                    className="row-span-3"
                    error={form.errors.photo}
                >
                    <div
                        className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer mb-2 overflow-hidden"
                        onClick={handleImageClick}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Selected photo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center text-gray-500 text-sm">
                                Click to select photo
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        className="hidden"
                        accept="image/*"
                    />
                    {previewImage && (
                        <div className="text-xs text-gray-500">
                            Click image to change
                        </div>
                    )}
                </FormField>

                <FormField
                    className="col-span-3"
                    label="Person with disability number"
                    error={form.errors.pwd_number}
                >
                    <Input
                        value={form.data.pwd_number || ""}
                        onChange={(e) =>
                            form.setData("pwd_number", e.target.value)
                        }
                    />
                </FormField>

                <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5 col-span-4">
                    Personal Information
                </h1>

                <FormField label="Last Name" error={form.errors.last_name}>
                    <Input
                        value={form.data.last_name || ""}
                        onChange={(e) =>
                            form.setData("last_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="First Name" error={form.errors.first_name}>
                    <Input
                        value={form.data.first_name || ""}
                        onChange={(e) =>
                            form.setData("first_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Middle Name"
                    error={form.errors.middle_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.middle_name || ""}
                        onChange={(e) =>
                            form.setData("middle_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Suffix"
                    error={form.errors.suffix}
                    isRequired={false}
                >
                    <Input
                        value={form.data.suffix || ""}
                        onChange={(e) => form.setData("suffix", e.target.value)}
                    />
                </FormField>

                <FormField
                    label="Date of Birth"
                    error={form.errors.date_of_birth}
                >
                    <Input
                        type="date"
                        value={form.data.date_of_birth || ""}
                        onChange={(e) =>
                            form.setData("date_of_birth", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Sex" error={form.errors.sex}>
                    <Select
                        value={form.data.sex || ""}
                        onValueChange={(value) => form.setData("sex", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField
                    label="Civil Status"
                    error={form.errors.civil_status}
                >
                    <Select
                        value={form.data.civil_status || ""}
                        onValueChange={(value) =>
                            form.setData("civil_status", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {civilStatus.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField
                    label="Type of Disability"
                    error={form.errors.type_of_disability}
                >
                    <Select
                        value={form.data.type_of_disability || ""}
                        onValueChange={(value) =>
                            form.setData("type_of_disability", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeOfDisabilities.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormH1 label="Residence Address" />

                <FormField
                    label="House No. and Street"
                    error={form.errors.house_no_and_street}
                >
                    <Input
                        value={form.data.house_no_and_street || ""}
                        onChange={(e) =>
                            form.setData("house_no_and_street", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Barangay" error={form.errors.barangay}>
                    <Input
                        value={form.data.barangay || ""}
                        onChange={(e) =>
                            form.setData("barangay", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Municipality"
                    error={form.errors.municipality}
                >
                    <Input
                        value={form.data.municipality || ""}
                        onChange={(e) =>
                            form.setData("municipality", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Province" error={form.errors.province}>
                    <Input
                        value={form.data.province || ""}
                        onChange={(e) =>
                            form.setData("province", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Region" error={form.errors.region}>
                    <Input
                        value={form.data.region || ""}
                        onChange={(e) => form.setData("region", e.target.value)}
                    />
                </FormField>

                <FormH1 label="Contact Details" />

                <div className="col-span-4 grid grid-cols-3 gap-3">
                    <FormField
                        label="Landline No."
                        error={form.errors.landline_no}
                        isRequired={false}
                    >
                        <Input
                            value={form.data.landline_no || ""}
                            onChange={(e) =>
                                form.setData("landline_no", e.target.value)
                            }
                        />
                    </FormField>

                    <FormField label="Mobile No." error={form.errors.mobile_no}>
                        <Input
                            value={form.data.mobile_no || ""}
                            onChange={(e) =>
                                form.setData("mobile_no", e.target.value)
                            }
                        />
                    </FormField>

                    <FormField
                        label="Email Address"
                        error={form.errors.email_address}
                        isRequired={false}
                    >
                        <Input
                            value={form.data.email_address || ""}
                            onChange={(e) =>
                                form.setData("email_address", e.target.value)
                            }
                        />
                    </FormField>
                </div>

                <FormH1 label="Education" />

                <FormField
                    label="Educational Attainment"
                    className="col-span-4"
                    error={form.errors.educational_attainment}
                />

                <RadioGroup
                    value={form.data.educational_attainment || ""}
                    onValueChange={(value) =>
                        form.setData("educational_attainment", value)
                    }
                    className="col-span-4 grid grid-cols-4"
                >
                    {educationalAttainment.map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={item.value}
                            />
                            <Span label={item.label} htmlFor={item.value} />
                        </div>
                    ))}
                </RadioGroup>

                <FormH1 label="Employment Details" />

                <div className="col-span-4 grid grid-cols-3">
                    <FormField
                        label="Status of Employment"
                        error={form.errors.status_of_employment}
                    >
                        <RadioGroup
                            value={form.data.status_of_employment || ""}
                            onValueChange={(value) =>
                                form.setData("status_of_employment", value)
                            }
                        >
                            {statusOfEmployment.map((item) => (
                                <div
                                    key={item.value}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span
                                        label={item.label}
                                        htmlFor={item.value}
                                    />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormField>

                    <FormField
                        label="Types Of Employment"
                        error={form.errors.types_of_employment}
                        isRequired={false}
                    >
                        <RadioGroup
                            value={form.data.types_of_employment || ""}
                            onValueChange={(value) =>
                                form.setData("types_of_employment", value)
                            }
                        >
                            {typesOfEmployment.map((item) => (
                                <div
                                    key={item.value}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span
                                        label={item.label}
                                        htmlFor={item.value}
                                    />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormField>

                    <FormField
                        label="Category of Employment"
                        error={form.errors.category_of_employment}
                        isRequired={false}
                    >
                        <RadioGroup
                            value={form.data.category_of_employment || ""}
                            onValueChange={(value) =>
                                form.setData("category_of_employment", value)
                            }
                        >
                            {categoryOfEmployment.map((item) => (
                                <div
                                    key={item.value}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span
                                        label={item.label}
                                        htmlFor={item.value}
                                    />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormField>
                </div>

                <FormH1 label="Occupation" />

                <FormField
                    label="Work Field"
                    className="col-span-4"
                    error={form.errors.work_field}
                    isRequired={false}
                />

                <RadioGroup
                    value={form.data.work_field || ""}
                    onValueChange={(value) => form.setData("work_field", value)}
                    className="col-span-4 grid grid-cols-4"
                >
                    {occupations.map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={item.value}
                            />
                            <Span label={item.label} htmlFor={item.value} />
                            {item.hasInput ? (
                                <BorderBInput
                                    value={
                                        (item.value === form.data.work_field &&
                                            form.data.other_field) ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        form.setData(
                                            "other_field",
                                            e.target.value
                                        )
                                    }
                                    error={form.errors.other_field}
                                />
                            ) : null}
                        </div>
                    ))}
                </RadioGroup>

                <FormH1 label="Organization Information" />

                <FormField
                    label="Organization Affiliated"
                    error={form.errors.organization_affiliated}
                    isRequired={false}
                >
                    <Input
                        value={form.data.organization_affiliated || ""}
                        onChange={(e) =>
                            form.setData(
                                "organization_affiliated",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField
                    label="Contact Person"
                    error={form.errors.contact_person}
                    isRequired={false}
                >
                    <Input
                        value={form.data.contact_person || ""}
                        onChange={(e) =>
                            form.setData("contact_person", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Office Address"
                    error={form.errors.office_address}
                    isRequired={false}
                >
                    <Input
                        value={form.data.office_address || ""}
                        onChange={(e) =>
                            form.setData("office_address", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="Telephone No."
                    error={form.errors.telephone_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.telephone_no || ""}
                        onChange={(e) =>
                            form.setData("telephone_no", e.target.value)
                        }
                    />
                </FormField>

                <FormH1 label="ID Reference No." />

                <FormField
                    label="SSS No."
                    error={form.errors.sss_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.sss_no || ""}
                        onChange={(e) => form.setData("sss_no", e.target.value)}
                    />
                </FormField>

                <FormField
                    label="GSIS No."
                    error={form.errors.gsis_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.gsis_no || ""}
                        onChange={(e) =>
                            form.setData("gsis_no", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="PAG-IBIG No."
                    error={form.errors.pag_ibig_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.pag_ibig_no || ""}
                        onChange={(e) =>
                            form.setData("pag_ibig_no", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    label="PSN No."
                    error={form.errors.psn_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.psn_no || ""}
                        onChange={(e) => form.setData("psn_no", e.target.value)}
                    />
                </FormField>

                <FormField
                    label="PhilHealth No."
                    error={form.errors.philhealth_no}
                    isRequired={false}
                >
                    <Input
                        value={form.data.philhealth_no || ""}
                        onChange={(e) =>
                            form.setData("philhealth_no", e.target.value)
                        }
                    />
                </FormField>

                <FormH1 label="Family Information" />

                <Span></Span>
                <FormField label="Last Name" />
                <FormField label="First Name" />
                <FormField label="Middle Name" />

                <Span label="Father's Name:"></Span>
                <Input
                    value={form.data.father_last_name || ""}
                    onChange={(e) =>
                        form.setData("father_last_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.father_first_name || ""}
                    onChange={(e) =>
                        form.setData("father_first_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.father_middle_name || ""}
                    onChange={(e) =>
                        form.setData("father_middle_name", e.target.value)
                    }
                />

                <Span label="Mother's Name:"></Span>
                <Input
                    value={form.data.mother_last_name || ""}
                    onChange={(e) =>
                        form.setData("mother_last_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.mother_first_name || ""}
                    onChange={(e) =>
                        form.setData("mother_first_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.mother_middle_name || ""}
                    onChange={(e) =>
                        form.setData("mother_middle_name", e.target.value)
                    }
                />

                <Span label="Guardian's Name:"></Span>
                <Input
                    value={form.data.guardian_last_name || ""}
                    onChange={(e) =>
                        form.setData("guardian_last_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.guardian_first_name || ""}
                    onChange={(e) =>
                        form.setData("guardian_first_name", e.target.value)
                    }
                />
                <Input
                    value={form.data.guardian_middle_name || ""}
                    onChange={(e) =>
                        form.setData("guardian_middle_name", e.target.value)
                    }
                />

                <div className="flex items-center justify-end col-span-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>Submit</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please make sure all the information you
                                    have entered is accurate and complete before
                                    proceeding.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={submitForm}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    );
};

export default Create;
