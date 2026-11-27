import type { ListingInfo } from "../types";
import { Content, DotSeparator, FooterBar, Links, Text } from "./Footer.styles";
import { RichText } from "../i18n/RichText";
import { useI18n } from "../i18n/Provider";

interface FooterProps {
    listing: ListingInfo;
}

export const Footer = ({ listing }: FooterProps) => {
    const { t } = useI18n();
    const infoLink = listing.infoLink;

    return (
        <FooterBar>
            <Content>
                <Text>
                    <RichText
                        message="footer.powered"
                        slots={{
                            vcc: (
                                <a href="https://vrchat.com/home/download" target="_blank" rel="noopener noreferrer">
                                    {t("footer.vcc")}
                                </a>
                            ),
                            alcom: (
                                <a
                                    href="https://vrc-get.anatawa12.com/alcom/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("footer.alcom")}
                                </a>
                            ),
                        }}
                    />
                </Text>
                <Links>
                    {infoLink?.url ? (
                        <>
                            <a href={infoLink.url} target="_blank" rel="noopener noreferrer">
                                {infoLink.text || t("footer.sourceFallback")}
                            </a>
                            <DotSeparator>•</DotSeparator>
                        </>
                    ) : null}
                    <a href="https://vcc.docs.vrchat.com" target="_blank" rel="noopener noreferrer">
                        {t("footer.vccDocs")}
                    </a>
                </Links>
            </Content>
        </FooterBar>
    );
};
