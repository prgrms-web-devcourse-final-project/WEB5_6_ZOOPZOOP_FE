import { SpacePagination, useSpaceQuery } from '@/entities/space'
import { useSearchParams } from 'next/navigation'

interface Props {
  initialData: SpacePagination
  initialPage: number
}

export const useFetchSpace = ({ initialData, initialPage }: Props) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { spaces, isPending, isFetching } = useSpaceQuery({
    pagination: { currentPage },
    initialData: currentPage === initialPage ? initialData : undefined
  })

  return {
    spaces,
    isPending,
    isFetching
  }
}
