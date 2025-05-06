import { CircleAlertIcon, Home, UserCircle } from "lucide-react";
import MainLago from "../../images/mainLogo.jpg";
import { router, usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarLink } from "./sidebar-link";

import React from "react";

const AppSidebar = () => {
    const { auth } = usePage().props;

    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isLocked: false,
        },
        {
            title: "Profile",
            url: "/my-profile",
            icon: UserCircle,
            isLocked: !auth.is_verified,
            requiredStep:
                "Your Account is not yet fully verified, please create an application first.",
        },
        {
            title: "Applications",
            url: "/registration",
            icon: UserCircle,
            isLocked: !auth.is_account_completed,
            requiredStep:
                "You need to complete your account setup before proceeding to this page",
        },
        {
            title: "My Account",
            url: "/my-account",
            icon: UserCircle,
            isLocked: false,
        },
    ];

    const logout = () => {
        router.post("/logout", {
            onFinish: () => {
                console.log("Logged out");
            },
        });
    };

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
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarLink
                                        key={item.title}
                                        href={item.url}
                                        icon={item.icon}
                                        isLocked={item.isLocked}
                                        requiredStep={item.requiredStep}
                                    >
                                        <span>{item.title}</span>
                                    </SidebarLink>
                                ))}
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={logout}>
                                        <div className="flex items-center gap-2">
                                            <CircleAlertIcon className="w-4 h-4" />
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
};

export default AppSidebar;
