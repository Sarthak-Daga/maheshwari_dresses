const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "duders.in",
      },
      {
        protocol: "https",
        hostname: "images.meesho.com",
      },
    ],
  },
};

export default nextConfig;
