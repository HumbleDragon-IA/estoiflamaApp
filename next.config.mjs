/** @type {import('next').NextConfig} */
const nextConfig = {
  //   typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qszhlmqelfxnicnvehql.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
