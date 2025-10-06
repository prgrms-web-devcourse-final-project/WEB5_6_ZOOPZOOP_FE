'use client'

import { DashboardFile } from '@/entities/dashboard'
import { Node } from '@xyflow/react'
import { useMemo, useState } from 'react'

export const useCategory = ({
  nodes,
  file
}: {
  nodes: Node[]
  file: DashboardFile[]
}) => {
  const [category, setCategory] = useState('미생성')
  const [search, setSearch] = useState('')

  const data = useMemo(() => {
    if (category === '미생성') {
      return file.filter(
        node =>
          !nodes.map(item => item.data.link).includes(node.sourceUrl as string)
      )
    }
    return file.filter(node =>
      nodes.map(item => item.data.link).includes(node.sourceUrl as string)
    )
  }, [file, category, nodes])

  const filteredData = useMemo(() => {
    return data.filter(item => item.title.includes(search))
  }, [data, search])

  return {
    category,
    setCategory,
    data,
    search,
    setSearch,
    filteredData
  }
}
