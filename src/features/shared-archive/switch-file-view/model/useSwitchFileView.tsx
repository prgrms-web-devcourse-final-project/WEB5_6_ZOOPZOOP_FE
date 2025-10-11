import { useState } from 'react'

export function useSwitchSpaceFileView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const onSwitchViewMode = () => {
    setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))
  }

  return { viewMode, onSwitchViewMode }
}
