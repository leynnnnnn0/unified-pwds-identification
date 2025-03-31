import H1 from "@/Components/text/h1";
import React from "react";
import DOHLogo from "../../../images/doh.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Span from "@/Components/text/span";
import RegistrationGrid from "@/Components/div/registration-grid";
import FormLabel from "@/Components/text/form-label";
import FlexCol from "@/Components/div/flex-col";
import BorderBInput from "@/Components/input/border-b-input";
import { Checkbox } from "@/components/ui/checkbox";

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
    return (
        <>
            <header className="flex w-full justify-center gap-10 relative">
                <img
                    src={DOHLogo}
                    alt="DOH Logo"
                    className="h-20 absolute mr-[500px]"
                />
                <section className="flex flex-col items-center justify-center">
                    <h1 className="text-gray-700 font-bold text-xl">
                        Department of Health
                    </h1>
                    <h1 className="text-gray-700 font-bold text-sm">
                        Philippine Registry For Person with Disablities
                    </h1>
                    <h1 className="text-gray-700 font-bold text-xl">
                        Application Form
                    </h1>
                </section>
            </header>

            <div className="grid grid-cols-5 auto-rows-auto divide-black h-fit">
                <RegistrationGrid className="h-14 col-span-4 px-2 py-1 border-black border-2 flex">
                    <FormLabel className="mr-12" label="1." />
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
                </RegistrationGrid>

                <RegistrationGrid className="justify-center text-center">
                    <FormLabel label='Place 1"x1" Photo here' />
                </RegistrationGrid>

                <RegistrationGrid className="col-span-3 h-14">
                    <FlexCol>
                        <FormLabel label="2. PERSON WITH DISABILITY NUMBER(RR-PPMM-BBB-NNNNNNN)" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>
                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="3. DATE APPLIED:" />
                        <BorderBInput type="date" />
                    </FlexCol>
                </RegistrationGrid>
                <RegistrationGrid className="row-span-3"></RegistrationGrid>

                <RegistrationGrid className="col-span-4">
                    <FormLabel label="4. PERSONAL INFORMATION" />
                </RegistrationGrid>

                <RegistrationGrid className="h-14">
                    <FlexCol>
                        <FormLabel
                            label="LAST NAME:"
                            className="text-center w-full"
                        />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="h-14">
                    <FlexCol>
                        <FormLabel
                            label="FIRST NAME:"
                            className="text-center w-full"
                        />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>
                <RegistrationGrid className="h-14">
                    <FlexCol>
                        <FormLabel
                            label="MIDDLE NAME:"
                            isRequired={false}
                            className="text-center w-full"
                        />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>
                <RegistrationGrid className="h-14">
                    <FlexCol>
                        <FormLabel
                            label="SUFFIX:"
                            isRequired={false}
                            className="text-center w-full"
                        />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-3">
                    <FlexCol>
                        <FormLabel label="5. DATE OF BIRTH:" />
                        <BorderBInput type="date" />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-2">
                    <FlexCol>
                        <FormLabel label="6. SEX:" />

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
                                    Male
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
                                    Female
                                </span>
                            </div>
                        </RadioGroup>
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-5">
                    <FlexCol>
                        <FormLabel label="7. CIVIL STATUS:" />

                        <RadioGroup
                            defaultValue="option-one"
                            className="flex w-full"
                        >
                            {civilStatus.map((item) => {
                                return (
                                    <div
                                        className="flex space-x-2 items-center h-fit flex-1"
                                        key={item.label}
                                    >
                                        <RadioGroupItem value={item.label} />
                                        <span className="text-xs font-bold">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </FlexCol>
                </RegistrationGrid>
                <RegistrationGrid className="col-span-3">
                    <FlexCol>
                        <FormLabel label="8. TYPE OF DISABILITY:" />
                        <div className="w-full grid grid-cols-2 gap-1">
                            {typeOfDisabilities.map((item) => {
                                return (
                                    <div
                                        className="flex space-x-2 items-center h-fit flex-1"
                                        key={item.label}
                                    >
                                        <Checkbox value={item.label} />
                                        <span className="text-xs font-bold">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-2">
                    <FlexCol>
                        <FormLabel label="9. CAUSE OF DISABILITY:" />
                        <div className="grid grid-cols-2 gap">
                            <div className="w-full grid grid-cols-1 gap-1">
                                <div className="flex space-x-2 items-center h-fit flex-1">
                                    <Checkbox value="none" />
                                    <span className="text-xs font-bold">
                                        Conginetal
                                    </span>
                                </div>
                                {congenitalCause.map((item) => {
                                    return (
                                        <div
                                            className="ml-4 flex space-x-2 items-center h-fit flex-1"
                                            key={item.label}
                                        >
                                            <Checkbox value={item.label} />
                                            <span className="text-xs">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                                <div className="ml-4 flex space-x-2 items-center h-fit flex-1">
                                    <Checkbox value="none" />
                                    <span className="text-xs flex items-center">
                                        Others. Specify <BorderBInput />
                                    </span>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-1 gap-1">
                                <div className="flex space-x-2 items-center h-fit flex-1">
                                    <Checkbox value="none" />
                                    <span className="text-xs font-bold">
                                        Acquired
                                    </span>
                                </div>
                                {acquiredCause.map((item) => {
                                    return (
                                        <div
                                            className="ml-4 flex space-x-2 items-center h-fit flex-1"
                                            key={item.label}
                                        >
                                            <Checkbox value={item.label} />
                                            <span className="text-xs">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                                <div className="ml-4 flex space-x-2 items-center h-fit flex-1">
                                    <Checkbox value="none" />
                                    <span className="text-xs flex items-center">
                                        Others. Specify <BorderBInput />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-5">
                    <FormLabel label="4. RESIDENCE ADDRESS" />
                </RegistrationGrid>

                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="House No. and Street:" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="Barangay:" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="Municipality:" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="Provice:" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid>
                    <FlexCol>
                        <FormLabel label="Region:" />
                        <BorderBInput />
                    </FlexCol>
                </RegistrationGrid>

                <RegistrationGrid className="col-span-5">
                    <FormLabel label="4. CONTACT DETAILS" isRequired={false} />
                </RegistrationGrid>

                <RegistrationGrid className="px-0 py-0 col-span-5">
                    <div className="grid grid-cols-3 col-span-5 w-full">
                        <RegistrationGrid>
                            <FlexCol>
                                <FormLabel
                                    label="Landline No:"
                                    isRequired={false}
                                />
                                <BorderBInput />
                            </FlexCol>
                        </RegistrationGrid>

                        <RegistrationGrid>
                            <FlexCol>
                                <FormLabel
                                    label="Mobile No:"
                                    isRequired={false}
                                />
                                <BorderBInput />
                            </FlexCol>
                        </RegistrationGrid>

                        <RegistrationGrid>
                            <FlexCol>
                                <FormLabel
                                    label="E-mail Address:"
                                    isRequired={false}
                                />
                                <BorderBInput />
                            </FlexCol>
                        </RegistrationGrid>
                    </div>
                </RegistrationGrid>
            </div>
        </>
    );
};

export default Create;
