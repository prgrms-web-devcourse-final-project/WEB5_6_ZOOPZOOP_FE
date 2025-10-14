'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

type ColumnSpec = { images: string[]; speed: number }

export function Hero({
  columns,
  height = 180, // vh
  repeat = 6, // 이미지 반복 배수(짝수 권장)
  gap = 16, // px
  itemHeight = 240, // 각 이미지 높이(px) — 밀도 조절
  fallbackSrc = 'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/default_space_image'
}: {
  columns: ColumnSpec[]
  height?: number
  repeat?: number
  gap?: number
  itemHeight?: number
  fallbackSrc?: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    if (!containerRef.current || reduceMotion) return

    const ctx = gsap.context(() => {
      const colEls = gsap.utils.toArray<HTMLElement>('.gsap-col')

      colEls.forEach(col => {
        const speed = Number(col.dataset.speed || '0.6')
        // 반복 배수 기준으로 래핑 높이를 계산해 끊김 방지
        const wrapHeight = col.scrollHeight / repeat
        gsap.set(col, { y: 0, willChange: 'transform' })
        const wrap = gsap.utils.wrap(-wrapHeight, 0)

        ScrollTrigger.create({
          trigger: containerRef.current!,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: self => {
            const y = wrap(-self.scroll() * speed)
            gsap.set(col, { y })
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reduceMotion, repeat])

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ height: `${height}vh` }}>
      <div
        ref={containerRef}
        className="mx-auto flex h-full w-full items-stretch"
        style={{ gap }}>
        {columns.map((col, i) => {
          // 무한 루프 이음새 제거: 이미지 배열을 repeat 배수만큼 복제
          const list = Array(Math.max(2, repeat)).fill(col.images).flat()
          return (
            <div
              key={i}
              className="gsap-col relative flex basis-0 grow flex-col overflow-hidden"
              data-speed={col.speed}
              aria-hidden>
              {list.map((src, idx) => (
                <Image
                  key={`${i}-${idx}`}
                  src={src}
                  width={320}
                  height={itemHeight}
                  loading={idx > 2 ? 'lazy' : 'eager'}
                  className="mb-4 block w-full select-none will-change-transform object-cover"
                  style={{ height: `${itemHeight}px` }}
                  alt=""
                  onError={e => {
                    const img = e.currentTarget as unknown as HTMLImageElement
                    if (img.src !== fallbackSrc) {
                      img.src = fallbackSrc
                    }
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
