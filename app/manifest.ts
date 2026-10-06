import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adithyan S Pillai | Software Engineer",
    short_name: "Adithyan S Pillai",
    description:
      "Portfolio of Adithyan S Pillai - Software Engineer, Full-Stack & Backend Developer, Python, Node.js & AI/ML Enthusiast.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F4E8",
    theme_color: "#1C1C1C",
    icons: [
      {
        src: "/adithyan.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
    ],
  };
}
