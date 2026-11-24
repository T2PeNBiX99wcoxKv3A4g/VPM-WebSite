import type { ListingData } from "./types";

/**
 * Sample data for `npm run dev`, where no package-list-action rendering happens.
 * The production build drops it because the branch is guarded by `import.meta.env.DEV`.
 */
export const devListingData: ListingData = {
    listing: {
        url: "https://example.github.io/VPM/index.json",
        name: "Example VPM Repository",
        description: "Local development listing",
        author: {
            name: "Example Author",
            url: "https://github.com/example",
        },
        infoLink: {
            url: "https://github.com/example/VPM",
            text: "View on GitHub",
        },
        bannerImage: true,
        bannerImageUrl: "banner.png",
    },
    packages: {
        "io.github.example.first": {
            name: "io.github.example.first",
            displayName: "Example Package",
            description: "A package used to preview the listing layout.",
            version: "1.2.3",
            type: "Any",
            zipUrl: "https://example.com/package.zip",
            author: { name: "Example Author", url: "https://github.com/example" },
            dependencies: {
                "io.github.example.second": "^0.4.0",
                "com.vrchat.worlds": ">=3.10.0",
            },
            keywords: ["example", "preview"],
            license: "MIT",
            licensesUrl: "https://example.com/license",
        },
        "io.github.example.second": {
            name: "io.github.example.second",
            displayName: "Example World Package",
            description: "A second package so the search field has something to filter.",
            version: "0.4.1",
            type: "World",
            zipUrl: "https://example.com/world.zip",
            author: { name: "Example Author", url: "https://github.com/example" },
            dependencies: {},
            keywords: [],
            license: "MIT",
            licensesUrl: "https://example.com/license",
        },
    },
};
