import {useEffect, useMemo, useRef, useState} from "react";
import type {PackageInfo, PackageMap} from "../types";
import {PackageCard} from "./PackageCard";
import {ClearIcon, EmptySearchIcon, SearchIcon} from "./icons";

interface PackagesSectionProps {
    packages: PackageMap;
    onAddToVcc: () => void;
    onShowInfo: (pkg: PackageInfo) => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

const matchesQuery = (pkg: PackageInfo, term: string) => {
    const haystack = [
        pkg.displayName,
        pkg.name,
        pkg.description,
        pkg.type,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return haystack.includes(term);
};

export const PackagesSection = ({packages, onAddToVcc, onShowInfo, onCopy}: PackagesSectionProps) => {
    const [query, setQuery] = useState("");
    const searchInput = useRef<HTMLInputElement>(null);

    const allPackages = useMemo(() => Object.values(packages), [packages]);
    const term = query.trim().toLowerCase();
    const visiblePackages = useMemo(
        () => (term ? allPackages.filter(pkg => matchesQuery(pkg, term)) : allPackages),
        [allPackages, term]
    );

    const total = allPackages.length;
    const visible = visiblePackages.length;

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const active = document.activeElement;
            const isTyping = ["input", "textarea"].includes(active?.tagName.toLowerCase() ?? "");

            if (event.key === "/" && !isTyping) {
                event.preventDefault();
                searchInput.current?.focus();
                searchInput.current?.select();
                return;
            }

            if (event.key === "Escape" && active === searchInput.current && searchInput.current?.value) {
                setQuery("");
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const countLabel =
        total === 0
            ? "0 packages"
            : visible === total
                ? `${total} ${total === 1 ? "package" : "packages"}`
                : `${visible} of ${total} packages`;

    return (
        <section className="packages-section">
            <div className="packages-section-header">
                <div className="packages-title-wrap">
                    <h2 className="packages-title">Packages</h2>
                    <span className="packages-count-badge" id="packageCountBadge">
                        {countLabel}
                    </span>
                </div>
                <div className="searchBlock search-container">
                    <SearchIcon/>
                    <input
                        ref={searchInput}
                        type="text"
                        id="searchInput"
                        className="search-input"
                        placeholder="Search packages by name, ID or description..."
                        autoComplete="off"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    <button
                        type="button"
                        id="searchClearBtn"
                        className="search-clear-btn"
                        aria-label="Clear search"
                        title="Clear search"
                        hidden={!query}
                        onClick={() => {
                            setQuery("");
                            searchInput.current?.focus();
                        }}
                    >
                        <ClearIcon/>
                    </button>
                    <div className="search-kbd-tip" id="searchKbdTip" style={query ? {display: "none"} : undefined}>
                        /
                    </div>
                </div>
            </div>

            <div className="packages packages-card-wrapper">
                <div id="packageGrid" className="package-grid">
                    {visiblePackages.map(pkg => (
                        <PackageCard
                            key={pkg.name}
                            pkg={pkg}
                            onAddToVcc={onAddToVcc}
                            onShowInfo={onShowInfo}
                            onCopy={onCopy}
                        />
                    ))}
                </div>

                <div id="noResultsState" className="empty-state" hidden={!(visible === 0 && total > 0)}>
                    <div className="empty-icon">
                        <EmptySearchIcon/>
                    </div>
                    <h3 className="empty-title">No packages found</h3>
                    <p className="empty-desc">
                        No packages matched your search query. Try searching with different keywords.
                    </p>
                    <button
                        type="button"
                        id="resetSearchBtn"
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                            setQuery("");
                            searchInput.current?.focus();
                        }}
                    >
                        Clear Search Filter
                    </button>
                </div>
            </div>
        </section>
    );
};
