'use client'

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useFlowState } from '../model/useFlowState'
import { CustomFlowNode } from './CustomFlowNode'

const nodeTypes = {
  custom: CustomFlowNode
}

export const FlowDashboard = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete
  } = useFlowState()

  return (
    <div className="w-full h-full flex-center">
      <div className="w-full h-[100vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}>
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
