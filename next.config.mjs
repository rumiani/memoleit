/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "imgur.com",
            port: "",
            pathname: "/",
          },
        ],
      },
};

export default nextConfig;
