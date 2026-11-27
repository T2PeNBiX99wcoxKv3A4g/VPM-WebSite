// Guards the translation dictionaries: every language must define the same keys and
// use the same {placeholders} as English, otherwise a message would render with a
// literal "{vcc}" in it.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const directory = join(root, "src", "i18n");

const languages = ["en", "ja", "zh-CN", "zh-TW"];

const readMessages = language => JSON.parse(readFileSync(join(directory, `${language}.json`), "utf8"));

const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort().join(",");

const reference = readMessages("en");
let failed = false;

for (const language of languages) {
    const messages = readMessages(language);
    const keys = Object.keys(messages);

    for (const [key, value] of Object.entries(reference)) {
        const translated = messages[key];

        if (translated === undefined) {
            failed = true;
            console.error(`fail ${language}: missing "${key}"`);
            continue;
        }

        const expected = placeholders(value);
        const actual = placeholders(translated);

        if (expected !== actual) {
            failed = true;
            console.error(`fail ${language}: "${key}" placeholders {${actual}} != {${expected}}`);
        }
    }

    for (const key of keys) {
        if (!(key in reference)) {
            failed = true;
            console.error(`fail ${language}: unknown key "${key}"`);
        }
    }

    console.log(`ok   ${language} (${keys.length} messages)`);
}

process.exit(failed ? 1 : 0);
