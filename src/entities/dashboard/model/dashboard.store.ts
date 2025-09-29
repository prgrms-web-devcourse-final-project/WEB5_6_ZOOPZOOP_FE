'use client'

import { create } from 'zustand'

interface DashboardStore {
  type: string | null
  setType: (type: string | null) => void
}

export const useDashboardStore = create<DashboardStore>(set => ({
  type: null,
  setType: type => set({ type })
}))
