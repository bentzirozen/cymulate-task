// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/scraping',
        permanent: true, // Set to true for a permanent redirect (301), false for a temporary redirect (307)
      },
    ];
  },
};

export default nextConfig;