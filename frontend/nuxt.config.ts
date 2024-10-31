import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  sourcemap: { server: true, client: false },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "./nuxt.proxyoverride.ts",
    "unplugin-icons/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", config => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:7745/api",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["@/assets/css/main.css"],
  pwa: {
    workbox: {
      navigateFallbackDenylist: [/^\/api/],
    },
    injectRegister: "script",
    injectManifest: {
      swSrc: "sw.js",
    },
    devOptions: {
      // Enable to troubleshoot during development
      enabled: false,
    },
    manifest: {
      name: "Homebox",
      short_name: "Homebox",
      description: "Home Inventory App",
      theme_color: "#5b7f67",
      start_url: "/home",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
});
