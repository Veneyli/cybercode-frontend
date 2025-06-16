// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost"],
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "5000",
//         pathname: "/uploads/**",
//       },
//     ],
//   },
// };


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.cybercode.veney.tech"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cybercode.veney.tech",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
