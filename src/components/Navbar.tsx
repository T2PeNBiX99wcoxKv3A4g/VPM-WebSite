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
                    <img src="./vrchat-icon.png" alt="" width={22} height={22} />
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
                    <SunIcon className="sun-icon" />
                    <MoonIcon className="moon-icon" />
                </ThemeToggle>
            </Actions>
        </NavbarBar>
    );
};
