import { Link, usePage } from "@inertiajs/react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Lock } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Restricted from "../../images/restrictedPage.png";
export function SidebarLink({
    href,
    children,
    icon: Icon,
    isLocked,
    requiredStep,
}) {
    const { url } = usePage();
    const isActive = url === href;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Common styles for both clickable and non-clickable items
    const commonStyles = `flex items-center w-full  ${
        isActive ? "text-primary font-bold" : ""
    } ${isLocked ? "opacity-70 cursor-not-allowed" : ""}`;

    // Common icon styles
    const iconStyles = `w-4 h-4 mr-2 ${isActive ? "text-primary" : ""}`;

    const handleClick = () => {
        if (isLocked) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <SidebarMenuItem
                className={isActive ? "bg-gray-200 rounded-lg" : ""}
            >
                <SidebarMenuButton
                    asChild={!isLocked}
                    onClick={isLocked ? handleClick : undefined}
                    className={isLocked ? "cursor-pointer" : ""}
                >
                    {isLocked ? (
                        // Clickable div for locked items that shows modal
                        <div className={commonStyles}>
                            <Icon className={iconStyles} />
                            <div className="flex-1 flex items-center justify-between font-poppins">
                                {children}
                                <Lock className="size-4 ml-2" />
                            </div>
                        </div>
                    ) : (
                        // Regular link for unlocked items
                        <Link href={href} className={commonStyles}>
                            <Icon className={iconStyles} />
                            <div className="flex-1 flex items-center justify-between font-poppins">
                                {children}
                            </div>
                        </Link>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Lock Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Access Restricted</DialogTitle>
                        <DialogDescription>
                            This feature is currently locked and not available.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <img src={Restricted} alt="restricted" />
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        {requiredStep ??
                            "Please complete the required steps to unlock this feature."}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
