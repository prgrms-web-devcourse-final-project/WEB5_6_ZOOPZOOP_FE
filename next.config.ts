import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
  images: {
    domains: [
      'k.kakaocdn.net',
      'zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com'
    ]
  }
}

export default nextConfig
