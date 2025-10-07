import { Authority } from '@/shared/types'
import { AUTHORITY_LABELS } from './constant'

// 서버 권한과 프론트 권한 이름 매핑
export const getAuthorityLabel = (role: Authority): string => {
  return AUTHORITY_LABELS[role]
}
