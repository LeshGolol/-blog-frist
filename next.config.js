/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['gravatar.com']
  },
  eslint: {
    dirs: ['components', 'layouts', 'lib', 'pages'],
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
