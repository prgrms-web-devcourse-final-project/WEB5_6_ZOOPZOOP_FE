import {
  SpaceAuthorityChangeRequest,
  useUpdateAuthorityMutation
} from '@/entities/space'
import { showErrorToast } from '@/shared/ui/toast/Toast'

export const useUpdateAuthority = () => {
  // tanstack query
  const { isUpdating, mutateUpdateAuthority } = useUpdateAuthorityMutation({
    onSuccess: () => {
      // 성공 로직 필요
    },
    onError: error => {
      showErrorToast(error.message)
    }
  })

  // 권한 선택
  const handleSelect = (params: SpaceAuthorityChangeRequest) => {
    mutateUpdateAuthority(params)
  }

  return {
    handleSelect,
    isUpdating
  }
}
