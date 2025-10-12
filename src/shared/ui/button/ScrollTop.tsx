'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { tw } from '@/shared/lib/tw'

export const ScrollTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={tw(
        'fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff9354] text-white shadow-lg transition-all duration-300 hover:bg-[#ff9354]/90',
        show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      aria-label="맨 위로 이동">
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
