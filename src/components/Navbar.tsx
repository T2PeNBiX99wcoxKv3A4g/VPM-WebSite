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
    // A package drawn as an isometric cube with a "V" on its face: VPM, and a box
    // of packages rather than the generic parcel glyph used before.
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
        <path d="M12 2.9 19.6 7.2v9.6L12 21.1 4.4 16.8V7.2z" />
        <path d="M8.6 9.7 12 15.5l3.4-5.8" />
    </svg>
);
