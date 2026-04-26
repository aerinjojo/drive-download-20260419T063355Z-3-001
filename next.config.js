/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/assignment6',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
