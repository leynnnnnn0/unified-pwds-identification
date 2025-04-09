import React, { useState, useRef } from "react";
import H1 from "@/Components/text/h1";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormField from "@/Components/form/form-field";
import Span from "@/Components/text/span";
import { Input } from "@/components/ui/Input";
import FormH1 from "@/Components/text/form-h1";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const Show = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    return (
        <>
            <H1 title="Application Details" />
            <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-4 gap-3 auto-rows-auto">
                <FormField
                    disabled
                    className="col-span-3"
                    label="Type of Registration"
                >
                    <RadioGroup
                        value={application.type_of_registration}
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
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer mb-2 overflow-hidden">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Selected photo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center text-gray-500 text-sm">
                                No photo to show
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
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
                    <Input disabled value={application.pwd_number || ""} />
                </FormField>

                <FormH1 label="Personal Information" />

                <FormField label="Last Name">
                    <Input
                        disabled
                        value={application.last_name || ""}
                        onChange={(e) =>
                            form.setData("last_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="First Name">
                    <Input disabled value={application.first_name || ""} />
                </FormField>

                <FormField label="Middle Name" isRequired={false}>
                    <Input disabled value={application.middle_name || ""} />
                </FormField>

                <FormField label="Suffix" isRequired={false}>
                    <Input disabled value={application.suffix || ""} />
                </FormField>

                <FormField label="Date of Birth">
                    <Input
                        disabled
                        type="date"
                        value={application.date_of_birth || ""}
                    />
                </FormField>

                <FormField label="Sex">
                    <Select disabled value={application.sex || ""}>
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
                    <Select disabled value={application.civil_status || ""}>
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
                        disabled
                        value={application.type_of_disability || ""}
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
            </div>
        </>
    );
};

export default Show;
