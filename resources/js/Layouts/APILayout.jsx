import { AdminSidebar } from "@/Components/admin-sidebar";
import { APISidebar } from "@/Components/api-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/toaster";
import React from "react";

const APILayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <APISidebar />
                <main className="flex-1 overflow-hidden w-full flex flex-col">
                    <div className="sticky top-0 z-10">
                        <SidebarTrigger />
                    </div>
                    <div className="flex-1 overflow-auto p-5 flex flex-col gap-5 w-full">
                        <Toaster />
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default APILayout;
