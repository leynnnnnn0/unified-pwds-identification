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
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

const Show = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    return (
        <>
            <div className="flex items-center justify-between">
                <H1 title="Application Details" />
                <Button>
                    <Link
                        href={route(
                            "admin.applications.process",
                            application.id
                        )}
                    >
                        Process Application
                    </Link>
                </Button>
            </div>
            <div className="w-full rounded-lg shadow-xl border p-10 grid grid-cols-4 gap-3 auto-rows-auto">
                <FormField className="col-span-3" label="Type of Registration">
                    <RadioGroup
                        disabled
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

                <FormH1 label="Residence Address" />

                <FormField label="House No. and Street">
                    <Input
                        disabled
                        value={application.house_no_and_street || ""}
                    />
                </FormField>

                <FormField label="Barangay">
                    <Input disabled value={application.barangay || ""} />
                </FormField>

                <FormField label="Municipality">
                    <Input disabled value={application.municipality || ""} />
                </FormField>

                <FormField label="Province">
                    <Input disabled value={application.province || ""} />
                </FormField>

                <FormField label="Region">
                    <Input disabled value={application.region || ""} />
                </FormField>

                <FormH1 label="Contact Details" />

                <div className="col-span-4 grid grid-cols-3 gap-3">
                    <FormField label="Landline No." isRequired={false}>
                        <Input value={application.landline_no || ""} disabled />
                    </FormField>

                    <FormField label="Mobile No.">
                        <Input value={application.mobile_no || ""} disabled />
                    </FormField>

                    <FormField label="Email Address" isRequired={false}>
                        <Input
                            value={application.email_address || ""}
                            disabled
                        />
                    </FormField>
                </div>

                <FormH1 label="Employment Details" />

                <div className="col-span-4 grid grid-cols-3">
                    <FormField label="Status of Employment">
                        <RadioGroup
                            disabled
                            value={application.status_of_employment || ""}
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

                    <FormField label="Types Of Employment" isRequired={false}>
                        <RadioGroup
                            disabled
                            value={application.types_of_employment || ""}
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
                        isRequired={false}
                    >
                        <RadioGroup
                            disabled
                            value={application.category_of_employment || ""}
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

                <FormH1 label="Organization Information" />

                <FormField label="Organization Affiliated" isRequired={false}>
                    <Input
                        disabled
                        value={application.organization_affiliated || ""}
                    />
                </FormField>

                <FormField label="Contact Person" isRequired={false}>
                    <Input disabled value={application.contact_person || ""} />
                </FormField>

                <FormField label="Office Address" isRequired={false}>
                    <Input disabled value={application.office_address || ""} />
                </FormField>

                <FormField label="Telephone No." isRequired={false}>
                    <Input disabled value={application.telephone_no || ""} />
                </FormField>

                <FormH1 label="ID Reference No." />

                <FormField label="SSS No." isRequired={false}>
                    <Input disabled value={application.sss_no || ""} />
                </FormField>

                <FormField label="GSIS No." isRequired={false}>
                    <Input disabled value={application.gsis_no || ""} />
                </FormField>

                <FormField label="PAG-IBIG No." isRequired={false}>
                    <Input disabled value={application.pag_ibig_no || ""} />
                </FormField>

                <FormField label="PSN No." isRequired={false}>
                    <Input disabled value={application.psn_no || ""} />
                </FormField>

                <FormField label="PhilHealth No." isRequired={false}>
                    <Input disabled value={application.philhealth_no || ""} />
                </FormField>

                <FormH1 label="Family Information" />

                <Span></Span>
                <FormField label="Last Name" />
                <FormField label="First Name" />
                <FormField label="Middle Name" />

                <Span label="Father's Name:"></Span>
                <Input value={application.father_last_name || ""} disabled />
                <Input value={application.father_first_name || ""} disabled />
                <Input value={application.father_middle_name || ""} disabled />

                <Span label="Mother's Name:"></Span>
                <Input value={application.mother_last_name || ""} disabled />
                <Input value={application.mother_first_name || ""} disabled />
                <Input value={application.mother_middle_name || ""} disabled />

                <Span label="Guardian's Name:"></Span>
                <Input value={application.guardian_last_name || ""} disabled />
                <Input value={application.guardian_first_name || ""} disabled />
                <Input
                    value={application.guardian_middle_name || ""}
                    disabled
                />
            </div>
        </>
    );
};

export default Show;
