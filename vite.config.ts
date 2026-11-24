import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The listing is published below a project Pages URL (`/VPM-WebSite/`), so every
// asset path has to stay relative.
export default defineConfig({
    plugins: [react()],
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
