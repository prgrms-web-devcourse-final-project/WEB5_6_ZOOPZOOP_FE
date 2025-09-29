'use client'

import { News } from '@/entities/news'
import { create } from 'zustand'

interface DashboardStore {
  type: News | null
  setType: (type: News | null) => void
}

export const useDashboardStore = create<DashboardStore>(set => ({
  type: null,
  setType: type => set({ type })
}))
