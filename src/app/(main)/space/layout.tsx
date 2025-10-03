import { SpaceHeader } from '@/widgets/space'

export default function SpaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SpaceHeader title="내 스페이스" />
      <div className="p-8">{children}</div>
    </>
  )
}
