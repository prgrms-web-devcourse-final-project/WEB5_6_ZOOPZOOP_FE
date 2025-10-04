import { Room } from '@/app/_providers'
import { fetchDashboardFolderClient } from '@/entities/dashboard'
import { FlowDashboard } from '@/widgets/dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대시보드',
  description: '플로우 기반 대시보드'
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const roomId = `space_${id}`

  const folder = await fetchDashboardFolderClient()

  return (
    <Room roomId={roomId}>
      <FlowDashboard />
    </Room>
  )
}
