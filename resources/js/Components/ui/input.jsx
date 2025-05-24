import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    const handleKeyDown = (e) => {
        if (type === "number") {
            if (
                [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                (e.keyCode === 90 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 40)
            ) {
                return;
            }

            if (
                (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                (e.keyCode < 96 || e.keyCode > 105)
            ) {
                e.preventDefault();
            }
        }
    };

    const handlePaste = (e) => {
        if (type === "number") {
            const paste = (e.clipboardData || window.clipboardData).getData(
                "text"
            );
            if (!/^\d+$/.test(paste)) {
                e.preventDefault();
            }
        }
    };

    return (
        <input
            type={type}
            className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                className
            )}
            ref={ref}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
