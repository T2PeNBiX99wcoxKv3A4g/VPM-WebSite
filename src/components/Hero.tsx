import type { ListingInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { CopyIcon, HelpCircleIcon, LinkIcon, PlusCircleIcon, UserIcon } from "./icons";

interface HeroProps {
    listing: ListingInfo;
    onAddToVcc: () => void;
    onShowHelp: () => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const Hero = ({ listing, onAddToVcc, onShowHelp, onCopy }: HeroProps) => {
    const author = listing.author;

    return (
        <section className="hero-section">
            {listing.bannerImage && listing.bannerImageUrl ? (
                <div className="banner-container">
                    <div
                        className="banner-image"
                        style={{ backgroundImage: `url(${listing.bannerImageUrl})` }}
                    />
                </div>
            ) : null}

            <div className="hero-content">
                <div className="repo-badge">VRChat Package Manager Listing</div>
                <h1 className="hero-title">{listing.name}</h1>
                {listing.description ? <p className="hero-description">{listing.description}</p> : null}

                <div className="hero-meta">
                    <div className="author-tag" id="publishedByText">
                        <UserIcon />
                        <span>Published by</span>
                        <a
                            href={author?.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="author-name"
                            title={author?.email}
                        >
                            {author?.name}
                        </a>
                    </div>
                </div>
            </div>

            <div className="action-card">
                <div className="action-card-header">
                    <span className="action-card-label">Repository URL</span>
                    <span className="action-card-hint">Add this URL to VCC or ALCOM</span>
                </div>
                <div className="action-card-body addToVccBlock">
                    <div className="url-input-wrapper">
                        <LinkIcon />
                        <input
                            type="text"
                            id="vccUrlField"
                            className="vccUrlField custom-url-input"
                            readOnly
                            value={listing.url}
                            aria-label="Listing URL"
                        />
                    </div>
                    <div className="action-buttons">
                        <button
                            type="button"
                            className="btn btn-primary btn-glow"
                            id="vccAddRepoButton"
                            onClick={onAddToVcc}
                        >
                            <PlusCircleIcon />
                            <span>Add to VCC</span>
                        </button>

                        <CopyButton
                            id="vccUrlFieldCopy"
                            value={listing.url}
                            message="Repository URL copied!"
                            onCopy={onCopy}
                            icon={<CopyIcon />}
                            label="Copy URL"
                        />

                        <button
                            type="button"
                            className="btn btn-icon"
                            id="urlBarHelp"
                            aria-label="Installation Guide"
                            title="How to add to VCC / ALCOM"
                            onClick={onShowHelp}
                        >
                            <HelpCircleIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
