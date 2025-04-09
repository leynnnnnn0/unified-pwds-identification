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

        if (name.startsWith("admin")) {
            page.default.layout =
                page.default.layout ?? ((page) => <Layout>{page}</Layout>);
        } else {
            page.default.layout =
                page.default.layout ??
                ((page) => <AdminLayout>{page}</AdminLayout>);
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
