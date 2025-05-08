import React, { useState, useEffect } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchableSelect = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState({});
    const [debug, setDebug] = useState(false); // Set to true for debug info

    // Initialize filtered options with all options when component mounts or options change
    useEffect(() => {
        if (options && typeof options === "object") {
            setFilteredOptions(options);
        }
    }, [options]);

    // Filter options based on search value
    const handleSearch = (currentSearchValue) => {
        setSearchValue(currentSearchValue);

        // Make sure options is a valid object
        if (!options || typeof options !== "object") {
            console.error("Options is not a valid object:", options);
            setFilteredOptions({});
            return;
        }

        if (currentSearchValue.trim() === "") {
            // If no search, use all options
            setFilteredOptions(options);
        } else {
            // Filter the options based on search value
            const filtered = Object.entries(options).filter(([key, label]) => {
                if (typeof label !== "string") {
                    return false;
                }
                return label
                    .toLowerCase()
                    .includes(currentSearchValue.toLowerCase());
            });

            // Convert filtered entries back to an object
            const filteredObj = Object.fromEntries(filtered);
            setFilteredOptions(filteredObj);

            if (debug) {
                console.log("Filtered options:", filteredObj);
                console.log(
                    "Number of results:",
                    Object.keys(filteredObj).length
                );
            }
        }
    };

    const optionsArray = Object.entries(filteredOptions || {});
    const hasOptions = optionsArray.length > 0;

    if (debug) {
        console.log("Current filteredOptions:", filteredOptions);
        console.log("Options array length:", optionsArray.length);
        console.log("Has options:", hasOptions);
    }

    return (
        <div>
            {debug && (
                <div className="mb-2 p-2 bg-gray-100 text-xs">
                    <div>Search value: "{searchValue}"</div>
                    <div>Has options: {hasOptions ? "Yes" : "No"}</div>
                    <div>Options count: {optionsArray.length}</div>
                </div>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-expanded={open}
                    >
                        {value && options[value] ? options[value] : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search..."
                            className="h-9 "
                            value={searchValue}
                            onValueChange={handleSearch}
                        />

                        {!hasOptions && (
                            <CommandEmpty className="py-6 text-center">
                                No results found.
                            </CommandEmpty>
                        )}

                        {hasOptions && (
                            <CommandGroup>
                                <ScrollArea className="h-fit max-h-60">
                                    {optionsArray.map(([key, label]) => (
                                        <CommandItem
                                            key={key}
                                            value={key}
                                            onSelect={() => {
                                                onChange(key);
                                                setOpen(false);
                                                setSearchValue("");
                                            }}
                                            className="flex items-center"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === key
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {label}
                                        </CommandItem>
                                    ))}
                                </ScrollArea>
                            </CommandGroup>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SearchableSelect;
