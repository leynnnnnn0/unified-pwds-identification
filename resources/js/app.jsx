import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Layout from "./Layouts/Layout";
import AdminLayout from "./Layouts/AdminLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        if (window.location.pathname.startsWith("/admin")) {
            page.default.layout =
                page.default.layout ??
                ((page) => <AdminLayout>{page}</AdminLayout>);
        } else if (
            window.location.pathname.startsWith("/login") ||
            window.location.pathname == "/" ||
            window.location.pathname.startsWith("/register")
        ) {
            page.default.layout = null;
        } else {
            page.default.layout =
                page.default.layout ?? ((page) => <Layout>{page}</Layout>);
        }

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
