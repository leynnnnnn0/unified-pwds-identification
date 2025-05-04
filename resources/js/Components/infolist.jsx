import React from "react";
import { Label } from "@/Components/ui/label";
const Infolist = ({ title, value }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-700 font-bold">{title}</span>
            <Label>{value}</Label>
        </div>
    );
};

export default Infolist;
