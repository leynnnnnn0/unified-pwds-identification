import { Building } from "lucide-react";

export default function DashboardDiv({
    icon: Icon = Building,
    title = "Building",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iure ducimus quas velit nesciunt illo dolorum reiciendis, perferendis quibusdam animi.",
    className = "",
}) {
    return (
        <div
            className={`h-full border-2 border-secondary-color p-3 sm:p-4 md:p-5 flex flex-col gap-2 md:gap-3 ${className}`}
        >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-secondary-color" />
            <h1 className="text-primary-color font-bold text-xl md:text-2xl font-poppins">
                {title}
            </h1>
            <p className="text-black/70 text-xs sm:text-sm">
                {description}
            </p>
        </div>
    );
}