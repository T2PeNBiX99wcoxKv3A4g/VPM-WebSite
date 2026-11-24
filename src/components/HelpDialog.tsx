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

interface HelpDialogProps {
    open: boolean;
    listing: ListingInfo;
    onClose: () => void;
    onAddToVcc: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const HelpDialog = ({ open, listing, onClose, onAddToVcc, onCopy }: HelpDialogProps) => (
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
                        <Title>How to Add Listing to VCC / ALCOM</Title>
                        <Subtitle>Step-by-step installation instructions</Subtitle>
                    </div>
                </TitleWrap>
                <CloseButton type="button" id="addListingToVccHelpClose" aria-label="Close dialog" onClick={onClose}>
                    <CloseIcon />
                </CloseButton>
            </Header>

            <Body>
                <GuideCard>
                    <GuideTitle>
                        <GuideBadge>Method 1</GuideBadge>
                        One-Click Automatic Add (Recommended)
                    </GuideTitle>
                    <GuideDesc>
                        Click the button below to directly open your VCC or ALCOM client and import this
                        repository instantly:
                    </GuideDesc>
                    <GuideQuickAction>
                        <Button type="button" $variant="primary" $glow onClick={onAddToVcc}>
                            <PlusCircleIcon size={16} />
                            <span>Add to VCC / ALCOM Now</span>
                        </Button>
                    </GuideQuickAction>
                </GuideCard>

                <GuideCard>
                    <GuideTitle>
                        <GuideBadge>Method 2</GuideBadge>
                        Manual Repository Installation
                    </GuideTitle>
                    <GuideSteps>
                        <li>
                            <StepNumber>1</StepNumber>
                            <span>
                                Open{" "}
                                <strong>
                                    <a href="https://vrchat.com/home/download" target="_blank" rel="noopener noreferrer">
                                        VCC (VRChat Creator Companion)
                                    </a>
                                </strong>{" "}
                                or{" "}
                                <strong>
                                    <a href="https://vrc-get.anatawa12.com/alcom/" target="_blank" rel="noopener noreferrer">
                                        ALCOM
                                    </a>
                                </strong>
                                .
                            </span>
                        </li>
                        <li>
                            <StepNumber>2</StepNumber>
                            <span>
                                Navigate to <strong>Settings</strong> &gt; <strong>Packages</strong> tab.
                            </span>
                        </li>
                        <li>
                            <StepNumber>3</StepNumber>
                            <span>
                                Click <strong>Add Repository</strong> in the top right.
                            </span>
                        </li>
                        <li>
                            <StepNumber>4</StepNumber>
                            <span>
                                Paste the listing URL shown below and click <strong>Add</strong>:
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
                                aria-label="Listing URL"
                            />
                        </UrlInputWrapper>
                        <CopyButton
                            id="vccListingInfoUrlFieldCopy"
                            value={listing.url}
                            message="Repository URL copied!"
                            onCopy={onCopy}
                            icon={<CopyIcon />}
                            label="Copy"
                        />
                    </UrlBox>

                    <GuideSteps start={5}>
                        <li>
                            <StepNumber>5</StepNumber>
                            <span>
                                Confirm the repository information and click <strong>"I Understand"</strong>.
                            </span>
                        </li>
                        <li>
                            <StepNumber>6</StepNumber>
                            <span>Open your project to manage and install packages freely!</span>
                        </li>
                    </GuideSteps>
                </GuideCard>

                <GuideFooterNote>
                    <InfoCircleIcon />
                    <span>
                        For more information, see official{" "}
                        <a href="https://vcc.docs.vrchat.com" target="_blank" rel="noopener noreferrer">
                            VCC Documentation
                        </a>
                        .
                    </span>
                </GuideFooterNote>
            </Body>
        </Dialog>
    </Overlay>
);
