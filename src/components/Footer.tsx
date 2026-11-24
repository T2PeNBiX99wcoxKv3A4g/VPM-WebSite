import type { ListingInfo } from "../types";
import { Content, DotSeparator, FooterBar, Links, Text } from "./Footer.styles";

interface FooterProps {
    listing: ListingInfo;
}

export const Footer = ({ listing }: FooterProps) => {
    const infoLink = listing.infoLink;

    return (
        <FooterBar>
            <Content>
                <Text>
                    Powered by VPM Listing. Compatible with{" "}
                    <a href="https://vrchat.com/home/download" target="_blank" rel="noopener noreferrer">
                        VRChat Creator Companion
                    </a>{" "}
                    &amp;{" "}
                    <a href="https://vrc-get.anatawa12.com/alcom/" target="_blank" rel="noopener noreferrer">
                        ALCOM
                    </a>
                    .
                </Text>
                <Links>
                    {infoLink?.url ? (
                        <>
                            <a href={infoLink.url} target="_blank" rel="noopener noreferrer">
                                {infoLink.text || "GitHub Repository"}
                            </a>
                            <DotSeparator>•</DotSeparator>
                        </>
                    ) : null}
                    <a href="https://vcc.docs.vrchat.com" target="_blank" rel="noopener noreferrer">
                        VCC Documentation
                    </a>
                </Links>
            </Content>
        </FooterBar>
    );
};
