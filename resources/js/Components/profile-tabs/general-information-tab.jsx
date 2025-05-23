import React from "react";
import {
    UserCircle,
    Briefcase,
    Building,
    CreditCard,
    Users,
} from "lucide-react";
import Span from "@/Components/text/span";
import SpanValue from "@/Components/text/span-value";

const GeneralInformationTab = ({ application }) => {
    return (
        <div className="w-full space-y-8">
            <section>
                <span className="text-black/70 text-xs font-medium">
                    DISABILITY INFORMATION
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
                    <Span label="PWD Number:" />
                    <SpanValue text={application.pwd_number || "N/A"} />
                    <Span label="Cause of Disabilities:" />
                    <SpanValue
                        text={application.cause_of_disabilities_list || "N/A"}
                    />
                    <Span label="Disabilities:" />
                    <SpanValue text={application.disabilities_list || "N/A"} />
                </div>
            </section>

            <section>
                <span className="text-black/70 text-xs font-medium">
                    CONTACT INFORMATION
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
                    <Span label="Mobile Number:" />
                    <SpanValue text={application.mobile_no || "N/A"} />
                    <Span label="Landline Number:" />
                    <SpanValue text={application.landline_no || "N/A"} />
                    <Span label="Email Address:" />
                    <SpanValue text={application.email_address || "N/A"} />
                </div>
            </section>

            <section>
                <span className="text-black/70 text-xs font-medium">
                    EDUCATIONAL & EMPLOYMENT DETAILS
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
                    <Span label="Educational Attainment:" />
                    <SpanValue
                        text={application.educational_attainment || "N/A"}
                    />
                    <Span label="Employment Status:" />
                    <SpanValue
                        text={application.status_of_employment || "N/A"}
                    />
                    <Span label="Employment Type:" />
                    <SpanValue
                        text={application.types_of_employment || "N/A"}
                    />
                    <Span label="Employment Category:" />
                    <SpanValue
                        text={application.category_of_employment || "N/A"}
                    />
                    <Span label="Work Field:" />
                    <SpanValue
                        text={
                            application.work_field ||
                            application.other_field ||
                            "N/A"
                        }
                    />
                </div>
            </section>

            <section>
                <span className="text-black/70 text-xs font-medium">
                    ORGANIZATION AFFILIATION
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
                    <Span label="Organization:" />
                    <SpanValue
                        text={application.organization_affiliated || "N/A"}
                    />
                    <Span label="Contact Person:" />
                    <SpanValue text={application.contact_person || "N/A"} />
                    <Span label="Office Address:" />
                    <SpanValue text={application.office_address || "N/A"} />
                    <Span label="Telephone Number:" />
                    <SpanValue text={application.telephone_no || "N/A"} />
                </div>
            </section>

            <section>
                <span className="text-black/70 text-xs font-medium">
                    ID NUMBERS
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-b pb-5 border-black/50">
                    <Span label="SSS No:" />
                    <SpanValue text={application.sss_no || "N/A"} />
                    <Span label="GSIS No:" />
                    <SpanValue text={application.gsis_no || "N/A"} />
                    <Span label="Pag-IBIG No:" />
                    <SpanValue text={application.pag_ibig_no || "N/A"} />
                    <Span label="PSN No:" />
                    <SpanValue text={application.psn_no || "N/A"} />
                    <Span label="PhilHealth No:" />
                    <SpanValue text={application.philhealth_no || "N/A"} />
                </div>
            </section>

            <section>
                <span className="text-black/70 text-xs font-medium">
                    FAMILY INFORMATION
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-5">
                    <Span label="Father's Name:" />
                    <SpanValue
                        text={
                            application.father_first_name ||
                            application.father_middle_name ||
                            application.father_last_name
                                ? `${application.father_first_name || ""} ${
                                      application.father_middle_name || ""
                                  } ${
                                      application.father_last_name || ""
                                  }`.trim()
                                : "N/A"
                        }
                    />
                    <Span label="Mother's Name:" />
                    <SpanValue
                        text={
                            application.mother_first_name ||
                            application.mother_middle_name ||
                            application.mother_last_name
                                ? `${application.mother_first_name || ""} ${
                                      application.mother_middle_name || ""
                                  } ${
                                      application.mother_last_name || ""
                                  }`.trim()
                                : "N/A"
                        }
                    />
                    <Span label="Guardian's Name:" />
                    <SpanValue
                        text={
                            application.guardian_first_name ||
                            application.guardian_middle_name ||
                            application.guardian_last_name
                                ? `${application.guardian_first_name || ""} ${
                                      application.guardian_middle_name || ""
                                  } ${
                                      application.guardian_last_name || ""
                                  }`.trim()
                                : "N/A"
                        }
                    />
                </div>
            </section>
        </div>
    );
};

export default GeneralInformationTab;
