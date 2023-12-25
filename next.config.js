// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === 'true',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === 'true',
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
