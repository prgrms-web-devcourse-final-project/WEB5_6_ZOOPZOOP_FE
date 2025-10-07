import { SpaceHeader } from '@/widgets/space'

export default function SpaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SpaceHeader />
      <div className="w-full">{children}</div>
    </>
  )
}
