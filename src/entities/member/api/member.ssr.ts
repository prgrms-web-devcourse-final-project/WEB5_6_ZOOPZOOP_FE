import { requireAuth } from '@/shared/lib/api-route'
import { fetchSpaceMemberServer } from './member.server'
import { SpaceMember } from '../model/type'

export const getSpaceMemberList = async (id: string): Promise<SpaceMember> => {
  const { data, msg, status } = await requireAuth(
    async token =>
      await fetchSpaceMemberServer(id, {
        token,
        next: { revalidate: 60, tags: ['space-member'] }
      })
  )

  if (status !== 200 || !data) {
    throw new Error(msg)
  }

  return data
}
