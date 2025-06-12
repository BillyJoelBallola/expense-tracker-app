import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trackr - Expense Tacker",
    short_name: "Trackr",
    description: "Trakr is a Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "oklch(14.5% 0 0)",
    theme_color: "oklch(14.5% 0 0)",
    icons: [
      {
        src: "/dark-logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/white-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
