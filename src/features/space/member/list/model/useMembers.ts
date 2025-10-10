import {
  useMembersQuery,
  usePendingMembersQuery
} from '@/entities/space/member/model/queries'

export const useMembers = (spaceId: string) => {
  const { data: members } = useMembersQuery(spaceId)
  const { data: pendingMembers } = usePendingMembersQuery(spaceId)

  return {
    members: members.members,
    pendingMembers: pendingMembers.invitedUsers
  }
}
