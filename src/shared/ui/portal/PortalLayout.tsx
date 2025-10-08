'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
  containerId?: string
  lockScroll?: boolean
}

// 유틸 함수
const getOrCreatePortalElement = (containerId: string): HTMLElement => {
  const existing = document.getElementById(containerId)
  if (existing) return existing

  const element = document.createElement('div')
  element.id = containerId
  document.body.appendChild(element)
  return element
}

export const PortalLayout = ({
  children,
  containerId = 'portal-root',
  lockScroll = false
}: Props) => {
  const [mounted, setMounted] = useState<boolean>(false)
  const portalRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const portalElement = getOrCreatePortalElement(containerId)
    portalRef.current = portalElement
    setMounted(true)

    if (lockScroll) {
      const originalOverflow = document.body.style.overflow
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = ''
      }
    }
  }, [containerId, lockScroll])

  if (!mounted || !portalRef.current) {
    return null
  }

  return createPortal(children, portalRef.current)
}
