import H1 from "@/Components/text/h1";
import React from "react";
import { Badge } from "@/Components/ui/badge";
import TDLabel from "@/Components/text/td-label";
import { InfoIcon } from "lucide-react";
import DivTable from "@/Components/div/div-table";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import NoData from "../../../images/noApplicationToShow.png";
import Pagination from "@/Components/pagination";
import Table from "@/Components/table/table";
import TableHead from "@/Components/table/table-head";
import TH from "@/Components/table/th";
import TableBody from "@/Components/table/table-body";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";

const Index = ({ applications, canCreateNew }) => {
    // Function to determine badge color based on status
    const getBadgeColorByStatus = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-500 hover:bg-green-600";
            case "rejected":
                return "bg-red-500 hover:bg-red-600";
            case "incomplete":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "pending":
                return "bg-blue-500 hover:bg-blue-600";
            default:
                return "bg-gray-500 hover:bg-gray-600"; // Default color
        }
    };

    // Function to determine text color based on application type
    const getTypeColor = (type) => {
        switch (type) {
            case "new_applicant":
                return "bg-orange-600 font-bold";
            case "renewal":
                return "bg-yellow-600 font-bold";
            default:
                return "text-primary-color font-bold"; // Default color
        }
    };

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
                    <img src={NoData} alt="No applications to show" />
                </div>
            )}
            {applications.data.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TH>Application Number</TH>
                            <TH className="hidden md:table-cell">
                                Application Date
                            </TH>
                            <TH className="hidden md:table-cell">
                                Type of Registration
                            </TH>
                            <TH>Status</TH>
                            <TH>Actions</TH>
                        </TableHead>
                        <TableBody>
                            {applications.data.map((item) => (
                                <tr key={item.id}>
                                    <TD>{item.application_number}</TD>
                                    <TD className="hidden md:table-cell">
                                        {item.application_date}
                                    </TD>
                                    <TD className="hidden md:table-cell">
                                        <Badge
                                            className={getTypeColor(
                                                item.type_of_registration
                                            )}
                                        >
                                            {item.formatted_type_of_application}
                                        </Badge>
                                    </TD>
                                    <TD>
                                        <Badge
                                            className={getBadgeColorByStatus(
                                                item.status
                                            )}
                                        >
                                            {item.formatted_status}
                                        </Badge>
                                    </TD>
                                    <TD>
                                        <Link
                                            href={route(
                                                "registration.show",
                                                item.id
                                            )}
                                        >
                                            <InfoIcon />
                                        </Link>
                                    </TD>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>

                    <Pagination data={applications} />
                </TableContainer>
            )}
        </>
    );
};

export default Index;
