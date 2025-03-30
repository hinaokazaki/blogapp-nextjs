/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ccqlausbsetmynsksend.supabase.co"], // Supabaseのストレージドメインを追加
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.jp'},
      { protocol: 'https', hostname: 'images.microcms-assets.io'},
    ],
  },
};

export default nextConfig;
