import { DownloadIcon } from "./icons";
import { Menu, MenuItem } from "./RowMoreMenu.styles";
import { useI18n } from "../i18n/Provider";

/**
 * Kept for markup compatibility with the previous listing: the per-card "more
 * options" trigger is hidden, so the menu only needs to exist in the DOM.
 */
export const RowMoreMenu = () => {
    const { t } = useI18n();

    return (
        <Menu id="rowMoreMenu" hidden>
            <MenuItem type="button" id="rowMoreMenuDownload">
                <DownloadIcon />
                <span>{t("card.downloadZip")}</span>
            </MenuItem>
        </Menu>
    );
};
