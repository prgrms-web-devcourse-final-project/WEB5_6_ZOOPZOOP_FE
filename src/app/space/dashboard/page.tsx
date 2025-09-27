'use client'

import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } }
]
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]

export default function Page() {
  return (
    <div className="w-full h-full flex-center">
      <div className="w-full h-[100vh]">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView>
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
