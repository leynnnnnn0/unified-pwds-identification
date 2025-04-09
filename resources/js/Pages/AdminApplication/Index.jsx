import React from "react";
import H1 from "@/Components/text/h1";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";
import TH from "@/Components/table/th";
const Index = ({ applications }) => {
    return (
        <>
            <H1 title="Applications" />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TH>Application Number</TH>
                        <TH>Application Date</TH>
                        <TH>Encoder</TH>
                        <TH>Type Of Registration</TH>
                        <TH>Status</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {applications.data.map(function (item) {
                            return (
                                <tr key={item.id}>
                                    <TD>{item.application_number}</TD>
                                    <TD>{item.application_date}</TD>
                                    <TD>{item.encoder}</TD>
                                    <TD>{item.type_of_registration}</TD>
                                    <TD>{item.status}</TD>
                                    <TD></TD>
                                </tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Index;
