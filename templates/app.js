/* ==========================================================================
   Listing data.

   This file is a Scriban template: vrchat-community/package-list-action renders
   it while publishing, so the double-brace placeholders must stay untouched.
   Nothing else belongs in here — the UI lives in the React bundle.
   ========================================================================== */

window.VPM_LISTING = {
  url: `{{ listingInfo.Url }}`,
  name: `{{ listingInfo.Name }}`,
{{~ if listingInfo.Description ~}}
  description: `{{ listingInfo.Description }}`,
{{~ end ~}}
  author: {
    name: `{{ listingInfo.Author.Name }}`,
    url: `{{ listingInfo.Author.Url }}`,
{{~ if listingInfo.Author.Email ~}}
    email: `{{ listingInfo.Author.Email }}`,
{{~ end ~}}
  },
{{~ if listingInfo.InfoLink.Url ~}}
  infoLink: {
    url: `{{ listingInfo.InfoLink.Url }}`,
{{~ if listingInfo.InfoLink.Text ~}}
    text: `{{ listingInfo.InfoLink.Text }}`,
{{~ end ~}}
  },
{{~ end ~}}
{{~ if listingInfo.BannerImageUrl ~}}
  bannerImage: true,
  bannerImageUrl: `{{ listingInfo.BannerImageUrl }}`,
{{~ end ~}}
};

const PACKAGES = {
{{~ for package in packages ~}}
  [`{{ package.Name }}`]: {
    name: `{{ package.Name }}`,
    displayName: `{{ package.DisplayName | html.escape }}`,
    description: `{{ package.Description | html.escape }}`,
    version: `{{ package.Version }}`,
    type: `{{ package.Type }}`,
    zipUrl: `{{ package.ZipUrl }}`,
    author: {
      name: `{{ package.Author.Name | html.escape }}`,
      url: `{{ package.Author.Url | html.escape }}`,
    },
    dependencies: {
      {{~ for dependency in package.Dependencies ~}}
        [`{{ dependency.Name }}`]: `{{ dependency.Version }}`,
      {{~ end ~}}
    },
    keywords: [
      {{~ for keyword in package.Keywords ~}}
        `{{ keyword | html.escape }}`,
      {{~ end ~}}
    ],
    license: `{{ package.License | html.escape }}`,
    licensesUrl: `{{ package.LicenseUrl | html.escape }}`,
  },
{{~ end ~}}
};

window.PACKAGES = PACKAGES;
