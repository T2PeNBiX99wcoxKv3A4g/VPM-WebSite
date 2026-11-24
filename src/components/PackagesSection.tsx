import { useEffect, useMemo, useRef, useState } from "react";
import type { PackageInfo, PackageMap } from "../types";
import { PackageCard } from "./PackageCard";
import { ClearIcon, EmptySearchIcon, SearchIcon } from "./icons";
import {
    ClearButton,
    CountBadge,
    EmptyDesc,
    EmptyIcon,
    EmptyState,
    EmptyTitle,
    Grid,
    KeyboardTip,
    SearchBox,
    SearchInput,
    Section,
    SectionHeader,
    SectionTitle,
    TitleWrap,
    Wrapper,
} from "./PackagesSection.styles";
import { Button } from "../styles/buttons";

interface PackagesSectionProps {
    packages: PackageMap;
    onAddToVcc: () => void;
    onShowInfo: (pkg: PackageInfo) => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

const matchesQuery = (pkg: PackageInfo, term: string) => {
    const haystack = [pkg.displayName, pkg.name, pkg.description, pkg.type]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return haystack.includes(term);
};

export const PackagesSection = ({ packages, onAddToVcc, onShowInfo, onCopy }: PackagesSectionProps) => {
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
        <Section>
            <SectionHeader>
                <TitleWrap>
                    <SectionTitle>Packages</SectionTitle>
                    <CountBadge id="packageCountBadge">{countLabel}</CountBadge>
                </TitleWrap>
                <SearchBox>
                    <SearchIcon />
                    <SearchInput
                        ref={searchInput}
                        type="text"
                        id="searchInput"
                        placeholder="Search packages by name, ID or description..."
                        autoComplete="off"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    <ClearButton
                        type="button"
                        id="searchClearBtn"
                        aria-label="Clear search"
                        title="Clear search"
                        hidden={!query}
                        onClick={() => {
                            setQuery("");
                            searchInput.current?.focus();
                        }}
                    >
                        <ClearIcon />
                    </ClearButton>
                    <KeyboardTip id="searchKbdTip" style={query ? { display: "none" } : undefined}>
                        /
                    </KeyboardTip>
                </SearchBox>
            </SectionHeader>

            <Wrapper>
                <Grid id="packageGrid">
                    {visiblePackages.map(pkg => (
                        <PackageCard
                            key={pkg.name}
                            pkg={pkg}
                            onAddToVcc={onAddToVcc}
                            onShowInfo={onShowInfo}
                            onCopy={onCopy}
                        />
                    ))}
                </Grid>

                <EmptyState id="noResultsState" hidden={!(visible === 0 && total > 0)}>
                    <EmptyIcon>
                        <EmptySearchIcon />
                    </EmptyIcon>
                    <EmptyTitle>No packages found</EmptyTitle>
                    <EmptyDesc>
                        No packages matched your search query. Try searching with different keywords.
                    </EmptyDesc>
                    <Button
                        type="button"
                        $variant="secondary"
                        $small
                        id="resetSearchBtn"
                        onClick={() => {
                            setQuery("");
                            searchInput.current?.focus();
                        }}
                    >
                        Clear Search Filter
                    </Button>
                </EmptyState>
            </Wrapper>
        </Section>
    );
};
