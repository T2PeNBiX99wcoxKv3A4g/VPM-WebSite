import type {ListingInfo} from "../types";
import {CopyButton} from "./CopyButton";
import {BookIcon, CloseIcon, CopyIcon, InfoCircleIcon, PlusCircleIcon} from "./icons";

interface HelpDialogProps {
    open: boolean;
    listing: ListingInfo;
    onClose: () => void;
    onAddToVcc: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const HelpDialog = ({open, listing, onClose, onAddToVcc, onCopy}: HelpDialogProps) => (
    <div
        className={`modal-overlay${open ? "" : " is-hidden"}`}
        id="addListingToVccHelp"
        hidden={!open}
        onClick={event => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        }}
    >
        <div className="modal-dialog-content">
            <div className="modal-header">
                <div className="modal-title-wrap">
                    <div className="modal-icon-badge">
                        <BookIcon/>
                    </div>
                    <div>
                        <h3 className="modal-title">How to Add Listing to VCC / ALCOM</h3>
                        <p className="modal-subtitle">Step-by-step installation instructions</p>
                    </div>
                </div>
                <button
                    type="button"
                    id="addListingToVccHelpClose"
                    className="modal-close-btn"
                    aria-label="Close dialog"
                    onClick={onClose}
                >
                    <CloseIcon/>
                </button>
            </div>

            <div className="modal-body">
                <div className="guide-method-card">
                    <h4 className="guide-method-title">
                        <span className="guide-method-badge">Method 1</span>
                        One-Click Automatic Add (Recommended)
                    </h4>
                    <p className="guide-method-desc">
                        Click the button below to directly open your VCC or ALCOM client and import this
                        repository instantly:
                    </p>
                    <div className="guide-quick-action">
                        <button
                            type="button"
                            className="btn btn-primary btn-glow modalAddRepoTrigger"
                            onClick={onAddToVcc}
                        >
                            <PlusCircleIcon size={16}/>
                            <span>Add to VCC / ALCOM Now</span>
                        </button>
                    </div>
                </div>

                <div className="guide-method-card">
                    <h4 className="guide-method-title">
                        <span className="guide-method-badge">Method 2</span>
                        Manual Repository Installation
                    </h4>
                    <ol className="guide-steps">
                        <li>
                            <span className="step-num">1</span>
                            <span>
                                Open{" "}
                                <strong>
                                    <a
                                        href="https://vrchat.com/home/download"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        VCC (VRChat Creator Companion)
                                    </a>
                                </strong>{" "}
                                or{" "}
                                <strong>
                                    <a
                                        href="https://vrc-get.anatawa12.com/alcom/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ALCOM
                                    </a>
                                </strong>
                                .
                            </span>
                        </li>
                        <li>
                            <span className="step-num">2</span>
                            <span>
                                Navigate to <strong>Settings</strong> &gt; <strong>Packages</strong> tab.
                            </span>
                        </li>
                        <li>
                            <span className="step-num">3</span>
                            <span>
                                Click <strong>Add Repository</strong> in the top right.
                            </span>
                        </li>
                        <li>
                            <span className="step-num">4</span>
                            <span>
                                Paste the listing URL shown below and click <strong>Add</strong>:
                            </span>
                        </li>
                    </ol>

                    <div className="modal-url-box">
                        <div className="url-input-wrapper">
                            <input
                                type="text"
                                id="vccListingInfoUrlField"
                                className="vccUrlField custom-url-input"
                                readOnly
                                value={listing.url}
                                aria-label="Listing URL"
                            />
                        </div>
                        <CopyButton
                            id="vccListingInfoUrlFieldCopy"
                            value={listing.url}
                            message="Repository URL copied!"
                            onCopy={onCopy}
                            icon={<CopyIcon/>}
                            label="Copy"
                        />
                    </div>

                    <ol className="guide-steps" start={5}>
                        <li>
                            <span className="step-num">5</span>
                            <span>
                                Confirm the repository information and click <strong>"I Understand"</strong>.
                            </span>
                        </li>
                        <li>
                            <span className="step-num">6</span>
                            <span>Open your project to manage and install packages freely!</span>
                        </li>
                    </ol>
                </div>

                <div className="guide-footer-note">
                    <InfoCircleIcon/>
                    <span>
                        For more information, see official{" "}
                        <a href="https://vcc.docs.vrchat.com" target="_blank" rel="noopener noreferrer">
                            VCC Documentation
                        </a>
                        .
                    </span>
                </div>
            </div>
        </div>
    </div>
);
