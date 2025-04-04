    import React from "react";
import FormLabel from "@/Components/text/form-label";
import FlexCol from "@/Components/div/flex-col";
import { cn } from "@/lib/utils";
const FormField = ({ className, label, children }) => {
    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            <FormLabel label={label} />
            {children}
        </div>
    );
};

export default FormField;
