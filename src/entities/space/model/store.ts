import { create } from 'zustand'
import { Space } from './type'

interface SpaceStore {
  currentSpace: Space | null
  setCurrentSpace: (space: Space | null) => void
  updateSpace: (update: Partial<Space>) => void
}

export const useSpaceStore = create<SpaceStore>(set => ({
  currentSpace: null,
  setCurrentSpace: space => set({ currentSpace: space }),
  updateSpace: update =>
    set(state => ({
      currentSpace: state.currentSpace
        ? { ...state.currentSpace, ...update }
        : null
    }))
}))
