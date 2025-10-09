// 스페이스 맴버 tanstack query 키 관리 상수
export const memberQueryKeys = {
  list: (spaceId: number | string) => ['space-members', spaceId],
  pending: (spaceId: number | string) => ['space-pending-members', spaceId]
}
