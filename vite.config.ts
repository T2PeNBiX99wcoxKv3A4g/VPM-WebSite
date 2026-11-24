import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// The listing is published below a project Pages URL (`/VPM-WebSite/`), so every
// asset path has to stay relative.
export default defineConfig({
    plugins: [
        react(),
        // `.svg?react` gives a React component; SVGO is left off so the icon
        // geometry is exactly what the file contains.
        svgr({ svgrOptions: { svgo: false } }),
    ],
    base: "./",
    build: {
        // `app.js` is reserved: the listing action renders it as a Scriban
        // template, so the bundle must never be called that.
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]"
            }
        }
    }
});
