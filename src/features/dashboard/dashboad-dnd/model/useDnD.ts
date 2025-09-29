'use client'

import { useDashboardStore } from '@/entities/dashboard'
import { DragEvent, useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { News } from '@/entities/news'

export const useDnD = () => {
  const [type, setType] = useDashboardStore(
    useShallow(state => [state.type, state.setType])
  )

  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, nodeType: News) => {
      setType(nodeType)
      event.dataTransfer.setData('text/plain', String(JSON.stringify(nodeType)))
      event.dataTransfer.effectAllowed = 'move'
    },
    [setType]
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  return {
    type,
    onDragStart,
    onDragOver
  }
}
