import { DashboardItem, SearchArchive } from '@/features/dashboard'

export const FlowSidebar = () => {
  return (
    <div className="w-82 h-[100vh] bg-white border-r border-gray-dark p-4 flex flex-col gap-2.5">
      <h1 className="text-2xl font-bold">스페이스 관리</h1>
      <SearchArchive />
      <DashboardItem
        title="뉴스 카드"
        content="뉴스 데이터를 표시합니다"
        createdAt="2025-01-01"
        nodeType="news"
      />
      <DashboardItem
        title="파일 카드"
        content="파일 데이터를 표시합니다"
        createdAt="2025-01-01"
        category="사회"
        nodeType="file"
      />
    </div>
  )
}
