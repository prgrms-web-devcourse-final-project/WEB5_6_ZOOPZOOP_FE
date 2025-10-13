'use client'

import { RefObject, useMemo, useRef, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  ConnectionMode
} from '@xyflow/react'
import type { OnNodesChange } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useFlowState } from '../model/useFlowState'
import { CustomFlowNode } from './CustomFlowNode'
import { useCursor, useFlowDragDrop } from '@/features/dashboard'
import { FlowSidebar } from '../../flow-sidebar'

import { Cursor } from './Cursor'
import { CommentOverlay, FlowItemContainer } from '../../flow-item'
import { DashboardFile } from '@/entities/dashboard'

const nodeTypes = {
  custom: CustomFlowNode
}

const defaultEdgeOptions = {
  style: {
    strokeWidth: 3,
    stroke: '#666'
  }
}

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: '#666',
  strokeDasharray: '8,4',
  animation: 'dashdraw 0.5s linear infinite'
}

const FlowDashboardContent = ({ file }: { file: DashboardFile[] }) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    setNodes
  } = useFlowState()

  const { onDrop, onDragOver } = useFlowDragDrop({ setNodes, nodes })
  const { others, handlePointerMove, handlePointerLeave } = useCursor()
  const { flowToScreenPosition, screenToFlowPosition } = useReactFlow()

  const [isCreating, setIsCreating] = useState(false)
  const [newCommentPosition, setNewCommentPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const flowContainerRef = useRef<HTMLDivElement | null>(null)

  // 사용자별 로컬 선택 상태
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleNodesChange: OnNodesChange = changes => {
    // select 변화는 로컬 선택 상태에만 반영
    const select = changes.filter(c => c.type === 'select')
    if (select.length) {
      setSelectedIds(prev => {
        const next = new Set(prev)
        for (const c of select) {
          if ('selected' in c) {
            if (c.selected) next.add(c.id)
            else next.delete(c.id)
          }
        }
        return next
      })
    }

    // 그 외 변화(이동/크기변경 등)만 공유 스토리지에 반영
    const other = changes.filter(c => c.type !== 'select')
    if (other.length) onNodesChange(other)
  }

  const nodesWithSelection = useMemo(
    () => nodes.map(n => ({ ...n, selected: selectedIds.has(n.id) })),
    [nodes, selectedIds]
  )

  const handlePaneClick = (event: React.MouseEvent) => {
    if (isCreating) {
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      setNewCommentPosition(flowPosition)
    }
  }
  return (
    <div className="flex w-full h-screen relative">
      <FlowSidebar
        file={file}
        nodes={nodes}
      />
      <div
        className="flex-1 relative overflow-hidden"
        ref={flowContainerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}>
        {others
          .filter(other => other.presence?.cursor !== null)
          .map(({ connectionId, presence, info }) => {
            if (!presence.cursor) return null
            const screenPosition = flowToScreenPosition({
              x: presence.cursor.x,
              y: presence.cursor.y
            })
            const bounds = flowContainerRef.current?.getBoundingClientRect()
            const x = bounds ? screenPosition.x - bounds.left : screenPosition.x
            const y = bounds ? screenPosition.y - bounds.top : screenPosition.y

            return (
              <Cursor
                key={connectionId}
                x={x}
                y={y}
                name={info?.name}
                color={`hsl(${(connectionId.toString().charCodeAt(0) * 137.5) % 360}, 70%, 50%)`}
              />
            )
          })}
        <ReactFlow
          nodes={nodesWithSelection}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          connectionMode={ConnectionMode.Loose}
          connectionRadius={60}
          fitView
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={handlePaneClick}
          zoomOnScroll={false}
          className={isCreating ? 'cursor-crosshair' : ''}>
          <MiniMap position="top-right" />
          <Controls position="top-left" />
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
          />
        </ReactFlow>

        <FlowItemContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
        />
        <CommentOverlay
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          newCommentPosition={newCommentPosition}
          setNewCommentPosition={setNewCommentPosition}
          containerRef={flowContainerRef as RefObject<HTMLDivElement>}
        />
      </div>
    </div>
  )
}

export const FlowDashboard = ({ file }: { file: DashboardFile[] }) => {
  return (
    <ReactFlowProvider>
      <FlowDashboardContent file={file} />
    </ReactFlowProvider>
  )
}
