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
    SearchBox,
    SearchInput,
    Section,
    SectionHeader,
    SectionTitle,
    TitleWrap,
    Wrapper,
} from "./PackagesSection.styles";
import { Button } from "../styles/buttons";
import { useI18n } from "../i18n/Provider";

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
    const { t } = useI18n();
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
            ? t("packages.count.zero")
            : visible === total
                ? t(total === 1 ? "packages.count.one" : "packages.count.many", { count: total })
                : t("packages.count.filtered", { visible, total });

    return (
        <Section>
            <SectionHeader>
                <TitleWrap>
                    <SectionTitle>{t("packages.title")}</SectionTitle>
                    <CountBadge id="packageCountBadge">{countLabel}</CountBadge>
                </TitleWrap>
                <SearchBox>
                    <SearchIcon />
                    <SearchInput
                        ref={searchInput}
                        type="text"
                        id="searchInput"
                        placeholder={t("packages.search")}
                        autoComplete="off"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    <ClearButton
                        type="button"
                        id="searchClearBtn"
                        aria-label={t("packages.clearSearch")}
                        title={t("packages.clearSearch")}
                        hidden={!query}
                        onClick={() => {
                            setQuery("");
                            searchInput.current?.focus();
                        }}
                    >
                        <ClearIcon />
                    </ClearButton>
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
                    <EmptyTitle>{t("packages.emptyTitle")}</EmptyTitle>
                    <EmptyDesc>{t("packages.emptyDesc")}</EmptyDesc>
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
                        {t("packages.emptyAction")}
                    </Button>
                </EmptyState>
            </Wrapper>
        </Section>
    );
};
