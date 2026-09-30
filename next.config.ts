import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lets a phone on the home network use `pnpm dev:lan` (the Mac's address changes, so match the whole subnet)
  allowedDevOrigins: ["192.168.*.*"],
  // private build: no search indexing for any response, pages or assets
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
};

export default nextConfig;
