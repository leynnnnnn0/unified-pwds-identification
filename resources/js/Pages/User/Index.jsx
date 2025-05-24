import React, { useState, useEffect } from "react";
import H1 from "@/Components/text/h1";
import Table from "@/Components/table/table";
import TableBody from "@/Components/table/table-body";
import TableHead from "@/Components/table/table-head";
import TD from "@/Components/table/td";
import TableContainer from "@/Components/table/table-container";
import TH from "@/Components/table/th";
import { EyeIcon, EditIcon, TrashIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Pagination from "@/Components/pagination";
import SearchBar from "@/Components/table/search-bar";
import { Input } from "@/Components/ui/input";

const Index = ({ users, filters }) => {
    const [search, setSearch] = useState(filters.search || null);

    useEffect(() => {
        if (search == null) return;
        router.get(
            route("admin.users.index"),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [search]);
    return (
        <>
            <div className="flex items-center justify-between">
                <H1 title="Users" />
                <Button>
                    <Link href={route("admin.users.create")}>
                        Create New User
                    </Link>
                </Button>
            </div>
            <TableContainer>
                <div className="flex items-center justify-between">
                    <SearchBar>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            class="pl-10 rounded-lg md:first-letter:w-72 md:h-12 h-8"
                        />
                    </SearchBar>
                </div>
                <Table>
                    <TableHead>
                        <TH>Username</TH>
                        <TH className="hidden md:table-cell">Full Name</TH>
                        <TH className="hidden md:table-cell">Email</TH>
                        <TH>Roles</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {users.data.map((item) => (
                            <tr key={item.id}>
                                <TD>{item.username}</TD>
                                <TD className="hidden md:table-cell">
                                    {item.full_name}
                                </TD>
                                <TD className="hidden md:table-cell">
                                    {item.email}
                                </TD>
                                <TD>{item.role}</TD>
                                <TD>
                                    <div className="w-fit flex gap-3 items-center">
                                        <Link
                                            href={route(
                                                "admin.users.show",
                                                item.id
                                            )}
                                        >
                                            <EyeIcon className="size-4 md:size-6" />
                                        </Link>

                                        <Link
                                            href={route(
                                                "admin.users.edit",
                                                item.id
                                            )}
                                        >
                                            <EditIcon className="text-blue-500 size-4 md:size-6" />
                                        </Link>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Trash2Icon className="text-red-500 size-4 md:size-6" />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you absolutely sure
                                                        you want to delete this
                                                        application?
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogAction>
                                                        Yes
                                                    </AlertDialogAction>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TD>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
                <Pagination data={users} />
            </TableContainer>
        </>
    );
};

export default Index;
