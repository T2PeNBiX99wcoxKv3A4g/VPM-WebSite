import type { ListingInfo, PackageInfo } from "../types";
import { CopyButton } from "./CopyButton";
import {
    CloseIcon,
    CopyIcon,
    ExternalLinkIcon,
    FileIcon,
    HelpCircleIcon,
    LinkIcon,
    PackageIcon,
    PlusCircleIcon,
    UserIcon,
} from "./icons";
import {
    AccentLink,
    Body,
    CloseButton,
    DepList,
    Dialog,
    FooterActions,
    Grid2,
    Header,
    IconBadge,
    InlineInfo,
    MetaId,
    MetaRow,
    Overlay,
    PlainValue,
    Section,
    SectionHeaderFlex,
    SectionText,
    SectionTitle,
    TagsCloud,
    Title,
    TitleWrap,
    UrlBox,
} from "./modal.styles";
import { Badge, VersionBadge } from "./PackageCard.styles";
import { UrlInput, UrlInputWrapper } from "./Hero.styles";
import { Button, LinkButton } from "../styles/buttons";

interface PackageInfoDialogProps {
    pkg: PackageInfo | null;
    listing: ListingInfo;
    onClose: () => void;
    onAddToVcc: () => void;
    onShowHelp: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const PackageInfoDialog = ({
    pkg,
    listing,
    onClose,
    onAddToVcc,
    onShowHelp,
    onCopy,
}: PackageInfoDialogProps) => {
    const open = pkg !== null;
    const dependencies = Object.entries(pkg?.dependencies ?? {});
    const keywords = pkg?.keywords ?? [];
    const hasLicense = Boolean(pkg?.license || pkg?.licensesUrl);

    return (
        <Overlay
            id="packageInfoModal"
            hidden={!open}
            onClick={event => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <Dialog>
                <Header>
                    <TitleWrap>
                        <IconBadge>
                            <PackageIcon />
                        </IconBadge>
                        <div>
                            <Title id="packageInfoName">{pkg?.displayName || pkg?.name || "Package Name"}</Title>
                            <MetaRow>
                                <MetaId id="packageInfoId">{pkg?.name ?? "com.package.id"}</MetaId>
                                <VersionBadge id="packageInfoVersion">
                                    {pkg?.version ? `v${pkg.version}` : ""}
                                </VersionBadge>
                            </MetaRow>
                        </div>
                    </TitleWrap>
                    <CloseButton type="button" id="packageInfoModalClose" aria-label="Close dialog" onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                </Header>

                <Body>
                    <Section>
                        <SectionTitle>Description</SectionTitle>
                        <SectionText id="packageInfoDescription">
                            {pkg?.description || "No description provided."}
                        </SectionText>
                    </Section>

                    <Grid2>
                        <Section>
                            <SectionTitle>Author</SectionTitle>
                            <InlineInfo>
                                <UserIcon />
                                {pkg?.author?.url ? (
                                    <AccentLink
                                        href={pkg.author.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="packageInfoAuthor"
                                    >
                                        {pkg.author.name || "Unknown Author"}
                                        <ExternalLinkIcon />
                                    </AccentLink>
                                ) : (
                                    <PlainValue id="packageInfoAuthor">{pkg?.author?.name || "Unknown Author"}</PlainValue>
                                )}
                            </InlineInfo>
                        </Section>

                        {hasLicense ? (
                            <Section id="packageInfoLicenseContainer">
                                <SectionTitle>License</SectionTitle>
                                <InlineInfo>
                                    <FileIcon />
                                    {pkg?.licensesUrl ? (
                                        <AccentLink
                                            href={pkg.licensesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            id="packageInfoLicense"
                                        >
                                            {pkg.license || "License"}
                                            <ExternalLinkIcon />
                                        </AccentLink>
                                    ) : (
                                        <PlainValue id="packageInfoLicense">{pkg?.license || "License"}</PlainValue>
                                    )}
                                </InlineInfo>
                            </Section>
                        ) : null}
                    </Grid2>

                    {dependencies.length > 0 ? (
                        <Section id="packageInfoDependenciesContainer">
                            <SectionTitle>Dependencies</SectionTitle>
                            <DepList id="packageInfoDependencies">
                                {dependencies.map(([name, version]) => (
                                    <li key={name}>{`${name} @ v${version}`}</li>
                                ))}
                            </DepList>
                        </Section>
                    ) : null}

                    {keywords.length > 0 ? (
                        <Section id="packageInfoKeywordsContainer">
                            <SectionTitle>Keywords</SectionTitle>
                            <TagsCloud id="packageInfoKeywords">
                                {keywords.map(keyword => (
                                    <Badge key={keyword}>{keyword}</Badge>
                                ))}
                            </TagsCloud>
                        </Section>
                    ) : null}

                    <Section>
                        <SectionHeaderFlex>
                            <SectionTitle>Repository Listing URL</SectionTitle>
                            <LinkButton
                                type="button"
                                id="packageInfoListingHelp"
                                title="How to add listing to VCC"
                                onClick={onShowHelp}
                            >
                                <HelpCircleIcon />
                                <span>Installation Guide</span>
                            </LinkButton>
                        </SectionHeaderFlex>
                        <UrlBox>
                            <UrlInputWrapper>
                                <LinkIcon />
                                <UrlInput
                                    type="text"
                                    id="packageInfoVccUrlField"
                                    readOnly
                                    value={listing.url}
                                    aria-label="Listing URL"
                                />
                            </UrlInputWrapper>
                            <CopyButton
                                id="packageInfoVccUrlFieldCopy"
                                value={listing.url}
                                message="Repository URL copied!"
                                onCopy={onCopy}
                                icon={<CopyIcon />}
                                label="Copy"
                            />
                        </UrlBox>
                    </Section>

                    <FooterActions>
                        <Button type="button" $variant="primary" onClick={onAddToVcc}>
                            <PlusCircleIcon size={16} />
                            <span>Add Repository to VCC</span>
                        </Button>
                    </FooterActions>
                </Body>
            </Dialog>
        </Overlay>
    );
};
