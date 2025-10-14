'use client'

import { useMemo, useState } from 'react'
import '@xyflow/react/dist/style.css'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from '@xyflow/react'
import type {
  Connection,
  Edge,
  Node,
  EdgeChange,
  NodeChange
} from '@xyflow/react'

export function DemoFlow() {
  const initialNodes = useMemo<Node[]>(
    () => [
      {
        id: '1',
        position: { x: 0, y: 50 },
        data: { label: '수집' },
        type: 'input'
      },
      { id: '2', position: { x: 220, y: 50 }, data: { label: '정리' } },
      { id: '3', position: { x: 440, y: 50 }, data: { label: '공유' } },
      {
        id: '4',
        position: { x: 660, y: 50 },
        data: { label: '추천' },
        type: 'output'
      }
    ],
    []
  )
  const initialEdges = useMemo<Edge[]>(
    () => [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { strokeWidth: 2, stroke: '#94a3b8' }
      }
    ],
    []
  )

  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes(nds => applyNodeChanges(changes, nds))
  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges(eds => applyEdgeChanges(changes, eds))
  const onConnect = (params: Connection) => {
    setEdges(eds =>
      addEdge(
        {
          ...params,
          animated: true,
          style: { stroke: '#94a3b8', strokeWidth: 2 }
        },
        eds
      )
    )
  }

  return (
    <div className="relative mx-auto h-[60vh] max-w-6xl overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        className="!text-black">
        <MiniMap
          position="top-right"
          pannable
          zoomable
        />
        <Controls position="bottom-left" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
        />
      </ReactFlow>

      <div className="pointer-events-none absolute left-0 top-0 w-full p-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-600">
            노드를 드래그하고 선을 연결해 보세요.
          </p>
        </div>
      </div>
    </div>
  )
}
