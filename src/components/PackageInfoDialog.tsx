import type {ListingInfo, PackageInfo} from "../types";
import {CopyButton} from "./CopyButton";
import {CloseIcon, CopyIcon, FileIcon, HelpCircleIcon, PackageIcon, PlusCircleIcon, UserIcon} from "./icons";

interface PackageInfoDialogProps {
    pkg: PackageInfo | null;
    listing: ListingInfo;
    onClose: () => void;
    onAddToVcc: () => void;
    onShowHelp: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const PackageInfoDialog = ({pkg, listing, onClose, onAddToVcc, onShowHelp, onCopy}: PackageInfoDialogProps) => {
    const open = pkg !== null;
    const dependencies = Object.entries(pkg?.dependencies ?? {});
    const keywords = pkg?.keywords ?? [];
    const hasLicense = Boolean(pkg?.license || pkg?.licensesUrl);

    return (
        <div
            className={`modal-overlay${open ? "" : " is-hidden"}`}
            id="packageInfoModal"
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
                            <PackageIcon/>
                        </div>
                        <div>
                            <h3 className="modal-title" id="packageInfoName">
                                {pkg?.displayName || pkg?.name || "Package Name"}
                            </h3>
                            <div className="modal-meta-row">
                                <span className="modal-pkg-id" id="packageInfoId">
                                    {pkg?.name ?? "com.package.id"}
                                </span>
                                <span className="badge badge-version" id="packageInfoVersion">
                                    {pkg?.version ? `v${pkg.version}` : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        id="packageInfoModalClose"
                        className="modal-close-btn"
                        aria-label="Close dialog"
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h5 className="modal-section-title">Description</h5>
                        <p className="modal-section-text" id="packageInfoDescription">
                            {pkg?.description || "No description provided."}
                        </p>
                    </div>

                    <div className="modal-grid-2">
                        <div className="modal-section">
                            <h5 className="modal-section-title">Author</h5>
                            <div className="author-link-wrap">
                                <UserIcon/>
                                <a
                                    href={pkg?.author?.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="packageInfoAuthor"
                                    className="accent-link"
                                >
                                    {pkg?.author?.name || "Unknown Author"}
                                </a>
                            </div>
                        </div>

                        {hasLicense ? (
                            <div className="modal-section" id="packageInfoLicenseContainer">
                                <h5 className="modal-section-title">License</h5>
                                <div className="license-wrap">
                                    <FileIcon/>
                                    <a
                                        href={pkg?.licensesUrl || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="packageInfoLicense"
                                        className="accent-link"
                                    >
                                        {pkg?.license || "License"}
                                    </a>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {dependencies.length > 0 ? (
                        <div className="modal-section" id="packageInfoDependenciesContainer">
                            <h5 className="modal-section-title">Dependencies</h5>
                            <ul className="dep-list" id="packageInfoDependencies">
                                {dependencies.map(([name, version]) => (
                                    <li key={name}>{`${name} @ v${version}`}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {keywords.length > 0 ? (
                        <div className="modal-section" id="packageInfoKeywordsContainer">
                            <h5 className="modal-section-title">Keywords</h5>
                            <div className="tags-cloud" id="packageInfoKeywords">
                                {keywords.map(keyword => (
                                    <span className="badge" key={keyword}>
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    <div className="modal-section">
                        <div className="modal-section-header-flex">
                            <h5 className="modal-section-title">Repository Listing URL</h5>
                            <button
                                type="button"
                                id="packageInfoListingHelp"
                                className="link-btn"
                                title="How to add listing to VCC"
                                onClick={onShowHelp}
                            >
                                <HelpCircleIcon/>
                                <span>Installation Guide</span>
                            </button>
                        </div>
                        <div className="modal-url-box">
                            <div className="url-input-wrapper">
                                <input
                                    type="text"
                                    id="packageInfoVccUrlField"
                                    className="vccUrlField custom-url-input"
                                    readOnly
                                    value={listing.url}
                                    aria-label="Listing URL"
                                />
                            </div>
                            <CopyButton
                                id="packageInfoVccUrlFieldCopy"
                                value={listing.url}
                                message="Repository URL copied!"
                                onCopy={onCopy}
                                icon={<CopyIcon/>}
                                label="Copy"
                            />
                        </div>
                    </div>

                    <div className="modal-footer-actions">
                        <button
                            type="button"
                            className="btn btn-primary modalAddRepoTrigger"
                            onClick={onAddToVcc}
                        >
                            <PlusCircleIcon size={16}/>
                            <span>Add Repository to VCC</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
