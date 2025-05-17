import { AdminSidebar } from "@/Components/admin-sidebar";
import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        if (isMobileMenuOpen) {
            const handleClickOutside = (e) => {
                if (
                    !e.target.closest(".sidebar-container") &&
                    !e.target.closest(".sidebar-trigger")
                ) {
                    setIsMobileMenuOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Mobile backdrop overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar container */}
            <div
                className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white 
                          transition-transform duration-300 ease-in-out sidebar-container
                          ${
                              isMobileMenuOpen
                                  ? "translate-x-0"
                                  : "-translate-x-full"
                          } 
                          lg:translate-x-0 border-r shadow-lg lg:shadow-none`}
            >
                <AdminSidebar onItemClick={closeMobileMenu} />
            </div>

            {/* Main content area */}
            <main className="flex-1 flex flex-col w-full overflow-hidden bg-gray-50">
                {/* Mobile header */}
                <div className="lg:hidden flex h-16 items-center justify-between border-b px-4 bg-white sticky top-0 z-30">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-md hover:bg-gray-100 sidebar-trigger"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                    <div className="flex-1 flex justify-center">
                        {/* Admin panel title or logo could go here */}
                    </div>
                    <div className="w-10"></div>{" "}
                    {/* Space balance for the layout */}
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-auto p-4 md:p-6 flex flex-col gap-5 w-full">
                    <Toaster
                        toastOptions={{
                            duration: 2000,
                        }}
                    />
                    {children}
                </div>
            </main>
        </div>
    );
}
