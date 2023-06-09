/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "s3-media1.fl.yelpcdn.com",
      "s3-media2.fl.yelpcdn.com",
      "s3-media3.fl.yelpcdn.com",
      "s3-media4.fl.yelpcdn.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
