import { DashboardItem } from '@/features/dashboard/dashboad-dnd'

export const FlowSidebar = () => {
  return (
    <div className="w-72 h-[100vh] bg-white border-r border-gray-dark p-4">
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
        imageUrl="/image.png"
        category="사회"
        nodeType="file"
      />
    </div>
  )
}
