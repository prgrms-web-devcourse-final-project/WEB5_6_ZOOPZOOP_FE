import {
  useMembersQuery,
  usePendingMembersQuery
} from '@/entities/space/member/model/queries'

export const useMembers = (spaceId: number) => {
  const { data: members } = useMembersQuery(spaceId)
  const { data: pendingMembers } = usePendingMembersQuery(spaceId)

  return {
    members: members.members,
    pendingMembers: pendingMembers.invitedUsers
  }
}
