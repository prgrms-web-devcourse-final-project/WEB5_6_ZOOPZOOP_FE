'use client'

import { BaseNewsCard } from '@/shared/ui/card'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  {
    id: 'n1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Node 1',
      image: '/image.png',
      createdAt: '2025.01.01',
      content: 'Node 1',
      title: 'Node 1'
    }
  },
  {
    id: 'n2',
    type: 'custom',
    position: { x: 0, y: 500 },
    data: {
      label: 'Node 2',
      image: '/image.png',
      createdAt: '2025.01.01',
      content: 'Node 2',
      title: 'Node 2'
    }
  }
]

const nodeTypes = {
  custom: ({
    data
  }: {
    data: {
      image: string
      createdAt: string
      content: string
      title: string
    }
  }) => (
    <BaseNewsCard
      title={data.title}
      content={data.content}
      imageUrl={data.image}
      createdAt={data.createdAt}
      type="flow"
    />
  )
}

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]

export default function Page() {
  return (
    <div className="w-full h-full flex-center">
      <div className="w-full h-[100vh]">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
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
