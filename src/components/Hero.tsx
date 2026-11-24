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

interface HeroProps {
    listing: ListingInfo;
    onAddToVcc: () => void;
    onShowHelp: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const Hero = ({ listing, onAddToVcc, onShowHelp, onCopy }: HeroProps) => {
    const author = listing.author;

    return (
        <HeroSection>
            {listing.bannerImage && listing.bannerImageUrl ? (
                <BannerContainer>
                    <BannerImage $image={listing.bannerImageUrl} />
                </BannerContainer>
            ) : null}

            <HeroContent>
                <RepoBadge>VRChat Package Manager Listing</RepoBadge>
                <HeroTitle>{listing.name}</HeroTitle>
                {listing.description ? <HeroDescription>{listing.description}</HeroDescription> : null}

                <HeroMeta>
                    <AuthorTag id="publishedByText">
                        <UserIcon />
                        <span>Published by</span>
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
                    <ActionCardLabel>Repository URL</ActionCardLabel>
                    <ActionCardHint>Add this URL to VCC or ALCOM</ActionCardHint>
                </ActionCardHeader>
                <ActionCardBody>
                    <UrlInputWrapper>
                        <LinkIcon />
                        <UrlInput
                            type="text"
                            id="vccUrlField"
                            readOnly
                            value={listing.url}
                            aria-label="Listing URL"
                        />
                    </UrlInputWrapper>
                    <ActionButtons>
                        <Button type="button" $variant="primary" $glow id="vccAddRepoButton" onClick={onAddToVcc}>
                            <PlusCircleIcon />
                            <span>Add to VCC</span>
                        </Button>

                        <CopyButton
                            id="vccUrlFieldCopy"
                            value={listing.url}
                            message="Repository URL copied!"
                            onCopy={onCopy}
                            icon={<CopyIcon />}
                            label="Copy URL"
                        />

                        <Button
                            type="button"
                            $variant="icon"
                            id="urlBarHelp"
                            aria-label="Installation Guide"
                            title="How to add to VCC / ALCOM"
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
