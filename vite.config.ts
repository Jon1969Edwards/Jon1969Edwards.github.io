import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages serves same-origin assets; crossorigin on link/script can break stylesheet loading. */
function removeCrossorigin(): Plugin {
  return {
    name: "remove-crossorigin",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(/\s+crossorigin/g, "");
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), removeCrossorigin()],
  base: "/",
});
