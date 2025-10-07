import { DashboardItem, SearchArchive } from '@/features/dashboard'
import { DashboardFile } from '@/entities/dashboard'
import { FlowCategory } from './FlowCategory'
import { Node } from '@xyflow/react'
import { useCategory } from '../model/useCategory'

interface Props {
  file: DashboardFile[]
  nodes: Node[]
}

export const FlowSidebar = ({ file, nodes }: Props) => {
  const { category, setCategory, data, search, setSearch, filteredData } =
    useCategory({
      nodes,
      file
    })

  return (
    <div className="w-90 h-[100vh] bg-white border-r-1 p-4 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">스페이스 관리</h1>
      <SearchArchive
        search={search}
        setSearch={setSearch}
      />
      <FlowCategory
        category={category}
        setCategory={setCategory}
      />
      <div className="overflow-y-auto flex flex-col gap-2">
        {(() => {
          const displayData = search === '' ? data : filteredData

          if (search !== '' && displayData.length === 0) {
            return <p className="text-gray-500">검색 결과가 없습니다.</p>
          }

          return displayData.map(item => (
            <DashboardItem
              key={item.dataSourceId}
              file={item}
            />
          ))
        })()}
      </div>
    </div>
  )
}
