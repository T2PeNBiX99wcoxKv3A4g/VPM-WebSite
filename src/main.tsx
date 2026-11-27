import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts: the listing is served from Pages, so no external request is
// needed (and the site keeps working while Google Fonts is unreachable).
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-800.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";

import "./styles/global.scss";

import { App } from "./App";
import { I18nProvider } from "./i18n/Provider";
import { loadListingData } from "./listing-data";
import { applyInitialTheme } from "./hooks/useTheme";

const container = document.getElementById("root");

if (!container) {
    throw new Error("Missing #root container");
}

// Before the first paint: the theme follows the system preference until the user
// explicitly toggles it (then the choice is stored).
applyInitialTheme();

void loadListingData().then(data => {
    createRoot(container).render(
        <StrictMode>
            <I18nProvider>
                <App data={data} />
            </I18nProvider>
        </StrictMode>
    );
});
