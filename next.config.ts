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
        protocol: 'https',
        hostname: 'img1.kakaocdn.net'
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net'
      },
      {
        protocol: 'https',
        hostname: 'zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com'
      }
    ]
  }
}

export default nextConfig
