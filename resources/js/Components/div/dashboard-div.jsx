import { Building } from "lucide-react";

export default function DashboardDiv({
    icon: Icon = Building,
    title = "Building",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iure ducimus quas velit nesciunt illo dolorum reiciendis, perferendis quibusdam animi.",
    className = "",
}) {
    return (
        <div
            className={`size-auto border-2 border-secondary-color p-5 flex flex-col gap-3 ${className}`}
        >
            <Icon className="w-10 h-10 text-secondary-color" />
            <h1 className="text-primary-color font-bold text-2xl font-poppins">
                {title}
            </h1>
            <p className="text-black/70 text-sm">{description}</p>
        </div>
    );
}
