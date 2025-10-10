import { Authority } from '@/shared/types'
import { AuthorityType } from './type'
import { AUTHORITIES } from '@/shared/constants'

export const AUTHORITY_LABELS: Record<Authority, string> = {
  PENDING: 'pending',
  READ_ONLY: 'read only',
  READ_WRITE: 'member',
  ADMIN: 'admin'
} as const

export const spaceMemberAuthority: AuthorityType[] = [
  {
    role: AUTHORITIES.READ_ONLY,
    label: AUTHORITY_LABELS.READ_ONLY,
    description: '스페이스의 읽기 권한만 가진 사용자입니다.',
    permissions: ['공유 아카이브 자료 조회', '대시보드 조회']
  },
  {
    role: AUTHORITIES.READ_WRITE,
    label: AUTHORITY_LABELS.READ_WRITE,
    description: '스페이스를 편집할 수 있는 일반 멤버입니다.',
    permissions: [
      '읽기 권한의 모든 기능',
      '아카이브 자료 추가/수정/삭제',
      '대시보드 편집',
      '댓글 작성'
    ]
  },
  {
    role: AUTHORITIES.ADMIN,
    label: AUTHORITY_LABELS.ADMIN,
    description: '스페이스의 모든 권한을 가진 관리자입니다.',
    permissions: [
      '멤버의 모든 권한',
      '+ 팀원 초대/퇴출/권한 수정',
      '+ 스페이스 정보 수정/삭제'
    ]
  }
] as const
