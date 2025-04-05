import H1 from "@/Components/text/h1";
import React from "react";
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
    const form = useForm({
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
            fathers_name: null,
            mothers_name: null,
            guardians_name: null,
        },
    });

    const civilStatus = [
        { label: "Single" },
        { label: "Seperated" },
        { label: "Cohabitation" },
        { label: "Married" },
        { label: "Widow" },
    ];

    const typeOfDisabilities = [
        { label: "Deaf or Hard of Hearing" },
        { label: "Intellectual Disability" },
        { label: "Learning Disability" },
        { label: "Mental Disability" },
        { label: "Physical Disability(Orthopedic)" },
        { label: "Psychosocial Disability" },
        { label: "Speech and Language Impairment"},
        { label: "Visual Disability"},
        { label: "Cancer (RA11215)"},
        { label: "Rare Disease (RA10747)"}
    ];

    const congenitalCause = [
        { label: "ADHD" },
        { label: "Cerebral Palsy" },
        { label: "Down Syndrome" },
    ];

    const acquiredCause = [
        { label: "ADHD" },
        { label: "Cerebral Palsy" },
        { label: "Down Syndrome" },
    ];

    const educationalAttainment = [
        { label: "None", value: "option-one"},
        { label: "Kindergarten", value: "option-two"},
        { label: "Elementary", value: "option-three"},
        { label: "Junior High School", value: "option-four"},
        { label: "Senior High School", value: "option-five"},
        { label: "College", value: "option-six"},
        { label: "Vocational", value: "option-seven"},
        { label: "Post-Graduate", value: "option-eight"},
    ];

    const statusOfEmployment = [
        { label: "Employed", value: "option-one" },
        { label: "Unemployed", value: "option-two" },
        { label: "Self-employed", value: "option-three" },
    ];

    const typesOfEmployment = [
        { label: "Permanent / Regular", value: "option-one" },
        { label: "Seasonal", value: "option-two" },
        { label: "Casual", value: "option-three" },
        { label: "Emergency", value: "option-four" },
    ];

    const occupations = [
        { label: "Managers", value: "option-one"},
        { label: "Professionals", value: "option-two"},
        { label: "Technicians and Associate Professionals", value: "option-three"},
        { label: "Clerical Support Workers", value: "option-four"},
        { label: "Service and Sales Workers", value: "option-five"},
        { label: "Skilled Agricultural, Forestry and Fishery Workers", value: "option-six"},
        { label: "Craft and Related Trade Workers", value: "option-seven"},
        { label: "Plant and Machine Operators and Assemblers", value: "option-eight"},
        { label: "Elementary Occupations", value: "option-nine"},
        { label: "Armed Forces Occupations", value: "option-ten"},
        { label: "Others, specify:", value: "option-eleven", hasInput: true},
    ];

    const categoryOfEmployment = [
        { label: "Government", value: "option-one" },
        { label: "Private", value: "option-two" },
    ];



    return (
        <>
            <H1 title="Registration Form" />
            <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-4 gap-3 auto-rows-auto">
                <FormField className="col-span-3" label="Type of Registration">
                    <RadioGroup
                        defaultValue="option-one"
                        className="flex w-full"
                    >
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="option-one"
                                id="option-one"
                            />
                            <Span label="New Applicant" htmlFor="option-one" />
                        </div>
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="option-two"
                                id="option-two"
                            />
                            <Span label="Renewal" htmlFor="option-two" />
                        </div>
                    </RadioGroup>
                </FormField>

                <FormField
                    label='1"x1" Photo'
                    className="row-span-3"
                ></FormField>

                <FormField
                    className="col-span-3"
                    label="Person with disability number"
                >
                    <Input />
                </FormField>

                <h1 className="font-bold text-lg text-primary-color border-b-2 pb-3 mb-5 col-span-4">
                    Personal Information
                </h1>

                <FormField label="Last Name">
                    <Input />
                </FormField>

                <FormField label="First Name">
                    <Input />
                </FormField>

                <FormField label="Middle Name">
                    <Input />
                </FormField>

                <FormField label="Suffix">
                    <Input />
                </FormField>

                <FormField label="Date of Birth">
                    <Input type="date" />
                </FormField>

                <FormField label="Sex">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Male</SelectItem>
                            <SelectItem value="dark">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Civil Status">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {civilStatus.map((item) => {
                                return (
                                    <SelectItem value="light">
                                        {item.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Type of Disability">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeOfDisabilities.map((item) => {
                                return (
                                    <SelectItem value="light">
                                        {item.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </FormField>

            <FormH1 label="Residence Address"/>
                    

                <FormField label="House No. and Street">
                    <Input />
                </FormField>

                <FormField label="Barangay">
                    <Input />
                </FormField>

                <FormField label="Municipality">
                    <Input />
                </FormField>

                <FormField label="Province">
                    <Input />
                </FormField>

                <FormField label="Region">
                    <Input />
                </FormField>

                <FormH1 label="Contact Details" />

                <div className="col-span-4 grid grid-cols-3 gap-3">
                    <FormField label="Landline No.">
                        <Input />
                    </FormField>

                    <FormField label="Mobile No.">
                        <Input />
                    </FormField>

                    <FormField label="Email Address">
                        <Input />
                    </FormField>
                </div>

                <FormH1 label="Education" />

                <FormField
                    label="Educational Attainment"
                    className="col-span-4"
                />

                <RadioGroup
                    defaultValue="option-one"
                    className="col-span-4 grid grid-cols-4"
                >
                    {educationalAttainment.map((item) => {
                        return(
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value={item.value} id={item.value} />
                            <Span label={item.label} htmlFor={item.value} />
                        </div>
                        );
                    })}
                </RadioGroup>

                <FormH1 label="Employment Details" />

                <div className="col-span-4 grid grid-cols-3">
                    <FormField label="Status of Employment">
                        <RadioGroup defaultValue="option-one">

                            {statusOfEmployment.map((item) => {
                                return(
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span label={item.label} htmlFor={item.value}/>
                                </div>
                                );
                            })}
                        </RadioGroup>
                    </FormField>

                    <FormField label="Types Of Employment">
                        <RadioGroup defaultValue="option-one">

                            {typesOfEmployment.map((item) => {
                                return (
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span
                                        label={item.label}
                                        htmlFor={item.value}
                                    />
                                </div>
                                );
                            })}
                        </RadioGroup>
                    </FormField>

                    <FormField label="Category of Employment">
                        <RadioGroup defaultValue="option-one">
                            {categoryOfEmployment.map((item) => {
                                return(
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={item.value}
                                        id={item.value}
                                    />
                                    <Span label={item.label} htmlFor={item.value} />
                                </div>
                                );
                            })}
                        </RadioGroup>
                    </FormField>
                </div>

                <FormH1 label="Occupation" />

                <FormField label="Work Field" className="col-span-4" />

                <RadioGroup
                    defaultValue="option-one"
                    className="col-span-4 grid grid-cols-4"
                >
                    {occupations.map((item) => {
                        return(
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value={item.value} id={item.value} />
                            <Span label={item.label} htmlFor={item.value} />
                            {item.hasInput ? <BorderBInput/> : null}
                        </div>
                        );
                    })}
                </RadioGroup>

                <FormH1 label="Organization Information" />

                <FormField label="Organization Affiliated">
                    <Input />
                </FormField>

                <FormField label="Contact Person">
                    <Input />
                </FormField>

                <FormField label="Office Address">
                    <Input />
                </FormField>

                <FormField label="Telephone No.">
                    <Input />
                </FormField>

                <FormH1 label="ID Reference No." />

                <FormField label="SSS No.">
                    <Input />
                </FormField>

                <FormField label="GSIS No.">
                    <Input />
                </FormField>

                <FormField label="PAG-IBIG No.">
                    <Input />
                </FormField>

                <FormField label="PSN No.">
                    <Input />
                </FormField>

                <FormField label="PhilHealth No.">
                    <Input />
                </FormField>

                <FormH1 label="Family Information" />

                <Span></Span>
                <FormField label="Last Name" />
                <FormField label="First Name" />
                <FormField label="Middle Name" />

                <Span label="Father's Name:"></Span>
                <Input />
                <Input />
                <Input />

                <Span label="Mother's Name:"></Span>
                <Input />
                <Input />
                <Input />

                <Span label="Guardian's Name:"></Span>
                <Input />
                <Input />
                <Input />
            </div>
        </>
    );
};

export default Create;
