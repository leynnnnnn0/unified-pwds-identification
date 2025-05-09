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
                <div className="overflow-hidden h-fit rounded-t-lg">
                    <table className="w-full">
                        <thead className="bg-primary-color text-white font-bold">
                            <tr>
                                <th className="text-start px-3 py-2">
                                    Application Number
                                </th>
                                <th className="text-start px-3 py-2">
                                    Application Date
                                </th>
                                <th className="text-start px-3 py-2">
                                    Type of Registration
                                </th>
                                <th className="text-start px-3 py-2">Status</th>
                                <th className="text-start px-3 py-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.data.map((item) => (
                                <tr
                                    className="border-b-primary-color border-b"
                                    key={item.id}
                                >
                                    <td className="text-primary-color font-bold px-3 py-4">
                                        {item.application_number}
                                    </td>
                                    <td className="text-primary-color font-bold px-3 py-4">
                                        {item.application_date}
                                    </td>
                                    <td>
                                        <Badge
                                            className={getTypeColor(
                                                item.type_of_registration
                                            )}
                                        >
                                            {item.formatted_type_of_application}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-4">
                                        <Badge
                                            className={getBadgeColorByStatus(
                                                item.status
                                            )}
                                        >
                                            {item.formatted_status}
                                        </Badge>
                                    </td>
                                    <td className="text-primary-color font-bold px-3 py-4">
                                        <Link
                                            href={route(
                                                "registration.show",
                                                item.id
                                            )}
                                        >
                                            <InfoIcon />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination data={applications}/>
                </div>
            )}
        </>
    );
};

export default Index;
