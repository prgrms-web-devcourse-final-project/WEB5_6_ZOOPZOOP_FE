import { QueryProvider } from '@/app/_providers'
import AuthProvider from '@/app/_providers/auth-provider'
import type { Metadata } from 'next'
import './globals.css'
import { GlobalModal } from './_global/GlobalModal'
import { ToastProvider } from './_providers/toast-provider'

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
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko-KR">
      <body className="antialiased">
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
