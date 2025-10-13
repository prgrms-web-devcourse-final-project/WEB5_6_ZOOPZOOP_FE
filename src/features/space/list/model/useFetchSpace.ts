import { SpaceStatus, useSpaceQuery } from '@/entities/space'
import { useSearchParams } from 'next/navigation'

export const useFetchSpace = () => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const currentState = (searchParams.get('state') as SpaceStatus) || undefined

  const { spaces, isPending, isFetching } = useSpaceQuery({
    pagination: { currentPage, currentState }
  })

  return {
    spaces,
    isPending,
    isFetching
  }
}
