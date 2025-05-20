import Pagination from "@/Components/pagination";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableContainer from "@/Components/table/table-container";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import H1 from "@/Components/text/h1";
import React from "react";

const Index = ({ cards }) => {
    return (
        <>
            <H1 title="Cards To Print List" />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TH>ID</TH>
                        <TH>Application Form Number</TH>
                        <TH>PWD Card Number</TH>
                        <TH>Card Holder</TH>
                        <TH>Effective Date</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {cards.data.map((item) => (
                            <tr key={item.id}>
                                <TD>{item.application_form_number}</TD>
                                <TD>{item.pwd_card_number}</TD>
                                <TD>{item.card_holder}</TD>
                                <TD>{item.effective_date}</TD>
                                <TD></TD>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
                <Pagination data={cards} />
            </TableContainer>
        </>
    );
};

export default Index;
