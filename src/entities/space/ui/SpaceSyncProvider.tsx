'use client'

import { useEffect } from 'react'
import { Space } from '../model'
import { useSpaceStore } from '../model/store'

interface Props {
  spaceInfo: Space | null
}

export const SpaceSyncProvider = ({ spaceInfo }: Props) => {
  const setCurrentSpace = useSpaceStore(state => state.setCurrentSpace)

  // 서버에서 받은 데이터를 전역 상태에 동기화
  useEffect(() => {
    setCurrentSpace(spaceInfo)

    // 페이지 떠날 때 정리 (선택사항)
    return () => setCurrentSpace(null)
  }, [spaceInfo, setCurrentSpace])

  return null
}
