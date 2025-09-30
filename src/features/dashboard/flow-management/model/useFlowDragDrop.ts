'use client'

import { useCallback } from 'react'
import { useReactFlow, Node } from '@xyflow/react'
import { useDnD } from '../../dashboad-dnd'

interface UseFlowDragDropProps {
  setNodes: (updater: (nodes: Node[]) => Node[]) => void
  nodes: Node[]
}

export const useFlowDragDrop = ({ setNodes, nodes }: UseFlowDragDropProps) => {
  const { screenToFlowPosition } = useReactFlow()
  const { type, onDragOver } = useDnD()

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      if (!type) {
        return
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      // 유니크한 아이디로 생성되게 변경해야함
      const newNode = {
        id: String(nodes.length + 1),
        type: 'custom',
        position,
        data: {
          imageUrl: type.imageUrl,
          category: type.category,
          title: `새로운 ${type.title}`,
          content: `${type.title} 컨텐츠`,
          link: type.link,
          createdAt: new Date().toISOString().split('T')[0]
        }
      }

      setNodes(nds => nds.concat([newNode]))
    },
    [screenToFlowPosition, type, setNodes, nodes]
  )

  return {
    onDrop,
    onDragOver
  }
}
