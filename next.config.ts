import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net'
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net'
      },
      {
        protocol: 'http',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com'
      }
    ]
  }
}

export default nextConfig
