import { Room } from '@/app/_providers'
import {
  fetchDashboardFileServer,
  fetchDashboardFolderServer
} from '@/entities/dashboard'
import { requireAuth } from '@/shared/lib/api-route'
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

  const { status, data, msg } = await requireAuth(token =>
    fetchDashboardFolderServer(id, { token })
  )

  if (status !== 200) throw new Error(msg)

  const fileData = await requireAuth(async token => {
    const responses = await Promise.all(
      (data ?? []).map(folder =>
        fetchDashboardFileServer(folder.folderId.toString(), { token })
      )
    )
    const merged = responses.flatMap(r => r.data ?? [])
    return { status: 200, msg: 'ok', data: merged }
  })

  return (
    <Room roomId={roomId}>
      <FlowDashboard file={fileData.data ?? []} />
    </Room>
  )
}
