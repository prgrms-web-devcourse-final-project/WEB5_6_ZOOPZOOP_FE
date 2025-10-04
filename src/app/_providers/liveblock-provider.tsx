'use client'

import { ReactNode } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'
import { Edge } from '@xyflow/react'

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
      createdAt: '2025-01-01',
      link: '',
      user: {
        name: '',
        profileUrl: ''
      }
    }
  }
]

const initialEdges: Edge[] = []

export function Room({
  children,
  roomId = 'my-room'
}: {
  children: ReactNode
  roomId?: string
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}>
      <RoomProvider
        id={roomId}
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
