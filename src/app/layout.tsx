import { QueryProvider } from '@/app/_providers'
import AuthProvider from '@/app/_providers/auth-provider'
import { ToastProvider } from '@/app/_providers/toast-provider'
import type { Metadata } from 'next'
import './globals.css'

import { GlobalModal } from './_global/GlobalModal'
import { Noto_Sans_KR } from 'next/font/google'

export const metadata: Metadata = {
  title: {
    default: 'ZoopZoop',
    template: '%s | ZoopZoop'
  },
  description: '마음에 드는 정보를 줍s',
  keywords: ['news', 'information'],
  authors: [{ name: 'ZoopZoop Team' }],
  creator: 'ZoopZoop',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.zoopzoop.kro.kr/',
    siteName: 'ZoopZoop'
  }
}

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko-KR">
      <body className={`antialiased ${notoSans.className}  text-[#0b0b0b]`}>
        <main>
          <ToastProvider />
          <QueryProvider>
            <AuthProvider>
              {children}
              <GlobalModal />
            </AuthProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  )
}
