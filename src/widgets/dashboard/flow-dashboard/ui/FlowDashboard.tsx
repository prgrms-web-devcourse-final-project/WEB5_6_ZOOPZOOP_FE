'use client'

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useFlowState } from '../model/useFlowState'
import { CustomFlowNode } from './CustomFlowNode'
import { useFlowDragDrop } from '@/features/dashboard'
import { FlowSidebar } from '../../flow-sidebar'

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

  return (
    <div className="flex w-full h-screen">
      <FlowSidebar />
      <div className="flex-1">
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
