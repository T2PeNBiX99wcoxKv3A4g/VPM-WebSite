import type { ListingInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { BookIcon, CloseIcon, CopyIcon, InfoCircleIcon, LinkIcon, PlusCircleIcon } from "./icons";
import {
    Body,
    CloseButton,
    Dialog,
    GuideBadge,
    GuideCard,
    GuideDesc,
    GuideFooterNote,
    GuideQuickAction,
    GuideSteps,
    GuideTitle,
    Header,
    IconBadge,
    Overlay,
    StepNumber,
    Subtitle,
    Title,
    TitleWrap,
    UrlBox,
} from "./modal.styles";
import { UrlInput, UrlInputWrapper } from "./Hero.styles";
import { Button } from "../styles/buttons";
import { useI18n } from "../i18n/Provider";
import { RichText } from "../i18n/RichText";

interface HelpDialogProps {
    open: boolean;
    listing: ListingInfo;
    onClose: () => void;
    onAddToVcc: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const HelpDialog = ({ open, listing, onClose, onAddToVcc, onCopy }: HelpDialogProps) => {
    const { t } = useI18n();

    return (
        <Overlay
            $stacked
            id="addListingToVccHelp"
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
                            <BookIcon />
                        </IconBadge>
                        <div>
                            <Title>{t("guide.title")}</Title>
                            <Subtitle>{t("guide.subtitle")}</Subtitle>
                        </div>
                    </TitleWrap>
                    <CloseButton
                        type="button"
                        id="addListingToVccHelpClose"
                        aria-label={t("details.close")}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </CloseButton>
                </Header>

                <Body>
                    <GuideCard>
                        <GuideTitle>
                            <GuideBadge>{t("guide.method1")}</GuideBadge>
                            {t("guide.method1Title")}
                        </GuideTitle>
                        <GuideDesc>{t("guide.method1Desc")}</GuideDesc>
                        <GuideQuickAction>
                            <Button type="button" $variant="primary" $glow onClick={onAddToVcc}>
                                <PlusCircleIcon width={16} height={16} />
                                <span>{t("guide.addNow")}</span>
                            </Button>
                        </GuideQuickAction>
                    </GuideCard>

                    <GuideCard>
                        <GuideTitle>
                            <GuideBadge>{t("guide.method2")}</GuideBadge>
                            {t("guide.method2Title")}
                        </GuideTitle>
                        <GuideSteps>
                            <li>
                                <StepNumber>1</StepNumber>
                                <span>
                                    <RichText
                                        message="guide.step1"
                                        slots={{
                                            vcc: (
                                                <strong>
                                                    <a
                                                        href="https://vrchat.com/home/download"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {t("guide.vccLong")}
                                                    </a>
                                                </strong>
                                            ),
                                            alcom: (
                                                <strong>
                                                    <a
                                                        href="https://vrc-get.anatawa12.com/alcom/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {t("footer.alcom")}
                                                    </a>
                                                </strong>
                                            ),
                                        }}
                                    />
                                </span>
                            </li>
                            <li>
                                <StepNumber>2</StepNumber>
                                <span>
                                    <RichText
                                        message="guide.step2"
                                        slots={{
                                            settings: <strong>{t("guide.settings")}</strong>,
                                            packagesTab: <strong>{t("guide.packagesTab")}</strong>,
                                        }}
                                    />
                                </span>
                            </li>
                            <li>
                                <StepNumber>3</StepNumber>
                                <span>
                                    <RichText
                                        message="guide.step3"
                                        slots={{ addRepository: <strong>{t("guide.addRepository")}</strong> }}
                                    />
                                </span>
                            </li>
                            <li>
                                <StepNumber>4</StepNumber>
                                <span>
                                    <RichText message="guide.step4" slots={{ add: <strong>{t("guide.add")}</strong> }} />
                                </span>
                            </li>
                        </GuideSteps>

                        <UrlBox>
                            <UrlInputWrapper>
                                <LinkIcon />
                                <UrlInput
                                    type="text"
                                    id="vccListingInfoUrlField"
                                    readOnly
                                    value={listing.url}
                                    aria-label={t("hero.listingUrlAria")}
                                />
                            </UrlInputWrapper>
                            <CopyButton
                                id="vccListingInfoUrlFieldCopy"
                                value={listing.url}
                                message={t("toast.copiedUrl")}
                                onCopy={onCopy}
                                icon={<CopyIcon />}
                                label={t("copy.label")}
                            />
                        </UrlBox>

                        <GuideSteps start={5}>
                            <li>
                                <StepNumber>5</StepNumber>
                                <span>
                                    <RichText
                                        message="guide.step5"
                                        slots={{ understand: <strong>{t("guide.iUnderstand")}</strong> }}
                                    />
                                </span>
                            </li>
                            <li>
                                <StepNumber>6</StepNumber>
                                <span>{t("guide.step6")}</span>
                            </li>
                        </GuideSteps>
                    </GuideCard>

                    <GuideFooterNote>
                        <InfoCircleIcon />
                        <span>
                            <RichText
                                message="guide.footer"
                                slots={{
                                    docs: (
                                        <a
                                            href="https://vcc.docs.vrchat.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t("guide.vccDocs")}
                                        </a>
                                    ),
                                }}
                            />
                        </span>
                    </GuideFooterNote>
                </Body>
            </Dialog>
        </Overlay>
    );
};
