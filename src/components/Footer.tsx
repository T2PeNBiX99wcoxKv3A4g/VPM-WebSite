import type {ListingInfo} from "../types";

interface FooterProps {
    listing: ListingInfo;
}

export const Footer = ({listing}: FooterProps) => {
    const infoLink = listing.infoLink;

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    Powered by VPM Listing. Compatible with{" "}
                    <a href="https://vrchat.com/home/download" target="_blank" rel="noopener noreferrer">
                        VRChat Creator Companion
                    </a>{" "}
                    &amp;{" "}
                    <a href="https://vrc-get.anatawa12.com/alcom/" target="_blank" rel="noopener noreferrer">
                        ALCOM
                    </a>
                    .
                </p>
                <div className="footer-links">
                    {infoLink?.url ? (
                        <>
                            <a href={infoLink.url} target="_blank" rel="noopener noreferrer">
                                {infoLink.text || "GitHub Repository"}
                            </a>
                            <span className="dot-separator">•</span>
                        </>
                    ) : null}
                    <a href="https://vcc.docs.vrchat.com" target="_blank" rel="noopener noreferrer">
                        VCC Documentation
                    </a>
                </div>
            </div>
        </footer>
    );
};
