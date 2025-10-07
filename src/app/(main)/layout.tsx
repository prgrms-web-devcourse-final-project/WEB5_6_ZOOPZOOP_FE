import { NavbarContentWrapper } from '@/shared/ui/navbar'
import Navbar from '@/shared/ui/navbar/Navbar'
import { NotificationBell } from '@/widgets'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar notificationSlot={<NotificationBell />} />
      <NavbarContentWrapper>{children}</NavbarContentWrapper>
    </>
  )
}
