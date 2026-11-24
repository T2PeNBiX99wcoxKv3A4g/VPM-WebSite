const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
};

/**
 * The listing template escapes its values with Scriban's `html.escape` because the
 * package block used to be injected straight into HTML. The values now travel as
 * JavaScript strings, so the entities are decoded again before rendering (and URLs
 * such as `?a=1&amp;b=2` stay usable).
 */
export const decodeHtmlEntities = (value: string | undefined): string | undefined =>
    value?.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ENTITIES[entity] ?? entity);
