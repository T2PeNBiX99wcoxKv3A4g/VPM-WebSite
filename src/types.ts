export interface PackageAuthor {
    name?: string;
    url?: string;
}

export interface ListingAuthor extends PackageAuthor {
    email?: string;
}

export interface ListingLink {
    url?: string;
    text?: string;
}

export interface ListingInfo {
    url: string;
    name: string;
    description?: string;
    author?: ListingAuthor;
    infoLink?: ListingLink;
    bannerImage?: boolean;
    bannerImageUrl?: string;
}

export interface PackageInfo {
    name: string;
    displayName?: string;
    description?: string;
    version?: string;
    type?: string;
    zipUrl?: string;
    author?: PackageAuthor;
    dependencies?: Record<string, string>;
    keywords?: string[];
    license?: string;
    licensesUrl?: string;
}

export type PackageMap = Record<string, PackageInfo>;

export interface ListingData {
    listing: ListingInfo;
    packages: PackageMap;
}
