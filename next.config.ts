import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgnews.pstatic.net' },
      { protocol: 'https', hostname: '**.pstatic.net' },
      { protocol: 'https', hostname: '**.kakaocdn.net' },
      { protocol: 'https', hostname: '**.daumcdn.net' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
      { protocol: 'https', hostname: '**.s3.ap-northeast-2.amazonaws.com' },
      { protocol: 'https', hostname: 'file.sportsseoul.com' },
      { protocol: 'https', hostname: 'image.newdaily.co.kr' },
      { protocol: 'https', hostname: 'img.hankyung.com' },
      { protocol: 'https', hostname: 'www.koreadaily.com' }
    ]
  }
}

export default nextConfig
