import { DownloadIcon } from "./icons";

/**
 * Kept for markup compatibility with the previous listing: the per-card "more
 * options" trigger is hidden, so the menu only needs to exist in the DOM.
 */
export const RowMoreMenu = () => (
    <div className="row-more-menu" id="rowMoreMenu" hidden>
        <button type="button" className="menu-item-btn" id="rowMoreMenuDownload">
            <DownloadIcon />
            <span>Download .ZIP</span>
        </button>
    </div>
);
