import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/Components/app-sidebar";
import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                {/* Mobile sidebar overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={closeMobileMenu}
                    />
                )}

                {/* Sidebar container */}
                <div
                    className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white
                               transition-transform duration-300 ease-in-out transform p-5
                               ${
                                   isMobileMenuOpen
                                       ? "translate-x-0"
                                       : "-translate-x-full"
                               } 
                               md:translate-x-0 border-r`}
                    onClick={(e) => e.stopPropagation()} // Prevent click propagation
                >
                    <AppSidebar />
                </div>

                {/* Main content area */}
                <main className="flex-1 flex flex-col w-full overflow-hidden bg-gray-50">
                    {/* Mobile header */}
                    <div className="md:hidden flex h-16 items-center border-b px-4 bg-white sticky top-0 z-30">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="font-semibold ml-2"></span>
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
        </SidebarProvider>
    );
}
