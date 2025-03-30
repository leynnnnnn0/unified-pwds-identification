import H1 from "@/Components/text/h1";
import React from "react";
import { Badge } from "@/Components/ui/badge";
import TDLabel from "@/Components/text/td-label";
import { InfoIcon } from "lucide-react";
import DivTable from "@/Components/div/div-table";
import { Button } from "@/Components/ui/button";

const Index = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <H1 title="Registrations" />
                <Button>Create New</Button>
            </div>
            <div className="space-y-4">
                <DivTable>
                    <section className="flex-1">
                        <TDLabel>Request Number: RN-0000001</TDLabel>
                        <TDLabel>Request Date: August 11, 2025</TDLabel>
                        <TDLabel>
                            Status: <Badge>PENDING</Badge>
                        </TDLabel>
                    </section>
                    <section>
                        <InfoIcon />
                    </section>
                </DivTable>
            </div>
        </>
    );
};

export default Index;
