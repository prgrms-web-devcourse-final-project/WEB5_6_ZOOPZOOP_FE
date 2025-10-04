'use client'

import { ReactNode } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'
import { Edge } from '@xyflow/react'

const LIVEBLOCKS_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY

const initialNodes = [
  {
    id: 'n1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: {
      imageUrl: '',
      category: 'input',
      title: '입력 노드',
      content: '기본 입력 노드입니다',
      createdAt: '2025-01-01'
    }
  }
]

const initialEdges: Edge[] = []

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      publicApiKey={LIVEBLOCKS_KEY as string}
      throttle={16}>
      <RoomProvider
        id="my-room"
        initialPresence={{ cursor: null }}
        initialStorage={{
          nodes: initialNodes,
          edges: initialEdges
        }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
