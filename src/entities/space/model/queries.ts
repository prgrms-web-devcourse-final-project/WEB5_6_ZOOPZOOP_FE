import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query'
import { SpacePagination } from './type'
import {
  deleteSpaceClient,
  fetchSpaceListClient,
  postSpaceClient,
  updateSpaceNameClient
} from '../api/space.client'

interface SpaceQuery {
  pagination: { currentPage: number; size?: number; sort?: string[] }
  initialData?: SpacePagination
}
// 스페이스 목록 조회
export const useSpaceQuery = ({ pagination, initialData }: SpaceQuery) => {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['space', pagination.currentPage],
    queryFn: () =>
      fetchSpaceListClient({
        page: pagination.currentPage,
        size: pagination.size,
        sort: pagination.sort
      }),
    initialData: initialData,
    placeholderData: keepPreviousData
  })

  return {
    spaces: data,
    isPending,
    isFetching
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

// 스페이스 삭제
export const useDeleteSpaceMutation = (
  options: Omit<
    UseMutationOptions<void, Error, number>,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-space'],
    mutationFn: (spaceId: number) => deleteSpaceClient(spaceId),
    ...options
  })

  return {
    deleteSpace: mutate,
    isDeleting: isPending
  }
}

type EditSpaceResponse = {
  name: string
}

// 스페이스 이름 수정
export const useEditSpaceNameMutation = (
  options: Omit<
    UseMutationOptions<
      EditSpaceResponse,
      Error,
      {
        spaceId: number
        name: string
      }
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['edit-space'],
    mutationFn: ({ name, spaceId }: { spaceId: number; name: string }) =>
      updateSpaceNameClient(spaceId, name),
    ...options
  })

  return {
    editSpaceName: mutate,
    isUpdating: isPending
  }
}
