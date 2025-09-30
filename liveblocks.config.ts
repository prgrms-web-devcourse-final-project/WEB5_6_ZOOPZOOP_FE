declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null
    }
    Storage: {
      nodes: {
        id: string
        type: string
        position: { x: number; y: number }
        data: {
          imageUrl: string
          category: string
          title: string
          content: string
        }
      }[]

      edges: {
        id: string
        source: string
        target: string
      }[]
    }
    UserMeta: {
      id: string
      info: Record<string, never>
    }
    RoomEvent: Record<string, never>
    ThreadMetadata: Record<string, never>
    RoomInfo: Record<string, never>
  }
}

export {}
