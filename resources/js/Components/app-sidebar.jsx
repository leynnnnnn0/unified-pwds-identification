import {
    CircleAlertIcon,
    Home,
    UserCircle,
    FileUser,
    UserRound,
    LogOut,
} from "lucide-react";
import MainLogo from "../../images/mainLogo.jpg";
import { Link, router, usePage } from "@inertiajs/react";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const AppSidebar = ({ onItemClick }) => {
    const { auth } = usePage().props;
    const { url: currentUrl } = usePage();

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
            icon: UserRound,
            isLocked: !auth.is_verified,
            requiredStep:
                "Your Account is not yet fully verified, please create an application first.",
        },
        {
            title: "Applications",
            url: "/registration",
            icon: FileUser,
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

    const isCurrentPage = (url) => {
        // Check if the current URL matches or starts with the item URL
        // (for multi-level paths)
        return (
            currentUrl === url || (url !== "/" && currentUrl.startsWith(url))
        );
    };

    return (
        <div className="flex flex-col h-full">
            {/* Logo Header */}
            <div className="py-4 px-2 border-b">
                <a href="#" className="flex items-center">
                    <img src={MainLogo} alt="Logo" className="h-7" />
                </a>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 pt-4">
                <ul className="space-y-1">
                    {items.map((item) => (
                        <li key={item.title}>
                            {item.isLocked ? (
                                <div className="relative group">
                                    <button
                                        className="w-full flex items-center px-3 py-2 text-gray-400 rounded-md cursor-not-allowed"
                                        disabled
                                    >
                                        <item.icon className="w-4 h-4 mr-3" />
                                        <span>{item.title}</span>
                                        <CircleAlertIcon className="w-4 h-4 ml-auto text-amber-500" />
                                    </button>
                                    {item.requiredStep && (
                                        <div className="hidden group-hover:block absolute left-full ml-2 top-0 z-50 p-2 bg-gray-800 text-white text-xs rounded shadow-lg w-64">
                                            {item.requiredStep}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.url}
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors relative
                                              ${
                                                  isCurrentPage(item.url)
                                                      ? "bg-blue-50 text-blue-600 font-medium"
                                                      : "text-gray-700 hover:bg-gray-100"
                                              }`}
                                    onClick={() => onItemClick && onItemClick()}
                                >
                                    {isCurrentPage(item.url) && (
                                        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-600 rounded-r-full"></div>
                                    )}
                                    <item.icon
                                        className={`w-4 h-4 mr-3 ${
                                            isCurrentPage(item.url)
                                                ? "text-blue-600"
                                                : ""
                                        }`}
                                    />
                                    <span>{item.title}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="mt-auto pb-4 pt-2 border-t">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                        className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Logging out will end your current session. Do you want to proceed?
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logout}>Yes, I want to Logout</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
            </div>
        </div>
    );
};

export default AppSidebar;
