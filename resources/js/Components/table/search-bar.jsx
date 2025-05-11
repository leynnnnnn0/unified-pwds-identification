import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar = ({ children }) => {
    return (
        <div class="relative w-full sm:max-w-sm items-center ">
            {children}
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <SearchIcon class="size-6 text-muted-foreground" />
            </span>
        </div>
    );
};

export default SearchBar;
