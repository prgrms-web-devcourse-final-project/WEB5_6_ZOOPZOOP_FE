import { getInitialSpaceList } from '@/entities/space/api/space.ssr'
import { SpaceList } from '@/features/space/list'

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Space({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Number(params?.page) || 1
  const initialData = await getInitialSpaceList({ page: currentPage })

  if (!initialData) return null

  return (
    <div className="p-8">
      <SpaceList
        initialData={initialData}
        initialPage={currentPage}
      />
    </div>
  )
}
