import React from "react";

const Pagination = ({ data }) => {
    function filterLinks(links) {
        if (!links || links.length === 0) return [];

        // Find the index of the active page
        const activeIndex = links.findIndex((link) => link.active);

        // Always include Previous (index 0), Next (last index)
        // First page (index 1), Last page (second-to-last index)
        // And the active page
        const filteredLinks = links.filter((link, index) => {
            return (
                index === 0 || // Previous
                index === links.length - 1 || // Next
                index === 1 || // First page
                index === links.length - 2 || // Last page
                link.active // Current page
            );
        });

        return filteredLinks;
    }

    return (
        <>
            {data.data.length === 0 && (
                <div className="p-5 flex justify-center w-full">
                    Nothing to show
                </div>
            )}
            {data.data.length !== 0 && (
                <div className="flex items-center justify-end gap-2 mt-5">
                    {filterLinks(data.links).map((link, index) =>
                        link.url ? (
                            <a
                                key={index}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border border-gray-200 text-primary-font font-bold rounded-lg sm:text-sm text-xs ${
                                    link.active
                                        ? "bg-primary text-white"
                                        : "hover:bg-primary/50 transition-colors duration-300 "
                                }`}
                            />
                        ) : (
                            <span
                                key={index}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="px-3 py-1 border border-gray-200 text-primary-font font-bold rounded-lg sm:text-sm text-xs "
                            />
                        )
                    )}
                </div>
            )}
        </>
    );
};

export default Pagination;
