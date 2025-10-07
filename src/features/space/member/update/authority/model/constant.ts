import { Authority } from '@/shared/types'
import { AuthorityType } from './type'
import { AUTHORITIES } from '@/shared/constants'

export const AUTHORITY_LABELS: Record<Authority, string> = {
  PENDING: 'Pending',
  READ_ONLY: 'Member',
  READ_WRITE: 'Admin',
  ADMIN: 'Owner'
} as const

export const spaceMemberAuthority: AuthorityType[] = [
  {
    role: AUTHORITIES.READ_ONLY,
    label: AUTHORITY_LABELS.READ_ONLY,
    description: '읽기 전용 권한을 가진 사용자입니다.',
    permissions: ['자료 읽기', '대시보드 접근 및 조회']
  },
  {
    role: AUTHORITIES.READ_WRITE,
    label: AUTHORITY_LABELS.READ_WRITE,
    description: '자료를 읽고 쓸 수 있는 일반 사용자입니다.',
    permissions: ['자료 등록 및 삭제', '대시보드 조작', '댓글 작성']
  },
  {
    role: AUTHORITIES.ADMIN,
    label: AUTHORITY_LABELS.ADMIN,
    description: '스페이스의 모든 권한을 가진 관리자입니다.',
    permissions: [
      '팀원 초대 및 퇴출',
      '스페이스 삭제',
      '모든 자료 등록/수정/삭제',
      '대시보드 전체 관리'
    ]
  }
] as const
