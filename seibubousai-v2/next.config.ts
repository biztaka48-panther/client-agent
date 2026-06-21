import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 実行ディレクトリを基準にすることで、ローカル(Windows)/Netlify(Linux)
  // どちらでも正しいプロジェクトルートを指す（親 lockfile 誤検知も回避）
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
