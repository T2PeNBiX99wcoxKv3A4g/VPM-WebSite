import type { ListingInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { CopyIcon, HelpCircleIcon, LinkIcon, PlusCircleIcon, UserIcon } from "./icons";
import {
    ActionCard,
    ActionCardBody,
    ActionCardHeader,
    ActionCardHint,
    ActionCardLabel,
    AuthorName,
    AuthorNameText,
    AuthorTag,
    BannerContainer,
    BannerImage,
    HeroContent,
    HeroDescription,
    HeroMeta,
    HeroSection,
    HeroTitle,
    RepoBadge,
    UrlInput,
    UrlInputWrapper,
} from "./Hero.styles";
import { ActionButtons, Button } from "../styles/buttons";
import { useI18n } from "../i18n/Provider";

interface HeroProps {
    listing: ListingInfo;
    onAddToVcc: () => void;
    onShowHelp: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const Hero = ({ listing, onAddToVcc, onShowHelp, onCopy }: HeroProps) => {
    const { t } = useI18n();
    const author = listing.author;

    return (
        <HeroSection>
            {listing.bannerImage && listing.bannerImageUrl ? (
                <BannerContainer>
                    <BannerImage $image={listing.bannerImageUrl} />
                </BannerContainer>
            ) : null}

            <HeroContent>
                <RepoBadge>{t("hero.badge")}</RepoBadge>
                <HeroTitle>{listing.name}</HeroTitle>
                {listing.description ? <HeroDescription>{listing.description}</HeroDescription> : null}

                <HeroMeta>
                    <AuthorTag id="publishedByText">
                        <UserIcon />
                        <span>{t("hero.publishedBy")}</span>
                        {author?.url ? (
                            <AuthorName
                                href={author.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={author.email}
                            >
                                {author.name}
                            </AuthorName>
                        ) : (
                            <AuthorNameText>{author?.name}</AuthorNameText>
                        )}
                    </AuthorTag>
                </HeroMeta>
            </HeroContent>

            <ActionCard>
                <ActionCardHeader>
                    <ActionCardLabel>{t("hero.repoUrl")}</ActionCardLabel>
                    <ActionCardHint>{t("hero.repoHint")}</ActionCardHint>
                </ActionCardHeader>
                <ActionCardBody>
                    <UrlInputWrapper>
                        <LinkIcon />
                        <UrlInput
                            type="text"
                            id="vccUrlField"
                            readOnly
                            value={listing.url}
                            aria-label={t("hero.listingUrlAria")}
                        />
                    </UrlInputWrapper>
                    <ActionButtons>
                        <Button type="button" $variant="primary" $glow id="vccAddRepoButton" onClick={onAddToVcc}>
                            <PlusCircleIcon />
                            <span>{t("hero.addToVcc")}</span>
                        </Button>

                        <CopyButton
                            id="vccUrlFieldCopy"
                            value={listing.url}
                            message={t("toast.copiedUrl")}
                            onCopy={onCopy}
                            icon={<CopyIcon />}
                            label={t("hero.copyUrl")}
                        />

                        <Button
                            type="button"
                            $variant="icon"
                            id="urlBarHelp"
                            aria-label={t("hero.helpAria")}
                            title={t("hero.help")}
                            onClick={onShowHelp}
                        >
                            <HelpCircleIcon />
                        </Button>
                    </ActionButtons>
                </ActionCardBody>
            </ActionCard>
        </HeroSection>
    );
};
