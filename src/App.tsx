import { useCallback, useEffect, useState } from "react";
import type { ListingData, PackageInfo } from "./types";
import { useCopyToClipboard } from "./hooks/useClipboard";
import { useTheme } from "./hooks/useTheme";
import { Footer } from "./components/Footer";
import { HelpDialog } from "./components/HelpDialog";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PackageInfoDialog } from "./components/PackageInfoDialog";
import { PackagesSection } from "./components/PackagesSection";
import { RowMoreMenu } from "./components/RowMoreMenu";
import { Toast } from "./components/Toast";

interface AppProps {
    data: ListingData;
}

export const App = ({ data }: AppProps) => {
    const { listing, packages } = data;
    const { theme, toggleTheme } = useTheme();
    const [toast, setToast] = useState<string | null>(null);
    const [helpOpen, setHelpOpen] = useState(false);
    const [infoPackage, setInfoPackage] = useState<PackageInfo | null>(null);

    const showToast = useCallback((message: string) => setToast(message), []);
    const copy = useCopyToClipboard(showToast);

    useEffect(() => {
        document.title = listing.name || "VPM Repository";
    }, [listing.name]);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timeout = window.setTimeout(() => setToast(null), 2200);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    useEffect(() => {
        const dialogOpen = helpOpen || infoPackage !== null;
        document.body.style.overflow = dialogOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [helpOpen, infoPackage]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setHelpOpen(false);
                setInfoPackage(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const addRepoToVcc = useCallback(() => {
        if (!listing.url) {
            return;
        }

        window.location.assign(`vcc://vpm/addRepo?url=${encodeURIComponent(listing.url)}`);
    }, [listing.url]);

    const handleToggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        toggleTheme();
        showToast(`Switched to ${next} theme`);
    };

    return (
        <>
            <div className="bg-glow" aria-hidden="true" />

            <div className="app-container">
                <Navbar listing={listing} onToggleTheme={handleToggleTheme} />
                <Hero
                    listing={listing}
                    onAddToVcc={addRepoToVcc}
                    onShowHelp={() => setHelpOpen(true)}
                    onCopy={copy}
                />
                <PackagesSection
                    packages={packages}
                    onAddToVcc={addRepoToVcc}
                    onShowInfo={setInfoPackage}
                    onCopy={copy}
                />
                <Footer listing={listing} />
            </div>

            <RowMoreMenu />

            <HelpDialog
                open={helpOpen}
                listing={listing}
                onClose={() => setHelpOpen(false)}
                onAddToVcc={addRepoToVcc}
                onCopy={copy}
            />

            <PackageInfoDialog
                pkg={infoPackage}
                listing={listing}
                onClose={() => setInfoPackage(null)}
                onAddToVcc={addRepoToVcc}
                onShowHelp={() => setHelpOpen(true)}
                onCopy={copy}
            />

            <Toast message={toast} />
        </>
    );
};
