import type { PackageInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { CopyIcon, DownloadIcon, DotsIcon, InfoIcon, PlusIcon } from "./icons";

interface PackageCardProps {
    pkg: PackageInfo;
    onAddToVcc: () => void;
    onShowInfo: (pkg: PackageInfo) => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const PackageCard = ({ pkg, onAddToVcc, onShowInfo, onCopy }: PackageCardProps) => {
    const displayName = pkg.displayName || pkg.name;

    return (
        <div
            className="package-card-row"
            data-package-name={displayName}
            data-package-id={pkg.name}
            data-package-desc={pkg.description}
            data-package-type={pkg.type}
        >
            <div className="pkg-card">
                <div className="pkg-card-top">
                    <div className="pkg-title-area">
                        <div className="pkg-header-row">
                            <h3 className="packageName pkg-display-name">{displayName}</h3>
                            <div className="pkg-badges">
                                {pkg.type ? (
                                    <span className={`badge badge-type badge-${pkg.type.toLowerCase()}`}>
                                        {pkg.type}
                                    </span>
                                ) : null}
                                {pkg.version ? <span className="badge badge-version">v{pkg.version}</span> : null}
                            </div>
                        </div>
                        <div className="caption2 pkg-id-row">
                            <span className="pkg-id-text">{pkg.name}</span>
                            <CopyButton
                                className="copy-id-btn"
                                value={pkg.name}
                                message={`Copied ID: ${pkg.name}`}
                                title="Copy Package ID"
                                onCopy={onCopy}
                                icon={<CopyIcon size={13} />}
                            />
                        </div>
                    </div>
                </div>

                {pkg.description ? <p className="caption1 pkg-description">{pkg.description}</p> : null}

                <div className="pkg-card-actions">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary rowAddToVccButton"
                        data-package-id={pkg.name}
                        onClick={onAddToVcc}
                    >
                        <PlusIcon />
                        <span>Add to VCC</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary rowPackageInfoButton"
                        data-package-id={pkg.name}
                        title="View Package Details"
                        onClick={() => onShowInfo(pkg)}
                    >
                        <InfoIcon />
                        <span>Details</span>
                    </button>
                    {pkg.zipUrl ? (
                        <a
                            href={pkg.zipUrl}
                            download
                            className="btn btn-sm btn-outline pkg-download-btn"
                            title="Download ZIP Archive"
                        >
                            <DownloadIcon />
                            <span>Download</span>
                        </a>
                    ) : null}
                    <button
                        type="button"
                        className="btn btn-icon btn-sm rowMenuButton"
                        data-package-url={pkg.zipUrl}
                        title="More options"
                        style={{ display: "none" }}
                    >
                        <DotsIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};
