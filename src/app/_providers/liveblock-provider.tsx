'use client'

import { ReactNode } from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense'

const LIVEBLOCKS_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      publicApiKey={LIVEBLOCKS_KEY as string}
      throttle={16}>
      <RoomProvider
        id="my-room"
        initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
