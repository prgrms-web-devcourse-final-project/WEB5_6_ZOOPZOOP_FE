'use client'
import { DashboardItem, SearchArchive } from '@/features/dashboard'
import { DashboardFile } from '@/entities/dashboard'
import { FlowCategory } from './FlowCategory'
import { Node } from '@xyflow/react'
import { useCategory } from '../model/useCategory'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'
import { useSpaceStore } from '@/entities/space'

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
  const router = useRouter()
  const { currentSpace } = useSpaceStore()

  return (
    <div className="w-90 h-[100vh] bg-white border-r-1 p-4 flex flex-col gap-3">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            router.back()
          }}>
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {currentSpace?.spaceName}
        </h1>
      </div>

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
