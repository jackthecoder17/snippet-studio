import type { NextConfig } from "next";

// Exported as static files so it can be hosted on GitHub Pages.
// BASE_PATH is set in CI to the repo name (e.g. "/snippet-studio").
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  images: { unoptimized: true },
};

export default nextConfig;
