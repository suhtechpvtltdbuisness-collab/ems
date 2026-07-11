import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ADS_TXT_CERTIFICATE_ID = "f08c47fec0942fa0";

const adsTxtPlugin = (env) => ({
  name: "generate-ads-txt",
  closeBundle() {
    const client = env.VITE_GOOGLE_ADSENSE_CLIENT?.trim();
    if (!client) {
      return;
    }

    const publisherId = client.startsWith("ca-") ? client.slice(3) : client;
    const adsTxt = `google.com, ${publisherId}, DIRECT, ${ADS_TXT_CERTIFICATE_ID}\n`;
    writeFileSync(resolve(process.cwd(), "dist/ads.txt"), adsTxt);
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), adsTxtPlugin(env)],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_PROXY_TARGET || "http://localhost:4000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
