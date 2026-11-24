import type { ListingInfo } from "../types";
import { GitHubIcon, MoonIcon, SunIcon } from "./icons";
import { Actions, Brand, LogoBadge, NavbarBar, SourceLink, ThemeToggle, Title } from "./Navbar.styles";

interface NavbarProps {
    listing: ListingInfo;
    onToggleTheme: () => void;
}

export const Navbar = ({ listing, onToggleTheme }: NavbarProps) => {
    const infoLink = listing.infoLink;

    return (
        <NavbarBar>
            <Brand>
                <LogoBadge>
                    <BrandLogo />
                </LogoBadge>
                <Title>VPM Repository</Title>
            </Brand>

            <Actions>
                {infoLink?.url ? (
                    <SourceLink href={infoLink.url} target="_blank" rel="noopener noreferrer" title="View Source on GitHub">
                        <GitHubIcon />
                        <span>{infoLink.text || "GitHub"}</span>
                    </SourceLink>
                ) : null}

                <ThemeToggle
                    type="button"
                    id="themeToggleBtn"
                    aria-label="Toggle Theme"
                    title="Toggle Theme"
                    onClick={onToggleTheme}
                >
                    <SunIcon />
                    <MoonIcon />
                </ThemeToggle>
            </Actions>
        </NavbarBar>
    );
};

const BrandLogo = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);
