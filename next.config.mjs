/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/dashboard",
          destination: "/",
        },
        {
          source: "/:path*",
          destination: "https://a.theaibunny.com/:path*",
        },
      ],
    };
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/_next/static/sounds/",
          outputPath: "static/sounds/",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
