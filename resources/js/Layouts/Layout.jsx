import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-hidden w-full flex flex-col">
                    <div className="sticky top-0 z-10">
                        <SidebarTrigger />
                    </div>
                    <div className="flex-1 overflow-auto p-5 flex flex-col gap-5 w-full">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
