'use client'

import { useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useFlowState } from '../model/useFlowState'
import { CustomFlowNode } from './CustomFlowNode'
import { useCursor, useFlowDragDrop } from '@/features/dashboard'
import { FlowSidebar } from '../../flow-sidebar'

import { Cursor } from './Cursor'
import { CommentOverlay, FlowItemContainer } from '../../flow-item'

const nodeTypes = {
  custom: CustomFlowNode
}

const FlowDashboardContent = () => {
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

  const handlePaneClick = (event: React.MouseEvent) => {
    if (isCreating) {
      const reactFlowBounds = (event.target as Element)
        .closest('.react-flow')
        ?.getBoundingClientRect()

      if (reactFlowBounds) {
        const flowPosition = screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top
        })

        setNewCommentPosition(flowPosition)
      }
    }
  }

  return (
    <div className="flex w-full h-screen relative">
      {others
        .filter(other => other.presence?.cursor !== null)
        .map(({ connectionId, presence, info }) => {
          if (!presence.cursor) return null
          const screenPosition = flowToScreenPosition({
            x: presence.cursor.x,
            y: presence.cursor.y
          })

          return (
            <Cursor
              key={connectionId}
              x={screenPosition.x}
              y={screenPosition.y}
              name={info?.name}
              color={`hsl(${(connectionId.toString().charCodeAt(0) * 137.5) % 360}, 70%, 50%)`}
            />
          )
        })}
      <FlowSidebar />
      <div
        className="flex-1 relative"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={handlePaneClick}
          minZoom={0.6}
          maxZoom={0.6}
          zoomOnScroll={false}
          className={isCreating ? 'cursor-crosshair' : ''}>
          <MiniMap position="top-right" />
          <Controls />
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
        />
      </div>
    </div>
  )
}

export const FlowDashboard = () => {
  return (
    <ReactFlowProvider>
      <FlowDashboardContent />
    </ReactFlowProvider>
  )
}
