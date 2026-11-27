import type { ListingInfo, PackageInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { CloseIcon, CopyIcon, ExternalLinkIcon, FileIcon, HelpCircleIcon, LinkIcon, PackageIcon, PlusCircleIcon, UserIcon } from "./icons";
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
import { useI18n } from "../i18n/Provider";

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
    const { t } = useI18n();
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
                            <Title id="packageInfoName">{pkg?.displayName || pkg?.name || t("details.packageName")}</Title>
                            <MetaRow>
                                <MetaId id="packageInfoId">{pkg?.name ?? "com.package.id"}</MetaId>
                                <VersionBadge id="packageInfoVersion">
                                    {pkg?.version ? `v${pkg.version}` : ""}
                                </VersionBadge>
                            </MetaRow>
                        </div>
                    </TitleWrap>
                    <CloseButton
                        type="button"
                        id="packageInfoModalClose"
                        aria-label={t("details.close")}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </CloseButton>
                </Header>

                <Body>
                    <Section>
                        <SectionTitle>{t("details.description")}</SectionTitle>
                        <SectionText id="packageInfoDescription">
                            {pkg?.description || t("details.noDescription")}
                        </SectionText>
                    </Section>

                    <Grid2>
                        <Section>
                            <SectionTitle>{t("details.author")}</SectionTitle>
                            <InlineInfo>
                                <UserIcon />
                                {pkg?.author?.url ? (
                                    <AccentLink
                                        href={pkg.author.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="packageInfoAuthor"
                                    >
                                        {pkg.author.name || t("details.unknownAuthor")}
                                        <ExternalLinkIcon />
                                    </AccentLink>
                                ) : (
                                    <PlainValue id="packageInfoAuthor">
                                        {pkg?.author?.name || t("details.unknownAuthor")}
                                    </PlainValue>
                                )}
                            </InlineInfo>
                        </Section>

                        {hasLicense ? (
                            <Section id="packageInfoLicenseContainer">
                                <SectionTitle>{t("details.license")}</SectionTitle>
                                <InlineInfo>
                                    <FileIcon />
                                    {pkg?.licensesUrl ? (
                                        <AccentLink
                                            href={pkg.licensesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            id="packageInfoLicense"
                                        >
                                            {pkg.license || t("details.license")}
                                            <ExternalLinkIcon />
                                        </AccentLink>
                                    ) : (
                                        <PlainValue id="packageInfoLicense">
                                            {pkg?.license || t("details.license")}
                                        </PlainValue>
                                    )}
                                </InlineInfo>
                            </Section>
                        ) : null}
                    </Grid2>

                    {dependencies.length > 0 ? (
                        <Section id="packageInfoDependenciesContainer">
                            <SectionTitle>{t("details.dependencies")}</SectionTitle>
                            <DepList id="packageInfoDependencies">
                                {dependencies.map(([name, version]) => (
                                    <li key={name}>{`${name} @ v${version}`}</li>
                                ))}
                            </DepList>
                        </Section>
                    ) : null}

                    {keywords.length > 0 ? (
                        <Section id="packageInfoKeywordsContainer">
                            <SectionTitle>{t("details.keywords")}</SectionTitle>
                            <TagsCloud id="packageInfoKeywords">
                                {keywords.map(keyword => (
                                    <Badge key={keyword}>{keyword}</Badge>
                                ))}
                            </TagsCloud>
                        </Section>
                    ) : null}

                    <Section>
                        <SectionHeaderFlex>
                            <SectionTitle>{t("details.listingUrl")}</SectionTitle>
                            <LinkButton
                                type="button"
                                id="packageInfoListingHelp"
                                title={t("hero.help")}
                                onClick={onShowHelp}
                            >
                                <HelpCircleIcon />
                                <span>{t("details.guide")}</span>
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
                                    aria-label={t("hero.listingUrlAria")}
                                />
                            </UrlInputWrapper>
                            <CopyButton
                                id="packageInfoVccUrlFieldCopy"
                                value={listing.url}
                                message={t("toast.copiedUrl")}
                                onCopy={onCopy}
                                icon={<CopyIcon />}
                                label={t("copy.label")}
                            />
                        </UrlBox>
                    </Section>

                    <FooterActions>
                        <Button type="button" $variant="primary" onClick={onAddToVcc}>
                            <PlusCircleIcon width={16} height={16} />
                            <span>{t("details.addRepo")}</span>
                        </Button>
                    </FooterActions>
                </Body>
            </Dialog>
        </Overlay>
    );
};
