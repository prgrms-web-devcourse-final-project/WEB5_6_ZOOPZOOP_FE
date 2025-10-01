import { NavbarContentWrapper } from '@/shared/ui/navbar'
import Navbar from '@/shared/ui/navbar/Navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <NavbarContentWrapper>{children}</NavbarContentWrapper>
    </>
  )
}
