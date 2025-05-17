import { useForm } from "@inertiajs/react";
import FormField from "@/Components/form/form-field";
import H1 from "@/Components/text/h1";
import React from "react";
import InfoLabel from "@/Components/text/info-label";
import { Button } from "@/Components/ui/button";
import Infolist from "@/Components/infolist";

const Show = ({ user, municipalities, provinces }) => {
    return (
        <>
            <H1 title="User Details" />

            <div className="w-full rounded-lg shadow-xl border md:p-10 p-5 grid grid-cols-2 auto-rows-auto gap-2">
                <Infolist title="First Name" value={user.first_name ?? "N/a"} />

                <Infolist
                    title="Midle Name"
                    value={user.middle_name ?? "N/a"}
                />

                <Infolist title="Last Name" value={user.last_name ?? "N/a"} />

                <Infolist title="Email" value={user.email ?? "N/a"} />

                <Infolist
                    title="Phone Number"
                    value={user.phone_number ?? "N/a"}
                />

                <Infolist title="Remarks" value={user.remarks ?? "N/a"} />

                <Infolist title="Role" value={user.role ?? "N/a"} />

                {user.role === "sub_admin" && (
                    <Infolist title="Provinces Assigned" value={provinces} />
                )}

                {user.role === "processer" && (
                    <Infolist
                        title="Municipalities Assigned"
                        value={municipalities}
                    />
                )}
            </div>
        </>
    );
};

export default Show;
