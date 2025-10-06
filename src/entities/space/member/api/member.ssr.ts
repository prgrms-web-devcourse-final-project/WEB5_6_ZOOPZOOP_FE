import { requireAuth } from '@/shared/lib/api-route'
import { SpaceMember, SpacePendingMember } from '../model/type'
import {
  fetchSpaceMemberServer,
  fetchSpacePendingMemberServer
} from './member.server'

export const getSpaceMemberList = async (id: string): Promise<SpaceMember> => {
  const { data, msg, status } = await requireAuth(
    async token =>
      await fetchSpaceMemberServer(id, {
        token,
        next: { revalidate: 60, tags: ['space-m'] }
      })
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}

// 초대 중엔 맴버 리스트 불러오기
export const getSpacePendingMemberList = async (
  id: string
): Promise<SpacePendingMember> => {
  const { data, msg, status } = await requireAuth(
    async token =>
      await fetchSpacePendingMemberServer(id, {
        token,
        next: { revalidate: 60, tags: ['space-member-pending', id] }
      })
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}

// 초대용 - Server Action에서 사용
export const inviteSpaceMemberAPI = async (spaceId: string) => {
  const { data, msg, status } = await requireAuth(
    async token => await fetchSpacePendingMemberServer(spaceId, { token })
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}
