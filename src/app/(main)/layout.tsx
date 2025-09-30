import Navbar from '@/shared/ui/navbar/Navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 ml-60">{children}</div>
    </div>
  )
}
