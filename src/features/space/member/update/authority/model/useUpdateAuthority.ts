import {
  memberQueryKeys,
  SpaceAuthorityChangeRequest,
  useUpdateAuthorityMutation
} from '@/entities/space'
import { showErrorToast, showSuccessToast } from '@/shared/ui/toast/Toast'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateAuthority = (spaceId: string) => {
  const queryClient = useQueryClient()
  // tanstack query
  const { isUpdating, mutateUpdateAuthority, isError, isSuccess } =
    useUpdateAuthorityMutation({
      onSuccess: () => {
        // 성공 로직 필요
        showSuccessToast('권한 변경')
      },
      onError: error => {
        showErrorToast(error.message)
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: memberQueryKeys.list(spaceId)
        })
      }
    })

  // 권한 선택
  const handleSelect = (params: SpaceAuthorityChangeRequest) => {
    mutateUpdateAuthority(params)
  }

  return {
    handleSelect,
    isUpdating,
    isSuccess,
    isError
  }
}
