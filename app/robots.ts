import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI Search Engines & Retrieval Agents (Perplexity, ChatGPT Search, Bing/Copilot, Google Gemini)
      { userAgent: "OAI-SearchBot",       allow: "/" },
      { userAgent: "ChatGPT-User",        allow: "/" },
      { userAgent: "PerplexityBot",       allow: "/" },
      { userAgent: "Google-Extended",     allow: "/" },
      { userAgent: "ClaudeBot",           allow: "/" },
      { userAgent: "Applebot-Extended",   allow: "/" },
      { userAgent: "cohere-ai",           allow: "/" },
    ],
    sitemap: "https://adithyanspillai.in/sitemap.xml",
    host: "https://adithyanspillai.in",
  };
}
