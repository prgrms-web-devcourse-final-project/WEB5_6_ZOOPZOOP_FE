import { create } from 'zustand'

interface NavbarState {
  isExpanded: boolean
  toggleNavbar: () => void
  setExpanded: (expanded: boolean) => void
}

export const useNavbarStore = create<NavbarState>(set => ({
  isExpanded: true,
  toggleNavbar: () => set(state => ({ isExpanded: !state.isExpanded })),
  setExpanded: expanded => set({ isExpanded: expanded })
}))
