import { DownloadIcon } from "./icons";
import { Menu, MenuItem } from "./RowMoreMenu.styles";

/**
 * Kept for markup compatibility with the previous listing: the per-card "more
 * options" trigger is hidden, so the menu only needs to exist in the DOM.
 */
export const RowMoreMenu = () => (
    <Menu id="rowMoreMenu" hidden>
        <MenuItem type="button" id="rowMoreMenuDownload">
            <DownloadIcon />
            <span>Download .ZIP</span>
        </MenuItem>
    </Menu>
);
