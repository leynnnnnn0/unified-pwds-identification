import React, { useState, useEffect } from "react";
import H1 from "@/Components/text/h1";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";
import TH from "@/Components/table/th";
import { EyeIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/pagination";
import SearchBar from "@/Components/table/search-bar";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { Funnel } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import FormField from "@/Components/form/form-field";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";

const Index = ({ applications, filters }) => {
    const getBadgeColorByStatus = (status) => {
        console.log(status);
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
                return "bg-primary-color font-bold"; // Default color
        }
    };

    const [search, setSearch] = useState(filters.search || null);

    useEffect(() => {
        if (search == null) return;
        router.get(
            route("admin.applications.index"),
            { search, status, type_of_application: typeOfApplication },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [search]);

    const [status, setStatus] = useState(filters.status || null);
    useEffect(() => {
        if (status == null) return;
        router.get(
            route("admin.applications.index"),
            { search, status, type_of_application: typeOfApplication },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [status]);

    const [typeOfApplication, setTypeOfApplication] = useState(
        filters.type_of_application || null
    );
    useEffect(() => {
        if (typeOfApplication == null) return;
        router.get(
            route("admin.applications.index"),
            { search, status, type_of_application: typeOfApplication },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [typeOfApplication]);

    const resetFilter = () => {
        setStatus(null);
        setSearch(null);
        setTypeOfApplication(null);

        router.get(
            route("admin.applications.index"),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };
    return (
        <>
            <H1 title="Applications" />
            <TableContainer>
                <div className="flex items-center justify-between">
                    <SearchBar>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            class="pl-10 rounded-lg w-72"
                        />
                    </SearchBar>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Funnel className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Button
                                        onClick={resetFilter}
                                        variant="link"
                                        className="text-red-500 text-xs self-start w-fit p-0 x-0"
                                    >
                                        Reset Filter
                                    </Button>
                                    <FormField
                                        label="Status"
                                        isRequired={false}
                                    >
                                        <Select
                                            value={status}
                                            onValueChange={(value) =>
                                                setStatus(value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="approved">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="incomplete">
                                                    Incomplete
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormField>

                                    <FormField
                                        label="Type of Application"
                                        isRequired={false}
                                    >
                                        <Select
                                            value={typeOfApplication}
                                            onValueChange={(value) =>
                                                setTypeOfApplication(value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new_applicant">
                                                    New Applicant
                                                </SelectItem>
                                                <SelectItem value="renewal">
                                                    Renewal
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormField>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
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
                                    <TD>
                                        <Badge
                                            className={getTypeColor(
                                                item.type_of_application
                                            )}
                                        >
                                            {item.formatted_type_of_application}
                                        </Badge>
                                    </TD>
                                    <TD>
                                        <Badge
                                            className={getBadgeColorByStatus(
                                                item.stat
                                            )}
                                        >
                                            {item.status}
                                        </Badge>
                                    </TD>
                                    <TD>
                                        <Link
                                            href={route(
                                                "admin.applications.show",
                                                item.id
                                            )}
                                        >
                                            <EyeIcon />
                                        </Link>
                                    </TD>
                                </tr>
                            );
                        })}
                    </TableBody>
                </Table>
                <Pagination data={applications} />
            </TableContainer>
        </>
    );
};

export default Index;
