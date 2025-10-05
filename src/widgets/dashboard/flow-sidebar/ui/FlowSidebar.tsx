import { DashboardItem, SearchArchive } from '@/features/dashboard'
import { DashboardFile } from '@/entities/dashboard'
import { FlowCategory } from './FlowCategory'

interface Props {
  file: DashboardFile[]
}

export const FlowSidebar = ({ file }: Props) => {
  return (
    <div className="w-90 h-[100vh] bg-white border-r border-gray-dark p-4 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">스페이스 관리</h1>
      <SearchArchive />
      <FlowCategory />
      <div className="overflow-y-auto">
        {file.map(item => (
          <DashboardItem
            key={item.dataSourceId}
            file={item}
          />
        ))}
      </div>
    </div>
  )
}
