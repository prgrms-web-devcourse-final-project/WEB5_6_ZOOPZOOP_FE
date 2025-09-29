'use client'

import { useCallback } from 'react'
import { useReactFlow, Node } from '@xyflow/react'
import { useDnD } from '../../dashboad-dnd'

let id = 0
const getId = () => `dndnode_${id++}`

interface UseFlowDragDropProps {
  setNodes: (updater: (nodes: Node[]) => Node[]) => void
}

export const useFlowDragDrop = ({ setNodes }: UseFlowDragDropProps) => {
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

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: `${type} node`,
          nodeType: type,
          title: `새로운 ${type}`,
          content: `${type} 컨텐츠`,
          createdAt: new Date().toISOString().split('T')[0]
        }
      }

      setNodes(nds => nds.concat(newNode))
    },
    [screenToFlowPosition, type, setNodes]
  )

  return {
    onDrop,
    onDragOver
  }
}
