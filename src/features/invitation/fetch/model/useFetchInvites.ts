import { Invitation, useInvitationQuery } from '@/entities/invitation'
import { useEffect } from 'react'

export const useFetchInvitations = () => {
  const { data, isPending } = useInvitationQuery()

  useEffect(() => {
    // sse 구독
  }, [])

  return {
    isPending,
    invitations: (data ?? []) as Invitation[]
  }
}
