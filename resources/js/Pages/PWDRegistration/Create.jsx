import H1 from "@/Components/text/h1";
import React, { useState, useRef } from "react";
import DOHLogo from "../../../images/doh.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Span from "@/Components/text/span";
import RegistrationGrid from "@/Components/div/registration-grid";
import { Input } from "@/components/ui/Input";
import BorderBInput from "@/Components/Input/border-b-Input";
import { Checkbox } from "@/components/ui/checkbox";
import FormField from "@/Components/form/form-field";
import FormH1 from "@/Components/text/form-h1";
import FormLabel from "@/Components/text/form-label";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PanelBottom } from "lucide-react";

const Create = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const form = useForm({
        type_of_registration: "new_applicant",
        pwd_number: null,
        photo: null,
        personal_information: {
            first_name: null,
            middle_name: null,
            last_name: null,
            suffix: null,
            date_of_birth: null,
            sex: null,
            civil_status: null,
            type_of_disability: null,
            causeOfDisability: null,
        },
        residence_address: {
            house_no_and_street: null,
            barangay: null,
            municipality: null,
            province: null,
            region: null,
        },
        contact_details: {
            landline_no: null,
            mobile_no: null,
            email_address: null,
        },
        education: {
            educational_attainment: null,
        },
        employment_details: {
            status_of_employment: null,
            types_of_employment: null,
            category_of_employment: null,
        },
        occupation: {
            work_field: null,
        },
        organization_information: {
            organization_affiliated: null,
            contact_person: null,
            office_address: null,
            telephone_no: null,
        },
        id_reference_no: {
            sss_no: null,
            gsis_no: null,
            pag_ibig_no: null,
            psn_no: null,
            philhealth_no: null,
        },
        family_information: {
            fathers_name: {
                last_name: null,
                first_name: null,
                middle_name: null,
            },
            mothers_name: {
                last_name: null,
                first_name: null,
                middle_name: null,
            },
            guardians_name: {
                last_name: null,
                first_name: null,
                middle_name: null,
            },
        },
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

    const civilStatus = [
        { label: "Single", value: "single" },
        { label: "Seperated", value: "seperated" },
        { label: "Cohabitation", value: "cohabitation" },
        { label: "Married", value: "married" },
        { label: "Widow", value: "widow" },
    ];

    const typeOfDisabilities = [
        { label: "Deaf or Hard of Hearing", value: "deaf_or_hard_of_hearing" },
        { label: "Intellectual Disability", value: "intellectual_disability" },
        { label: "Learning Disability", value: "learning_disability" },
        { label: "Mental Disability", value: "mental_disability" },
        {
            label: "Physical Disability(Orthopedic)",
            value: "physical_disability",
        },
        { label: "Psychosocial Disability", value: "psychosocial_disability" },
        {
            label: "Speech and Language Impairment",
            value: "speech_and_language_impairment",
        },
        { label: "Visual Disability", value: "visual_disability" },
        { label: "Cancer (RA11215)", value: "cancer" },
        { label: "Rare Disease (RA10747)", value: "rare_disease" },
    ];

    const congenitalCause = [
        { label: "ADHD", value: "adhd" },
        { label: "Cerebral Palsy", value: "cerebral_palsy" },
        { label: "Down Syndrome", value: "down_syndrome" },
    ];

    const acquiredCause = [
        { label: "ADHD", value: "adhd" },
        { label: "Cerebral Palsy", value: "cerebral_palsy" },
        { label: "Down Syndrome", value: "down_syndrome" },
    ];

    const educationalAttainment = [
        { label: "None", value: "none" },
        { label: "Kindergarten", value: "kindergarten" },
        { label: "Elementary", value: "elementary" },
        { label: "Junior High School", value: "junior_high_school" },
        { label: "Senior High School", value: "senior_high_school" },
        { label: "College", value: "college" },
        { label: "Vocational", value: "vocational" },
        { label: "Post-Graduate", value: "post_graduate" },
    ];

    const statusOfEmployment = [
        { label: "Employed", value: "employed" },
        { label: "Unemployed", value: "unemployed" },
        { label: "Self-employed", value: "self_employed" },
    ];

    const typesOfEmployment = [
        { label: "Permanent / Regular", value: "permanent_regular" },
        { label: "Seasonal", value: "seasonal" },
        { label: "Casual", value: "casual" },
        { label: "Emergency", value: "emergency" },
    ];

    const occupations = [
        { label: "Managers", value: "managers" },
        { label: "Professionals", value: "professionals" },
        {
            label: "Technicians and Associate Professionals",
            value: "technicians_and_associate_professionals",
        },
        {
            label: "Clerical Support Workers",
            value: "clerical_support_workers",
        },
        {
            label: "Service and Sales Workers",
            value: "service_and_sales_workers",
        },
        {
            label: "Skilled Agricultural, Forestry and Fishery Workers",
            value: "skilled_agricultural_forestry_and_fishery_workers",
        },
        {
            label: "Craft and Related Trade Workers",
            value: "craft_and_related_trade_workers",
        },
        {
            label: "Plant and Machine Operators and Assemblers",
            value: "plant_and_machine_operators_and_assemblers",
        },
        { label: "Elementary Occupations", value: "elementary_occupations" },
        {
            label: "Armed Forces Occupations",
            value: "armed_forces_occupations",
        },
        { label: "Others, specify:", value: "others", hasInput: true },
    ];

    const categoryOfEmployment = [
        { label: "Government", value: "government" },
        { label: "Private", value: "private" },
    ];

    const submitForm = (e) => {
        e.preventDefault();
        form.post(route("registration.store"), {
            onSuccess: () => {
                setPreviewImage(null);
                form.reset();
            },
        });
    };

    return (
        <>
            <H1 title="Registration Form" />
            <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-4 gap-3 auto-rows-auto">
                <FormField className="col-span-3" label="Type of Registration">
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

                <FormField label='1"x1" Photo' className="row-span-3">
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

                <FormField label="Last Name">
                    <Input
                        value={form.data.personal_information.last_name || ""}
                        onChange={(e) =>
                            form.setData(
                                "personal_information.last_name",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="First Name">
                    <Input
                        value={form.data.personal_information.first_name || ""}
                        onChange={(e) =>
                            form.setData(
                                "personal_information.first_name",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Middle Name">
                    <Input
                        value={form.data.personal_information.middle_name || ""}
                        onChange={(e) =>
                            form.setData(
                                "personal_information.middle_name",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Suffix">
                    <Input
                        value={form.data.personal_information.suffix || ""}
                        onChange={(e) =>
                            form.setData(
                                "personal_information.suffix",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Date of Birth">
                    <Input
                        type="date"
                        value={
                            form.data.personal_information.date_of_birth || ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "personal_information.date_of_birth",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Sex">
                    <Select
                        value={form.data.personal_information.sex || ""}
                        onValueChange={(value) =>
                            form.setData("personal_information.sex", value)
                        }
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

                <FormField label="Civil Status">
                    <Select
                        value={
                            form.data.personal_information.civil_status || ""
                        }
                        onValueChange={(value) =>
                            form.setData(
                                "personal_information.civil_status",
                                value
                            )
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

                <FormField label="Type of Disability">
                    <Select
                        value={
                            form.data.personal_information.type_of_disability ||
                            ""
                        }
                        onValueChange={(value) =>
                            form.setData(
                                "personal_information.type_of_disability",
                                value
                            )
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

                <FormField label="House No. and Street">
                    <Input
                        value={
                            form.data.residence_address.house_no_and_street ||
                            ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "residence_address.house_no_and_street",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Barangay">
                    <Input
                        value={form.data.residence_address.barangay || ""}
                        onChange={(e) =>
                            form.setData(
                                "residence_address.barangay",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Municipality">
                    <Input
                        value={form.data.residence_address.municipality || ""}
                        onChange={(e) =>
                            form.setData(
                                "residence_address.municipality",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Province">
                    <Input
                        value={form.data.residence_address.province || ""}
                        onChange={(e) =>
                            form.setData(
                                "residence_address.province",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Region">
                    <Input
                        value={form.data.residence_address.region || ""}
                        onChange={(e) =>
                            form.setData(
                                "residence_address.region",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormH1 label="Contact Details" />

                <div className="col-span-4 grid grid-cols-3 gap-3">
                    <FormField label="Landline No.">
                        <Input
                            value={form.data.contact_details.landline_no || ""}
                            onChange={(e) =>
                                form.setData(
                                    "contact_details.landline_no",
                                    e.target.value
                                )
                            }
                        />
                    </FormField>

                    <FormField label="Mobile No.">
                        <Input
                            value={form.data.contact_details.mobile_no || ""}
                            onChange={(e) =>
                                form.setData(
                                    "contact_details.mobile_no",
                                    e.target.value
                                )
                            }
                        />
                    </FormField>

                    <FormField label="Email Address">
                        <Input
                            value={
                                form.data.contact_details.email_address || ""
                            }
                            onChange={(e) =>
                                form.setData(
                                    "contact_details.email_address",
                                    e.target.value
                                )
                            }
                        />
                    </FormField>
                </div>

                <FormH1 label="Education" />

                <FormField
                    label="Educational Attainment"
                    className="col-span-4"
                />

                <RadioGroup
                    value={form.data.education.educational_attainment || ""}
                    onValueChange={(value) =>
                        form.setData("education.educational_attainment", value)
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
                    <FormField label="Status of Employment">
                        <RadioGroup
                            value={
                                form.data.employment_details
                                    .status_of_employment || ""
                            }
                            onValueChange={(value) =>
                                form.setData(
                                    "employment_details.status_of_employment",
                                    value
                                )
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

                    <FormField label="Types Of Employment">
                        <RadioGroup
                            value={
                                form.data.employment_details
                                    .types_of_employment || ""
                            }
                            onValueChange={(value) =>
                                form.setData(
                                    "employment_details.types_of_employment",
                                    value
                                )
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

                    <FormField label="Category of Employment">
                        <RadioGroup
                            value={
                                form.data.employment_details
                                    .category_of_employment || ""
                            }
                            onValueChange={(value) =>
                                form.setData(
                                    "employment_details.category_of_employment",
                                    value
                                )
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

                <FormField label="Work Field" className="col-span-4" />

                <RadioGroup
                    value={form.data.occupation.work_field || ""}
                    onValueChange={(value) =>
                        form.setData("occupation.work_field", value)
                    }
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
                                        (item.value ===
                                            form.data.occupation.work_field &&
                                            form.data.occupation.other_field) ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        form.setData(
                                            "occupation.other_field",
                                            e.target.value
                                        )
                                    }
                                />
                            ) : null}
                        </div>
                    ))}
                </RadioGroup>

                <FormH1 label="Organization Information" />

                <FormField label="Organization Affiliated">
                    <Input
                        value={
                            form.data.organization_information
                                .organization_affiliated || ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "organization_information.organization_affiliated",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Contact Person">
                    <Input
                        value={
                            form.data.organization_information.contact_person ||
                            ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "organization_information.contact_person",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Office Address">
                    <Input
                        value={
                            form.data.organization_information.office_address ||
                            ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "organization_information.office_address",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="Telephone No.">
                    <Input
                        value={
                            form.data.organization_information.telephone_no ||
                            ""
                        }
                        onChange={(e) =>
                            form.setData(
                                "organization_information.telephone_no",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormH1 label="ID Reference No." />

                <FormField label="SSS No.">
                    <Input
                        value={form.data.id_reference_no.sss_no || ""}
                        onChange={(e) =>
                            form.setData(
                                "id_reference_no.sss_no",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="GSIS No.">
                    <Input
                        value={form.data.id_reference_no.gsis_no || ""}
                        onChange={(e) =>
                            form.setData(
                                "id_reference_no.gsis_no",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="PAG-IBIG No.">
                    <Input
                        value={form.data.id_reference_no.pag_ibig_no || ""}
                        onChange={(e) =>
                            form.setData(
                                "id_reference_no.pag_ibig_no",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="PSN No.">
                    <Input
                        value={form.data.id_reference_no.psn_no || ""}
                        onChange={(e) =>
                            form.setData(
                                "id_reference_no.psn_no",
                                e.target.value
                            )
                        }
                    />
                </FormField>

                <FormField label="PhilHealth No.">
                    <Input
                        value={form.data.id_reference_no.philhealth_no || ""}
                        onChange={(e) =>
                            form.setData(
                                "id_reference_no.philhealth_no",
                                e.target.value
                            )
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
                    value={
                        form.data.family_information.fathers_name.last_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.fathers_name.last_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.fathers_name.first_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.fathers_name.first_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.fathers_name.middle_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.fathers_name.middle_name",
                            e.target.value
                        )
                    }
                />

                <Span label="Mother's Name:"></Span>
                <Input
                    value={
                        form.data.family_information.mothers_name.last_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.mothers_name.last_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.mothers_name.first_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.mothers_name.first_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.mothers_name.middle_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.mothers_name.middle_name",
                            e.target.value
                        )
                    }
                />

                <Span label="Guardian's Name:"></Span>
                <Input
                    value={
                        form.data.family_information.guardians_name.last_name ||
                        ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.guardians_name.last_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.guardians_name
                            .first_name || ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.guardians_name.first_name",
                            e.target.value
                        )
                    }
                />
                <Input
                    value={
                        form.data.family_information.guardians_name
                            .middle_name || ""
                    }
                    onChange={(e) =>
                        form.setData(
                            "family_information.guardians_name.middle_name",
                            e.target.value
                        )
                    }
                />

                <div className="flex items-center justify-end col-span-4">
                    <Button onClick={submitForm}>Submit</Button>
                </div>
            </div>
        </>
    );
};

export default Create;
