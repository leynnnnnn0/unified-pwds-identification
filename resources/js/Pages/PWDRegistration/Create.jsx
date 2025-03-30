import H1 from "@/Components/text/h1";
import React from "react";
import DOHLogo from "../../../images/doh.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Span from "@/Components/text/span";
import RegistrationGrid from "@/Components/div/registration-grid";
import FormLabel from "@/Components/text/form-label";
import FlexCol from "@/Components/div/flex-col";
import BorderBInput from "@/Components/input/border-b-input";
const Create = () => {
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

                <RegistrationGrid className="col-span-4 h-7">
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
            </div>
        </>
    );
};

export default Create;
