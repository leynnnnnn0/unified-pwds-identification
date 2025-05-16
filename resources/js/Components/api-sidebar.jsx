import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    FileUser,
    UserCircle,
    Users,
    LogOut,
    CircleAlertIcon,
    ShieldCheck,
    KeyRound,
    ReceiptText,
    ChartBarDecreasing,
} from "lucide-react";
import { router } from "@inertiajs/react";
import MainLago from "../../images/apiLogo.png";
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
import { SidebarLink } from "./sidebar-link";

const logout = () => {
    router.post("/logout", {
        onFinish: () => {
            console.log("Logged out");
        },
    });
};

export function APISidebar() {
    const { auth } = usePage().props;
    const items = [
        {
            title: "Usage",
            url: "/api/usage",
            icon: ChartBarDecreasing,
            isVisible: true,
        },
        {
            title: "Billing",
            url: "/api/billing",
            icon: ReceiptText,
            isVisible: true,
        },
        {
            title: "API Keys",
            url: "/api/api-keys",
            icon: KeyRound,
            isVisible: true,
        },
    ];
    return (
        <div className="min-h-screen">
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <span className="text-base font-semibold">
                                        <img
                                            src={MainLago}
                                            alt=""
                                            className="h-12"
                                        />
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map(
                                    (item) =>
                                        item.isVisible && (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <SidebarLink
                                                        href={item.url}
                                                        icon={item.icon}
                                                    >
                                                        {item.title}
                                                    </SidebarLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                )}

                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={logout}>
                                        <div className="flex items-center gap-2">
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
}
;

{
    /* <SidebarMenu>
    <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton>

                    <Home className="w-4 h-4" />
                    <span>Main Menu</span>
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    <SidebarMenuSubItem>test</SidebarMenuSubItem>
                </SidebarMenuSub>
            </CollapsibleContent>
        </SidebarMenuItem>
    </Collapsible>
</SidebarMenu>; */
}
