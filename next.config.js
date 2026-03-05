const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/dummy-image/:path*',
        destination: 'https://cdn.dummyjson.com/:path*',
      },
    ];
  },
  turbopack: {
  },
};

module.exports = nextConfig;