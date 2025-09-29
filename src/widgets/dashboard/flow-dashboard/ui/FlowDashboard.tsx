'use client'

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

  const { onDrop, onDragOver } = useFlowDragDrop({ setNodes })
  const { others, handlePointerMove, handlePointerLeave } = useCursor()
  const { flowToScreenPosition } = useReactFlow()

  return (
    <div className="flex w-full h-screen">
      {others
        .filter(other => other.presence?.cursor !== null)
        .map(({ connectionId, presence }) => {
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
            />
          )
        })}
      <FlowSidebar />
      <div
        className="flex-1"
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
          onDragOver={onDragOver}>
          <MiniMap position="top-right" />
          <Controls />
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
          />
        </ReactFlow>
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
