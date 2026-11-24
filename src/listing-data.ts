import type {ListingData, ListingInfo, PackageInfo, PackageMap} from "./types";
import {devListingData} from "./dev-data";
import {decodeHtmlEntities} from "./lib/html";

declare global {
    interface Window {
        VPM_LISTING?: ListingInfo;
        PACKAGES?: PackageMap;
    }
}

const fallbackListing: ListingInfo = {
    url: "",
    name: "VPM Repository",
};

const appScript = "./app.js";

/**
 * `app.js` is rendered by vrchat-community/package-list-action when the listing is
 * published. It is loaded at runtime because the file only exists after that step
 * (and is a Scriban template, so it cannot be bundled).
 */
const loadRuntimeData = () =>
    new Promise<void>(resolve => {
        if (document.querySelector("script[data-listing-data]")) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = appScript;
        script.async = false;
        script.dataset.listingData = "true";
        script.addEventListener("load", () => resolve());
        script.addEventListener("error", () => resolve());
        document.head.appendChild(script);
    });

/** Undoes the `html.escape` filter the listing template applies to text values. */
const normalizePackage = (pkg: PackageInfo): PackageInfo => ({
    ...pkg,
    displayName: decodeHtmlEntities(pkg.displayName),
    description: decodeHtmlEntities(pkg.description),
    license: decodeHtmlEntities(pkg.license),
    licensesUrl: decodeHtmlEntities(pkg.licensesUrl),
    keywords: pkg.keywords?.map(keyword => decodeHtmlEntities(keyword) ?? ""),
    author: pkg.author
        ? {
            name: decodeHtmlEntities(pkg.author.name),
            url: decodeHtmlEntities(pkg.author.url),
        }
        : undefined,
});

const normalizeListing = (listing: ListingInfo): ListingInfo => ({
    ...listing,
    description: decodeHtmlEntities(listing.description),
});

export const loadListingData = async (): Promise<ListingData> => {
    if (!window.VPM_LISTING) {
        await loadRuntimeData();
    }

    if (!window.VPM_LISTING) {
        // `npm run dev` has no rendered app.js, so a small demo listing is used.
        if (import.meta.env.DEV) {
            return devListingData;
        }

        return {listing: fallbackListing, packages: {}};
    }

    const packages = Object.fromEntries(
        Object.entries(window.PACKAGES ?? {}).map(([name, pkg]) => [name, normalizePackage(pkg)])
    );

    return {
        listing: normalizeListing(window.VPM_LISTING),
        packages,
    };
};
