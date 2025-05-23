import H1 from "@/Components/text/h1";
import React, { useState, useRef, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Span from "@/Components/text/span";
import { Input } from "@/components/ui/Input";
import BorderBInput from "@/Components/Input/border-b-Input";
import FormField from "@/Components/form/form-field";
import FormH1 from "@/Components/text/form-h1";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

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

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Infolist from "@/Components/infolist";

const Create = () => {
    const { toast } = useToast();
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isPWDNumberInputDisabled, setIsPWDNumberInputDisabled] =
        useState(true);

    const form = useForm({
        supporting_documents: [],
        type_of_registration: "new_applicant",
        pwd_number: null,
        photo: null,

        first_name: "Nathaniel",
        middle_name: "Lavilla",
        last_name: "Alvarez",
        suffix: null,
        date_of_birth: "2004-01-01",
        sex: "male",
        civil_status: "single",
        type_of_disabilities: ["mental_disability"],
        cause_of_disability: "acquired",
        cause_of_disabilities: ["injury"],

        house_no_and_street: "Block 0 Lot - Phase 1 Lavanya Subdivision",
        barangay: null,
        municipality: null,
        province: null,
        region: null,

        landline_no: null,
        mobile_no: "09266887267",
        email_address: null,

        educational_attainment: "none",

        status_of_employment: "unemployed",
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

        father_last_name: "secret",
        father_first_name: "secret",
        father_middle_name: "secret",

        mother_last_name: "secret",
        mother_first_name: "secret",
        mother_middle_name: "secret",
        guardian_last_name: "secret",
        guardian_first_name: "secret",
        guardian_middle_name: "secret",
    });

    useEffect(() => {
        if (form.data.type_of_registration == "renewal") {
            setIsPWDNumberInputDisabled(false);
        } else {
            setIsPWDNumberInputDisabled(true);
        }
    }, [form.data.type_of_registration]);

    useEffect(() => {
        form.setData("cause_of_disabilities", []);
    }, [form.data.cause_of_disability]);

    useEffect(() => {
        if (form.data.status_of_employment == "unemployed") {
            form.setData("types_of_employment", null);
            form.setData("category_of_employment", null);
            form.setData("work_field", null);
            console.log(form.data);
        }
    }, [form.data.status_of_employment]);

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
        setIsConfirmationModalOpen(true);

        console.log(form);

        form.post(route("registration.store"), {
            onSuccess: () => {
                setPreviewImage(null);
                form.reset();
                toast({
                    className:
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
                    description: "Application Created Successfully.",
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
            onFinish: () => {
                setIsConfirmationModalOpen(false);
            },
        });
    };

    const [files, setFiles] = useState([]);

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);

    useEffect(() => {
        const fileObjects = files.map((fileItem) => fileItem.file);
        form.setData("supporting_documents", fileObjects);
    }, [files]);

    const [regions, setRegions] = useState({});
    useEffect(() => {
        console.log("calling regopms");
        axios
            .get("/api/regions")
            .then((res) => {
                setRegions(res.data.regions);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [provinces, setProvinces] = useState({});
    useEffect(() => {
        if (form.data.region) {
            console.log("calling provincies");
            axios
                .get(`/api/provinces?id=${form.data.region}`)
                .then((res) => {
                    setProvinces(res.data.provinces);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [form.data.region]);

    const [municipalities, setMunicipalities] = useState({});
    useEffect(() => {
        if (!form.data.province) return;
        console.log("calling municipaliies");
        axios
            .get(`/api/municipalities?id=${form.data.province}`)
            .then((res) => {
                setMunicipalities(res.data.municipalities);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [form.data.province]);

    const [barangays, setBarangays] = useState({});
    useEffect(() => {
        if (!form.data.municipality) return;
        console.log("calling barangays");
        axios
            .get(`/api/barangays?id=${form.data.municipality}`)
            .then((res) => {
                setBarangays(res.data.barangays);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [form.data.municipality]);

    return (
        <>
            <H1 title="Registration Form" />

            <div className="w-full rounded-lg shadow-xl border md:p-10 p-5 lg:grid lg:grid-cols-4   gap-3 auto-rows-auto space-y-2">
                <div className="w-full space-y-2 md:grid md:grid-cols-3 gap-3 lg:grid-cols-5 lg:col-span-4">
                    <FormField label='1"x1" Photo' error={form.errors.photo}>
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

                    <div className="md:col-span-2 lg:col-span-4">
                        <FormField
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
                                    <RadioGroupItem
                                        value="renewal"
                                        id="renewal"
                                    />
                                    <Span label="Renewal" htmlFor="renewal" />
                                </div>
                            </RadioGroup>
                        </FormField>

                        <FormField
                            label="Person with disability number"
                            isRequired={!isPWDNumberInputDisabled}
                            error={form.errors.pwd_number}
                        >
                            <Input
                                disabled={isPWDNumberInputDisabled}
                                value={form.data.pwd_number || ""}
                                onChange={(e) =>
                                    form.setData("pwd_number", e.target.value)
                                }
                            />
                        </FormField>
                    </div>
                </div>
                <FormH1 label="Personal Information" />

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

                <FormH1 label="Disabilities" />

                <FormField
                    label="Types of Disability"
                    className="md:col-span-4 md:grid grid-cols-4"
                >
                    <div className="col-span-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 space-y-1 gap-2">
                        {typeOfDisabilities.map((item) => (
                            <div
                                key={item.value}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={item.value}
                                    value={item.value}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        form.setData(
                                            "type_of_disabilities",
                                            checked
                                                ? [
                                                      ...form.data
                                                          .type_of_disabilities,
                                                      item.value,
                                                  ]
                                                : form.data.type_of_disabilities.filter(
                                                      (v) => v !== item.value
                                                  )
                                        );
                                    }}
                                    checked={form.data.type_of_disabilities.includes(
                                        item.value
                                    )}
                                />
                                <Span label={item.label} />
                            </div>
                        ))}
                    </div>
                </FormField>

                <FormH1 label="Cause of Disability" />
                <FormField
                    className="col-span-4"
                    label="Cause of Disability"
                    error={form.errors.cause_of_disability}
                >
                    <RadioGroup
                        value={form.data.cause_of_disability}
                        onValueChange={(value) => {
                            form.setData("cause_of_disability", value);
                        }}
                        className="flex w-full"
                    >
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="congenital_inborn"
                                id="congenital_inborn"
                            />
                            <Span
                                label="Congenital / Inborn"
                                htmlFor="Congenital / Inborn"
                            />
                        </div>
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem value="acquired" id="acquired" />
                            <Span label="Acquired" htmlFor="acquired" />
                        </div>
                    </RadioGroup>
                </FormField>

                <div className="col-span-4 grid grid-cols-2">
                    <div className=" grid grid-cols-1 gap-2">
                        {congenitalCause.map((item) => (
                            <div className="flex space-x-2" key={item.value}>
                                <Checkbox
                                    value={item.value}
                                    id={item.value}
                                    disabled={
                                        form.data.cause_of_disability ==
                                        "acquired"
                                    }
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        form.setData(
                                            "cause_of_disabilities",
                                            checked
                                                ? [
                                                      ...form.data
                                                          .cause_of_disabilities,
                                                      item.value,
                                                  ]
                                                : form.data.cause_of_disabilities.filter(
                                                      (v) => v !== item.value
                                                  )
                                        );
                                    }}
                                    checked={form.data.cause_of_disabilities.includes(
                                        item.value
                                    )}
                                />
                                <Span label={item.label} />
                            </div>
                        ))}
                    </div>

                    <div className=" grid grid-cols-1 gap-2">
                        {acquiredCause.map((item) => (
                            <div className="flex space-x-2" key={item.value}>
                                <Checkbox
                                    value={item.value}
                                    id={item.value}
                                    disabled={
                                        form.data.cause_of_disability !=
                                        "acquired"
                                    }
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        form.setData(
                                            "cause_of_disabilities",
                                            checked
                                                ? [
                                                      ...form.data
                                                          .cause_of_disabilities,
                                                      item.value,
                                                  ]
                                                : form.data.cause_of_disabilities.filter(
                                                      (v) => v !== item.value
                                                  )
                                        );
                                    }}
                                    checked={form.data.cause_of_disabilities.includes(
                                        item.value
                                    )}
                                />
                                <Span label={item.label} />
                            </div>
                        ))}
                    </div>
                </div>

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

                <FormField label="Regions" error={form.errors.region}>
                    <Select
                        value={form.data.region || ""}
                        onValueChange={(value) => form.setData("region", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(regions).length > 0 &&
                                Object.entries(regions).map(([key, name]) => (
                                    <SelectItem key={key} value={key}>
                                        {name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Pronvinces" error={form.errors.province}>
                    <Select
                        value={form.data.province || ""}
                        onValueChange={(value) =>
                            form.setData("province", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(provinces).length > 0 &&
                                Object.entries(provinces).map(([key, name]) => (
                                    <SelectItem key={key} value={key}>
                                        {name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField
                    label="Municipality"
                    error={form.errors.municipality}
                >
                    <Select
                        value={form.data.municipality || ""}
                        onValueChange={(value) =>
                            form.setData("municipality", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(municipalities).length > 0 &&
                                Object.entries(municipalities).map(
                                    ([key, name]) => (
                                        <SelectItem key={key} value={key}>
                                            {name}
                                        </SelectItem>
                                    )
                                )}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Barangay" error={form.errors.region}>
                    <Select
                        value={form.data.barangay || ""}
                        onValueChange={(value) =>
                            form.setData("barangay", value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(barangays).length > 0 &&
                                Object.entries(barangays).map(([key, name]) => (
                                    <SelectItem key={key} value={key}>
                                        {name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormH1 label="Contact Details" />

                <div className="col-span-4 grid md:grid-cols-3 gap-3">
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
                            type="number"
                            maxLength={11}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 11) {
                                    form.setData("mobile_no", value);
                                }
                            }}
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
                    className="md:col-span-4"
                    error={form.errors.educational_attainment}
                />

                <RadioGroup
                    value={form.data.educational_attainment || ""}
                    onValueChange={(value) =>
                        form.setData("educational_attainment", value)
                    }
                    className="md:col-span-4 md:grid md:grid-cols-4"
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

                <div className="md:col-span-4 md:grid md:grid-cols-3 space-y-2">
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
                        label="Type Of Employment"
                        error={form.errors.types_of_employment}
                        isRequired={
                            form.data.status_of_employment != "unemployed"
                        }
                    >
                        <RadioGroup
                            value={form.data.types_of_employment || ""}
                            onValueChange={(value) =>
                                form.setData("types_of_employment", value)
                            }
                            disabled={
                                form.data.status_of_employment == "unemployed"
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
                        isRequired={
                            form.data.status_of_employment != "unemployed"
                        }
                    >
                        <RadioGroup
                            value={form.data.category_of_employment || ""}
                            disabled={
                                form.data.status_of_employment == "unemployed"
                            }
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
                    className="md:col-span-4"
                    error={form.errors.work_field}
                    isRequired={form.data.status_of_employment != "unemployed"}
                />

                <RadioGroup
                    value={form.data.work_field || ""}
                    onValueChange={(value) => form.setData("work_field", value)}
                    disabled={form.data.status_of_employment == "unemployed"}
                    className="md:col-span-4 md:grid md:grid-cols-4"
                >
                    {occupations.map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center space-x-2 space-y-1"
                        >
                            <RadioGroupItem
                                value={item.value}
                                id={item.value}
                            />
                            <Span label={item.label} htmlFor={item.value} />
                            {item.hasInput ? (
                                <BorderBInput
                                    disabled={form.data.work_field != "others"}
                                    value={
                                        (item.value === form.data.work_field &&
                                            form.data.other_field) ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        form.setData(
                                            "work_field ",
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
                <FormField
                    error={form.errors.father_last_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.father_last_name || ""}
                        onChange={(e) =>
                            form.setData("father_last_name", e.target.value)
                        }
                    />
                </FormField>
                <FormField
                    error={form.errors.father_first_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.father_first_name || ""}
                        onChange={(e) =>
                            form.setData("father_first_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    error={form.errors.father_middle_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.father_middle_name || ""}
                        onChange={(e) =>
                            form.setData("father_middle_name", e.target.value)
                        }
                    />
                </FormField>

                <Span label="Mother's Name:"></Span>

                <FormField
                    error={form.errors.mother_last_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.mother_last_name || ""}
                        onChange={(e) =>
                            form.setData("mother_last_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    error={form.errors.mother_first_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.mother_first_name || ""}
                        onChange={(e) =>
                            form.setData("mother_first_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    error={form.errors.mother_middle_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.mother_middle_name || ""}
                        onChange={(e) =>
                            form.setData("mother_middle_name", e.target.value)
                        }
                    />
                </FormField>

                <Span label="Guardian's Name:"></Span>

                <FormField
                    error={form.errors.guardian_last_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.guardian_last_name || ""}
                        onChange={(e) =>
                            form.setData("guardian_last_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField
                    error={form.errors.guardian_first_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.guardian_first_name || ""}
                        onChange={(e) =>
                            form.setData("guardian_first_name", e.target.value)
                        }
                    />  
                </FormField>

                <FormField
                    error={form.errors.guardian_middle_name}
                    isRequired={false}
                >
                    <Input
                        value={form.data.guardian_middle_name || ""}
                        onChange={(e) =>
                            form.setData("guardian_middle_name", e.target.value)
                        }
                    />
                </FormField>
            </div>

            <div className="w-full rounded-lg shadow-xl border p-5 md:p-10 grid grid-cols-1 gap-3 auto-rows-auto">
                <FormH1 label="Supporting Documents" />
                <FormField
                    label="Upload Files"
                    error={form.errors.supporting_documents}
                    isRequired={true}
                >
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        // maxFiles={3}
                        // name="files" /* sets the file input name, it's filepond by default */
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </FormField>
            </div>

            <div className="flex items-center justify-end col-span-4">
                <AlertDialog
                    open={isConfirmationModalOpen}
                    onOpenChange={setIsConfirmationModalOpen}
                >
                    <AlertDialogTrigger asChild>
                        <Button
                            onClick={() => setIsConfirmationModalOpen(true)}
                        >
                            Submit
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Please make sure all the information you have
                                entered is accurate and complete before
                                proceeding.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={submitForm}
                                disabled={form.processing}
                            >
                                {form.processing ? "Processing..." : "Continue"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
};

export default Create;
