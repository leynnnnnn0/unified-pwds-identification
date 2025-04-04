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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Create = () => {
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

    const educationalAttainments = [
        { label: "None" },
        { label: "Kindergarten" },
        { label: "Elementary" },
        { label: "Junior High School" },
        { label: "Senior High School" },
        { label: "College" },
        { label: "Vocational" },
        { label: "Post Graduate" },
    ];

    const statusOfEmployment = [
        { label: "Employed" },
        { label: "Unemployed" },
        { label: "Self-employed" },
    ];

    const typesOfEmployment = [
        { label: "Permanent / Regular" },
        { label: "Seasonal" },
        { label: "Casual" },
        { label: "Emergency" },
    ];

    const occupations = [
        { label: "Managers" },
        { label: "Professional" },
        { label: "Technicians and Associate Professional" },
        { label: "Clerical Support Workers" },
    ];

    const categoryOfEmployment = [
        { label: "Government" },
        { label: "Private" },
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
                            <span
                                className="text-xs font-bold"
                                htmlFor="option-one"
                            >
                                New Applicant
                            </span>
                        </div>
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="option-two"
                                id="option-two"
                            />
                            <span
                                className="text-xs font-bold"
                                htmlFor="option-two"
                            >
                                Renewal
                            </span>
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


            </div>
        </>
    );
};

export default Create;
