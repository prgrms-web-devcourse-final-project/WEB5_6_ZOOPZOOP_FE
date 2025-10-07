import { getSpaceInfo } from '@/entities/space/api/space.ssr'
import { SpaceSyncProvider } from '@/entities/space'

export default async function SpaceDetailLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const spaceInfo = await getSpaceInfo(id)

  return (
    <>
      <SpaceSyncProvider spaceInfo={spaceInfo} />
      {children}
    </>
  )
}
