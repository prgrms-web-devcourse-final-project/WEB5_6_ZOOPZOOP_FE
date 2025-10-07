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

  // 폴더 데이터 조회
  const folderData = await requireAuth(token =>
    fetchDashboardFolderServer(id, { token })
  )

  if (folderData.status !== 200) throw new Error(folderData.msg)

  // 파일 데이터 한번에 조회

  const fileData = await requireAuth(async token => {
    const responses = await Promise.all(
      (folderData.data ?? []).map(folder => {
        return fetchDashboardFileServer(folder.folderId.toString(), { token })
      })
    )

    const merged = responses.flatMap(r => r.data ?? [])
    return { status: 200, msg: 'ok', data: merged }
  })

  return (
    <Room roomId={roomId}>
      <FlowDashboard file={fileData.data?.[0].files ?? []} />
    </Room>
  )
}
