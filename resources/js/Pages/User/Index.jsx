import React from "react";
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
const Index = ({ users }) => {
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
                <Table>
                    <TableHead>
                        <TH>Username</TH>
                        <TH>Full Name</TH>
                        <TH>Email</TH>
                        <TH>Roles</TH>
                        <TH>Actions</TH>
                    </TableHead>
                    <TableBody>
                        {users.data.map((item) => (
                            <tr key={item.id}>
                                <TD>{item.username}</TD>
                                <TD>{item.full_name}</TD>
                                <TD>{item.email}</TD>
                                <TD>{item.role}</TD>
                                <TD></TD>
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
