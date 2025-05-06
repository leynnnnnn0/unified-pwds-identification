import H1 from "@/Components/text/h1";
import React from "react";
import { Badge } from "@/Components/ui/badge";
import TDLabel from "@/Components/text/td-label";
import { InfoIcon } from "lucide-react";
import DivTable from "@/Components/div/div-table";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import NoData from "../../../images/noApplicationToShow.png";

const Index = ({ applications, canCreateNew }) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <H1 title="Applications" />
                <Button disabled={!canCreateNew}>
                    <Link href={route("registration.create")}>Create</Link>
                </Button>
            </div>
            {applications.data.length === 0 && (
                <div className="h-full w-full flex items-center justify-center">
                    <img src={NoData} />
                </div>
            )}
            <div className="space-y-4">
                {applications.data.map((application) => (
                    <DivTable key={application.id}>
                        <section className="flex-1">
                            <TDLabel>
                                Request Number: {application.application_number}
                            </TDLabel>
                            <TDLabel>
                                Request Date: {application.application_date}
                            </TDLabel>
                            <TDLabel>
                                Status: <Badge>{application.status}</Badge>
                            </TDLabel>
                        </section>
                        <section>
                            <Link
                                href={route(
                                    "registration.show",
                                    application.id
                                )}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <InfoIcon />
                            </Link>
                        </section>
                    </DivTable>
                ))}
            </div>
        </>
    );
};

export default Index;
