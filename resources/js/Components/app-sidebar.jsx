import {
    Calendar,
    CircleAlertIcon,
    Home,
    Inbox,
    Search,
    Settings,
    UserCircle,
} from "lucide-react";
import MainLago from "../../images/mainLogo.jpg";
import { Link } from "@inertiajs/react";
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
import { icon } from "@fortawesome/fontawesome-svg-core";
import { router } from "@inertiajs/react";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "My Profile",
        url: "/my-profile",
        icon: UserCircle,
    },
    {
        title: "Registration",
        url: "/registration",
        icon: UserCircle,
    },
];

const logout = () => {
    console.log("test");
    router.post("/logout", {
        onFinish: () => {
            console.log("Logged out");
        },
    });
};

export function AppSidebar() {
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
                                            className="h-7"
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
                                {items.map((item) => (
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
                                ))}
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={logout}>
                                        <SidebarLink icon={CircleAlertIcon}>
                                            Logout
                                        </SidebarLink>
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
