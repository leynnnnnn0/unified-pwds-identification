import Pagination from "@/Components/pagination";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableContainer from "@/Components/table/table-container";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TH from "@/Components/table/th";
import H1 from "@/Components/text/h1";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { Download, PrinterIcon } from "lucide-react";

const Index = ({ cards }) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Handle individual checkbox selection
    const handleCheckboxChange = (id) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
        } else {
            setSelectedCards([...selectedCards, id]);
        }
    };

    // Handle select all checkbox
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedCards([]);
        } else {
            setSelectedCards(cards.data.map((card) => card.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle print individual card
    const handlePrintCard = (id) => {
        router.get(`/admin/card-printing/print/${id}`);
    };

    // Handle download PDF
    const handleDownloadPdf = (id) => {
        window.open(`/admin/card-printing/pdf/${id}`, "_blank");
    };

    // Handle batch print
    const handleBatchPrint = () => {
        if (selectedCards.length === 0) {
            alert("Please select at least one card to print");
            return;
        }

        router.post("/admin/card-printing/batch-print", {
            ids: selectedCards,
        });
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <H1 title="Cards To Print List" />
                <div className="space-x-2">
                    <Button
                        onClick={handleBatchPrint}
                        disabled={selectedCards.length === 0}
                    >
                        <PrinterIcon className="mr-2 h-4 w-4" />
                        Print Selected ({selectedCards.length})
                    </Button>
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TH>
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={handleSelectAllChange}
                                aria-label="Select all"
                            />
                        </TH>
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
                                <TD>
                                    <Checkbox
                                        checked={selectedCards.includes(
                                            item.id
                                        )}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(item.id)
                                        }
                                        aria-label={`Select card ${item.id}`}
                                    />
                                </TD>
                                <TD>{item.id}</TD>
                                <TD>{item.application_form_number}</TD>
                                <TD>{item.pwd_card_number}</TD>
                                <TD>{item.card_holder}</TD>
                                <TD>{item.effective_date}</TD>
                                <TD className="space-x-2">
                                    <Button
                                        size="sm"
                                        onClick={() => handlePrintCard(item.id)}
                                    >
                                        <PrinterIcon className="h-4 w-4" />
                                    </Button>
                                </TD>
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
