import { getInitialSpaceList } from '@/entities/space/api/space.ssr'
import { SpaceList } from '@/features/space/space-list'

export default async function Space() {
  const initialData = await getInitialSpaceList()

  if (!initialData) return null

  return (
    <>
      <SpaceList initialData={initialData} />
    </>
  )
}
