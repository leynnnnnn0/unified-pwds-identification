import { Link, usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar";
export function SidebarLink({ href, children, icon: Icon }) {
    const { url } = usePage();
    const isActive = url === href;

    return (
        <SidebarMenuItem className={isActive ? "bg-gray-200 rounded-lg" : ""}>
            <SidebarMenuButton asChild>
                <Link
                    href={href}
                    className={`flex items-center gap-2 ${
                        isActive ? "text-primary font-bold" : ""
                    }`}
                >
                    <Icon
                        className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                    />
                    <span>{children}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
