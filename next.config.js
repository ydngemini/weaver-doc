/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],

  poweredByHeader: false,

  productionBrowserSourceMaps: false,

  // Security headers are configured in netlify.toml for static export
}
module.exports = nextConfig
