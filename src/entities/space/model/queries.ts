import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'
import { SpacePagination } from './type'
import { fetchSpaceListClient, postSpaceClient } from '../api/space.client'

export interface SpaceQuery {
  pagination: { currentPage: number; size?: number; sort?: string[] }
  initialData?: SpacePagination
}
// 스페이스 목록 조회
export const useSpaceQuery = ({ pagination, initialData }: SpaceQuery) => {
  const { data, isPending } = useQuery({
    queryKey: ['space', pagination.currentPage],
    queryFn: () =>
      fetchSpaceListClient({
        page: pagination.currentPage,
        size: pagination.size,
        sort: pagination.sort
      }),
    initialData: initialData
  })

  return {
    spaces: data,
    isLoading: isPending
  }
}

type CreateSpaceResponse = {
  name: string
} | null

// 스페이스 생성
export const useCreateSpaceMutation = (
  options: Omit<
    UseMutationOptions<CreateSpaceResponse, Error, string>,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-space'],
    mutationFn: (payload: string) => postSpaceClient(payload),
    ...options
  })

  return {
    createSpace: mutate,
    isCreating: isPending
  }
}
