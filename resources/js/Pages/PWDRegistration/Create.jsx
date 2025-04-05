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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PanelBottom } from "lucide-react";


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
                            <Span label="New Applicant" htmlFor="option-one"/>
                        </div>
                        <div className="flex space-x-2 items-center h-fit flex-1">
                            <RadioGroupItem
                                value="option-two"
                                id="option-two"
                            />
                        <Span label="Renewal" htmlFor="option-two"/>
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

                <FormH1 label="Contact Details"/>

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
                
                <FormH1 label="Education"/>

                <FormField label="Educational Attainment" className="col-span-4"/>

                <RadioGroup defaultValue="option-one" className="col-span-4 grid grid-cols-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                            <Span label="None" htmlFor="option-one"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                            <Span label="Kindergarten" htmlFor="option-two"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                            <Span label="Elementary" htmlFor="option-three"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                            <Span label="Junior High School" htmlFor="option-four"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                            <Span label="Senior High School" htmlFor="option-five"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-six" id="option-six" />
                            <Span label="College" htmlFor="option-six"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-seven" id="option-seven" />
                            <Span label="Vocational" htmlFor="option-seven"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-eight" id="option-eight" />
                            <Span label="Post-Graduate" htmlFor="option-eight"/>
                    </div>
                </RadioGroup>
                
                <FormH1 label="Employment Details"/>

                <div className="col-span-4 grid grid-cols-3">
                    <FormField label="Status of Employment">
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Span label="Employed" htmlFor="option-one"/>
                     </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Span label="Unemployed" htmlFor="option-two"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Span label="Self-employed" htmlFor="option-ohree"/>
                     </div>
                </RadioGroup>
                    </FormField>

                    <FormField label="Types Of Employment">
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Span label="Permanent / Regular" htmlFor="option-one"/>
                     </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Span label="Seasonal" htmlFor="option-two"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Span label="Casual" htmlFor="option-three"/>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Span label="Emergency" htmlFor="option-four"/>
                     </div>
                </RadioGroup>
                    </FormField>

                    <FormField label="Category of Employment">
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Span label="Government" htmlFor="option-one"/>
                     </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Span label="Private" htmlFor="option-two"/>
                    </div>
                </RadioGroup>
                    </FormField>
                </div>

                <FormH1 label="Occupation"/>

                <FormField label="Work Field" className="col-span-4"/>
        
                <RadioGroup defaultValue="option-one" className="col-span-4 grid grid-cols-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                            <Span label="Managers" htmlFor="option-one"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                            <Span label="Professionals" htmlFor="option-two"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                            <Span label="Technicians and Associate Professionals" htmlFor="option-three"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                            <Span label="Clerical Support Workers" htmlFor="option-four"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                            <Span label="Service and Sales Workers" htmlFor="option-five"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-six" id="option-six" />
                            <Span label="Skilled Agricultural, Forestry and Fishery Workers" htmlFor="option-six"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-seven" id="option-seven" />
                            <Span label="Craft and Related Trade Workers" htmlFor="option-seven"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-eight" id="option-eight" />
                            <Span label="Plant and Machine Operators and Assemblers" htmlFor="option-eight"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-eight" id="option-eight" />
                            <Span label="Elementary Occupations" htmlFor="option-nine"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-ten" id="option-ten" />
                            <Span label="Armed Forces Occupations" htmlFor="option-ten"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-eleven" id="option-eleven" />
                            <Span label="Others, specify:" htmlFor="option-eleven"/>
                            <BorderBInput/>
                    </div>
                </RadioGroup>

                <FormH1 label="Organization Information"/>
                
                <FormField label="Organization Affiliated">
                    <Input/>
                </FormField>

                <FormField label="Contact Person">
                    <Input/>
                </FormField>

                <FormField label="Office Address">
                    <Input/>
                </FormField>

                <FormField label="Telephone No.">
                    <Input/>
                </FormField>
                
 
                <FormH1 label="ID Reference No."/>

                <FormField label="SSS No.">
                    <Input/>
                </FormField>

                <FormField label="GSIS No.">
                    <Input/>
                </FormField>

                <FormField label="PAG-IBIG No.">
                    <Input/>
                </FormField>

                <FormField label="PSN No.">
                    <Input/>
                </FormField>

                <FormField label="PhilHealth No.">
                    <Input/>
                </FormField>      

                <FormH1 label="Family Information"/>
                
                <Span></Span>
                <FormField label="Last Name"/>
                <FormField label="First Name"/> 
                <FormField label="Middle Name"/> 

                <Span label="Father's Name:"></Span>
                <Input/>
                <Input/>
                <Input/>

                <Span label="Mother's Name:"></Span>
                <Input/>
                <Input/>
                <Input/>

                <Span label="Guardian's Name:"></Span>
                <Input/>
                <Input/>
                <Input/>

                <FormH1 label="Form Accomplished By"/>
                
                <FormField label="Accomplished By:"/>

                 <RadioGroup defaultValue="option-one" className="col-span-3 grid grid-cols-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                            <Span label="Applicant" htmlFor="option-one"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                            <Span label="Guardian" htmlFor="option-two"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                            <Span label="Representative" htmlFor="option-three"/>
                    </div>
                </RadioGroup>

                <Span label="Name of the one who accomplished:"></Span>

                <FormField label="Last Name">
                    <Input/>
                </FormField>

                <FormField label="First Name">
                    <Input/>
                </FormField>

                <FormField label="Middle Name"> 
                    <Input/>
                </FormField>      

                <FormH1 label="Certification and Processing Information"/>

                <Span></Span>
                <Span label="Last Name"/>  
                <Span label="First Name"/>
                <Span label="Middle Name"/>

                <div className="col-span-1 grid grid-rows-1">
                    <FormField label="License No. of Physician">
                        <BorderBInput/>
                    </FormField>
                </div>
                <Input/>
                <Input/>
                <Input/>

                <FormField label="Processing Officer"/>
                <Input/>
                <Input/>
                <Input/>

                <FormField label="Approving Officer"/>
                <Input/>
                <Input/>
                <Input/>

                <FormField label="Encoder"/>
                <Input/>
                <Input/>
                <Input/>
                
                <FormField label="Name of Reporting Unit: (Office/Section)"/>
                <div className="col-span-3 grid grid-cols-1">
                <Input/>
                </div>
                
                
                <FormField label="Control No."/>
                <div className="col-span-3 grid grid-cols-1">
                <Input/>
                </div>
            </div>
        </>
    );
};

export default Create;
