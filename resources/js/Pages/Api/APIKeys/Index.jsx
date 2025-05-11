import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

const Index = () => {
    return (
        <>
            <div className="flex items center justify-between border-b pb-5">
                <h1 className="font-bold text-xl text-gray-800 ">API Keys</h1>

                <Button className="bg-primary-color">
                    <PlusIcon /> Create new secret key
                </Button>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-gray-600 text-sm">
                    As an owner of this project, you can view and manage all API
                    keys in this project.
                </p>

                <p className="text-gray-600 text-sm">
                    Do not share your API key with others or expose it in the
                    browser or other client-side code. To protect your account's
                    security, OpenAI may automatically disable any API key that
                    has leaked publicly.
                </p>

                <p className="text-gray-600 text-sm">
                    View usage per API key on the{" "}
                    <span className="text-primary-color cursor-pointer hover:opacity-70">
                        Usage page
                    </span>{" "}
                    .
                </p>
            </div>

            <div className="mt-10">
                <Table>
                    <TableHead>
                        <TH>Name</TH>
                        <TH>Secret Key</TH>
                        <TH>Last Used</TH>
                        <TH>Created By</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        <tr>
                            <TD>Test</TD>
                            <TD>sk....m_43</TD>
                            <TD>Never</TD>
                            <TD>Nathaniel Alvarez</TD>
                            <TD></TD>
                        </tr>
                        <tr>
                            <TD>Test</TD>
                            <TD>sk....m_43</TD>
                            <TD>Never</TD>
                            <TD>Nathaniel Alvarez</TD>
                            <TD></TD>
                        </tr>
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default Index;
