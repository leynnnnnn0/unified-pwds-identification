import {
    LogOut,
    KeyRound,
    ReceiptText,
    ChartBarDecreasing,
    Verified,
} from "lucide-react";
import { router, Link, usePage } from "@inertiajs/react";
import MainLogo from "../../images/apiLogo.png";
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
} from "@/components/ui/alert-dialog";

export function APISidebar({ onItemClick }) {
    const { auth } = usePage().props;
    const { url: currentUrl } = usePage();

    const items = [
        {
            title: "Usage",
            url: "/api/usage",
            icon: ChartBarDecreasing,
            isLocked: false,
            isVisible: true,
        },
        {
            title: "Billing",
            url: "/api/billing",
            icon: ReceiptText,
            isLocked: false,
            isVisible: true,
        },
        {
            title: "Verification",
            url: "/api/verification",
            icon: Verified,
            isLocked: false,
            isVisible: true,
        },
        {
            title: "API Keys",
            url: "/api/api-keys",
            icon: KeyRound,
            isLocked: false,
            isVisible: true,
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
        return (
            currentUrl === url || (url !== "/" && currentUrl.startsWith(url))
        );
    };

    return (
        <div className="flex flex-col h-full min-h-screen">
            {/* Logo Header */}
            <div className="py-4 px-2 border-b">
                <a href="#" className="flex items-center">
                    <img src={MainLogo} alt="API Logo" className="h-12" />
                </a>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 pt-4">
                <ul className="space-y-1">
                    {items.map(
                        (item) =>
                            item.isVisible && (
                                <li key={item.title}>
                                    {item.isLocked ? (
                                        <div className="relative group">
                                            <button
                                                className="w-full flex items-center px-3 py-2 text-gray-400 rounded-md cursor-not-allowed"
                                                disabled
                                            >
                                                <item.icon className="w-4 h-4 mr-3" />
                                                <span>{item.title}</span>
                                                {item.requiredStep && (
                                                    <CircleAlertIcon className="w-4 h-4 ml-auto text-amber-500" />
                                                )}
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
                                                          ? "bg-gray-50 text-gray-600 font-medium"
                                                          : "text-gray-700 hover:bg-gray-100"
                                                  }`}
                                            onClick={() =>
                                                onItemClick && onItemClick()
                                            }
                                        >
                                            {isCurrentPage(item.url) && (
                                                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gray-600 rounded-r-full"></div>
                                            )}
                                            <item.icon
                                                className={`w-4 h-4 mr-3 ${
                                                    isCurrentPage(item.url)
                                                        ? "text-gray-600"
                                                        : ""
                                                }`}
                                            />
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </li>
                            )
                    )}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="mt-auto pb-4 pt-2 border-t">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                            <LogOut className="w-4 h-4 mr-3" />
                            <span>Logout</span>
                        </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to logout?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Logging out will end your current session. Do
                                you wish to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={logout}>
                                Yes, I want to Logout
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
