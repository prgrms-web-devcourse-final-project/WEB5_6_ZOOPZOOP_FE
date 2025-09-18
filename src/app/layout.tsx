import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/shared/providers'

export const metadata: Metadata = {
  title: 'ZoopZoop',
  description: 'ZoopZoop',
  icons: {
    icon: '/image.png'
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
