import { SpaceCard, SpacePagination } from '@/entities/space'
import Pagination from '@/shared/ui/pagination/Pagination'
import { useSearchParams } from 'next/navigation'
import { useSpaceQuery } from '../hook/useSpaceQuery'

interface Props {
  initialData: SpacePagination
}
const SpaceList = ({ initialData }: Props) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { data: spaceList, isPending } = useSpaceQuery({
    pagination: { currentPage },
    initialData
  })

  if (isPending) return null

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaceList &&
          spaceList.spaces.map(space => (
            <li key={space.id}>
              <SpaceCard {...space} />
            </li>
          ))}
      </ul>
      <Pagination totalPages={spaceList?.totalPages} />
    </>
  )
}
export default SpaceList
