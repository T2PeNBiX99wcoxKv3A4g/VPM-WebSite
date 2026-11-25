// Guards the Scriban template in `templates/app.js`: it must stay renderable by
// package-list-action and the rendered result must be valid JavaScript.
//
// The renderer below only understands the subset the template uses (if / for /
// interpolation / the html.escape filter), which is enough to catch syntax
// mistakes before a release workflow does.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const template = readFileSync(join(root, "templates", "app.js"), "utf8");

const SELF = "self";

const tokenize = source => {
    const pattern = /\{\{~?\s*([\s\S]*?)\s*~?\}\}/g;
    const tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(source)) !== null) {
        if (match.index > lastIndex) {
            tokens.push({ kind: "text", value: source.slice(lastIndex, match.index) });
        }

        const tag = match[1].trim();
        let kind = SELF;

        if (tag.startsWith("for ")) {
            kind = "for";
        } else if (tag.startsWith("if ")) {
            kind = "if";
        } else if (tag === "end") {
            kind = "end";
        }

        tokens.push({ kind, tag });
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < source.length) {
        tokens.push({ kind: "text", value: source.slice(lastIndex) });
    }

    return tokens;
};

const buildTree = tokens => {
    const root = { kind: "root", children: [] };
    const stack = [root];

    for (const token of tokens) {
        const parent = stack.at(-1);

        if (token.kind === "text") {
            parent.children.push({ kind: "text", value: token.value });
            continue;
        }

        if (token.kind === "end") {
            if (stack.length === 1) {
                throw new Error("Unexpected end tag");
            }
            stack.pop();
            continue;
        }

        if (token.kind === "for") {
            const [, variable, path] = token.tag.match(/^for (\w+) in ([\w.]+)$/) ?? [];
            if (!variable) {
                throw new Error(`Unsupported loop: ${token.tag}`);
            }
            const node = { kind: "for", variable, path, children: [] };
            parent.children.push(node);
            stack.push(node);
            continue;
        }

        if (token.kind === "if") {
            const node = { kind: "if", condition: token.tag.slice(3), children: [] };
            parent.children.push(node);
            stack.push(node);
            continue;
        }

        parent.children.push({ kind: "value", expression: token.tag });
    }

    if (stack.length !== 1) {
        throw new Error("Unbalanced block in template");
    }

    return root.children;
};

const lookup = (contexts, path) =>
    path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), contexts);

const htmlEscape = value =>
    String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const evaluate = (contexts, expression) => {
    const [path, ...filters] = expression.split("|").map(part => part.trim());
    let value = lookup(contexts, path);

    for (const filter of filters) {
        if (filter === "html.escape") {
            value = htmlEscape(value);
        } else {
            throw new Error(`Unsupported filter: ${filter}`);
        }
    }

    return value;
};

const render = (nodes, contexts) =>
    nodes
        .map(node => {
            if (node.kind === "text") {
                return node.value;
            }

            if (node.kind === "value") {
                return String(evaluate(contexts, node.expression) ?? "");
            }

            if (node.kind === "if") {
                return evaluate(contexts, node.condition) ? render(node.children, contexts) : "";
            }

            const items = lookup(contexts, node.path) ?? [];
            return Object.values(items)
                .map(item => render(node.children, { ...contexts, [node.variable]: item }))
                .join("");
        })
        .join("");

const listingInfo = (overrides = {}) => ({
    Url: "https://example.github.io/VPM/index.json",
    Name: "Example Repository",
    Author: { Name: "Example Author", Url: "https://github.com/example" },
    ...overrides,
});

const fixtures = {
    "happy path": {
        // Values the rendered template must contain. This is what catches a member
        // name that no longer matches the action's anonymous object (it would render
        // as an empty string and still be valid JavaScript).
        expect: [
            "licensesUrl: `https://example.com/license`",
            "zipUrl: `https://example.com/a.zip`",
            "email: `author@example.com`",
            "bannerImageUrl: `banner.png`",
        ],
        listingInfo: listingInfo({
            Description: "A repository",
            Author: {
                Name: "Example Author",
                Url: "https://github.com/example",
                Email: "author@example.com",
            },
            InfoLink: { Url: "https://github.com/example/VPM", Text: "View on GitHub" },
            BannerImage: true,
            BannerImageUrl: "banner.png",
        }),
        packages: [
            {
                Name: "io.github.example.first",
                DisplayName: "Example & <Package>",
                Description: "Quotes ' and \" must not break the output",
                Version: "1.2.3",
                Type: "Any",
                ZipUrl: "https://example.com/a.zip",
                Author: { Name: "Example Author", Url: "https://github.com/example" },
                Dependencies: [{ Name: "io.github.example.second", Version: "^0.4.0" }],
                Keywords: ["example"],
                License: "MIT",
                LicenseUrl: "https://example.com/license",
            },
        ],
    },
    "bare manifest listing": {
        listingInfo: listingInfo(),
        packages: [
            {
                Name: "io.github.example.first",
                DisplayName: "Example",
                Description: "No dependencies and no keywords",
                Version: "0.0.1",
                Type: "World",
                ZipUrl: "https://example.com/a.zip",
                Author: { Name: "Example Author", Url: "https://github.com/example" },
                Dependencies: [],
                Keywords: [],
                License: "MIT",
                LicenseUrl: "https://example.com/license",
            },
        ],
    },
    "empty listing": {
        listingInfo: listingInfo(),
        packages: [],
    },
};

let failed = false;

for (const [name, fixture] of Object.entries(fixtures)) {
    let rendered;

    try {
        rendered = render(buildTree(tokenize(template)), fixture);
        // Compiles without running, so the `window.*` assignments are harmless.
        new Function(rendered);

        const missing = (fixture.expect ?? []).filter(snippet => !rendered.includes(snippet));
        if (missing.length > 0) {
            throw new Error(`rendered output is missing: ${missing.join(" | ")}`);
        }

        console.log(`ok   ${name}`);
    } catch (error) {
        failed = true;
        console.error(`fail ${name}: ${error.message}`);
        console.error(rendered ?? "");
    }
}

process.exit(failed ? 1 : 0);
