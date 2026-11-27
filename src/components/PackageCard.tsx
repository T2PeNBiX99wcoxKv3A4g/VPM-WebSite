import type { PackageInfo } from "../types";
import { CopyButton } from "./CopyButton";
import { CopyIcon, DownloadIcon, DotsIcon, InfoIcon, PlusIcon } from "./icons";
import {
    Badges,
    Card,
    CardActions,
    CardTop,
    Description,
    DisplayName,
    HeaderRow,
    IdRow,
    IdText,
    Row,
    TitleArea,
    TypeBadge,
    VersionBadge,
} from "./PackageCard.styles";
import { Button, ButtonLink } from "../styles/buttons";
import { useI18n } from "../i18n/Provider";

interface PackageCardProps {
    pkg: PackageInfo;
    onAddToVcc: () => void;
    onShowInfo: (pkg: PackageInfo) => void;
    onCopy: (text: string, message?: string) => Promise<void>;
}

export const PackageCard = ({ pkg, onAddToVcc, onShowInfo, onCopy }: PackageCardProps) => {
    const { t } = useI18n();
    const displayName = pkg.displayName || pkg.name;

    return (
        <Row
            data-package-name={displayName}
            data-package-id={pkg.name}
            data-package-desc={pkg.description}
            data-package-type={pkg.type}
        >
            <Card>
                <CardTop>
                    <TitleArea>
                        <HeaderRow>
                            <DisplayName>{displayName}</DisplayName>
                            <Badges>
                                {pkg.type ? <TypeBadge $type={pkg.type}>{pkg.type}</TypeBadge> : null}
                                {pkg.version ? <VersionBadge>v{pkg.version}</VersionBadge> : null}
                            </Badges>
                        </HeaderRow>
                        <IdRow>
                            <IdText>{pkg.name}</IdText>
                            <CopyButton
                                variant="ghost"
                                value={pkg.name}
                                message={t("card.copiedId", { id: pkg.name })}
                                title={t("card.copyId")}
                                onCopy={onCopy}
                                icon={<CopyIcon width={13} height={13} />}
                            />
                        </IdRow>
                    </TitleArea>
                </CardTop>

                {pkg.description ? <Description>{pkg.description}</Description> : null}

                <CardActions>
                    <Button
                        type="button"
                        $variant="primary"
                        $small
                        data-package-id={pkg.name}
                        onClick={onAddToVcc}
                    >
                        <PlusIcon />
                        <span>{t("card.addToVcc")}</span>
                    </Button>
                    <Button
                        type="button"
                        $variant="secondary"
                        $small
                        data-package-id={pkg.name}
                        title={t("card.detailsTitle")}
                        onClick={() => onShowInfo(pkg)}
                    >
                        <InfoIcon />
                        <span>{t("card.details")}</span>
                    </Button>
                    {pkg.zipUrl ? (
                        <ButtonLink
                            href={pkg.zipUrl}
                            download
                            $variant="outline"
                            $small
                            title={t("card.downloadTitle")}
                        >
                            <DownloadIcon />
                            <span>{t("card.download")}</span>
                        </ButtonLink>
                    ) : null}
                    <Button
                        type="button"
                        $variant="icon"
                        $small
                        data-package-url={pkg.zipUrl}
                        title={t("card.more")}
                        style={{ display: "none" }}
                    >
                        <DotsIcon />
                    </Button>
                </CardActions>
            </Card>
        </Row>
    );
};
