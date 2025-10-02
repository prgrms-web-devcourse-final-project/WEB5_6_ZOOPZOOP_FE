import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
  images: {
    unoptimized: true
  }
}

export default nextConfig
