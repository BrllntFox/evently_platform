/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" ,port:"",pathname:"**"},
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
