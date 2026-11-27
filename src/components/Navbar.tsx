import type { ListingInfo } from "../types";
import { MoonIcon, SunIcon } from "./icons";
import {
    Actions,
    Brand,
    LanguageLabel,
    LanguageSelect,
    LogoBadge,
    NavbarBar,
    SourceLink,
    ThemeToggle,
    Title,
    VisuallyHidden,
} from "./Navbar.styles";
import { LanguageIcon, GitHubIcon } from "./icons";
import { useI18n } from "../i18n/Provider";
import { languages } from "../i18n";

interface NavbarProps {
    listing: ListingInfo;
    onToggleTheme: () => void;
}

export const Navbar = ({ listing, onToggleTheme }: NavbarProps) => {
    const { t, language, setLanguage } = useI18n();
    const infoLink = listing.infoLink;

    return (
        <NavbarBar>
            <Brand>
                <LogoBadge>
                    <img src="./vrchat-icon.png" alt="" width={22} height={22} />
                </LogoBadge>
                <Title>{t("nav.brand")}</Title>
            </Brand>

            <Actions>
                <LanguageLabel>
                    <LanguageIcon aria-hidden="true" />
                    <VisuallyHidden>{t("nav.language")}</VisuallyHidden>
                    <LanguageSelect
                        id="languageSelect"
                        title={t("nav.language")}
                        value={language}
                        onChange={event => setLanguage(event.target.value)}
                    >
                        {languages.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.label}
                            </option>
                        ))}
                    </LanguageSelect>
                </LanguageLabel>

                {infoLink?.url ? (
                    <SourceLink href={infoLink.url} target="_blank" rel="noopener noreferrer" title={t("nav.source")}>
                        <GitHubIcon />
                        <span>{infoLink.text || t("nav.sourceFallback")}</span>
                    </SourceLink>
                ) : null}

                <ThemeToggle
                    type="button"
                    id="themeToggleBtn"
                    aria-label={t("nav.theme")}
                    title={t("nav.theme")}
                    onClick={onToggleTheme}
                >
                    <SunIcon className="sun-icon" />
                    <MoonIcon className="moon-icon" />
                </ThemeToggle>
            </Actions>
        </NavbarBar>
    );
};
