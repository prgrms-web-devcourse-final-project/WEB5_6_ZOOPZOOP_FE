import { DashboardItem, SearchArchive } from '@/features/dashboard'
import { DashboardFile } from '@/entities/dashboard'

interface Props {
  file: DashboardFile[]
}

export const FlowSidebar = ({ file }: Props) => {
  return (
    <div className="w-82 h-[100vh] bg-white border-r border-gray-dark p-4 flex flex-col gap-2.5">
      <h1 className="text-2xl font-bold">스페이스 관리</h1>
      <SearchArchive />
      {file.map(item => (
        <DashboardItem
          key={item.dataSourceId}
          file={item}
        />
      ))}
    </div>
  )
}
