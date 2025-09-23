import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/shared/providers'
import Navbar from '@/shared/ui/navbar/Navbar'
import { GlobalModal } from '@/shared/ui/modal'

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
      <body className="antialiased flex ">
        <Navbar />
        <main className="flex-1">
          <QueryProvider>
            {children}
            <GlobalModal />
          </QueryProvider>
        </main>
      </body>
    </html>
  )
}
