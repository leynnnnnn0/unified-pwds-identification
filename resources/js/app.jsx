import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Layout from "./Layouts/Layout";
import AdminLayout from "./Layouts/AdminLayout";
import APILayout from "./Layouts/APILayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        if (page.default.layout) {
            return page;
        }

        page.default.layout = (page) => {
            const path = window.location.pathname;

            if (
                path.startsWith("/login") ||
                path === "/" ||
                path.startsWith("/register") ||
                path == "/api" ||
                path == "/api/login" ||
                path == "/api/register" ||
                path == "/api/documentation" ||
                path.startsWith("/admin/card-printing/print") ||
                path.startsWith("/admin/card-printing/batch-print")
            ) {
                return page;
            }
            if (path.startsWith("/admin")) {
                return <AdminLayout>{page}</AdminLayout>;
            } else if (path.startsWith("/api")) {
                return <APILayout>{page}</APILayout>;
            } else {
                return <Layout>{page}</Layout>;
            }
        };

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
