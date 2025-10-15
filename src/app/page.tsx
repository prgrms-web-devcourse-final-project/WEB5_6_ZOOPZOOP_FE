'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Image from 'next/image'

import { Hero } from '@/app/_main/Hero'
import { Teaser } from '@/app/_main/Teaser'
import { Services } from '@/app/_main/Services'

import { DemoFlow } from '@/app/_main/DemoFlow'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function ArchiveScrollPage() {
  const [showScrollArrow, setShowScrollArrow] = useState(true)

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 0.8,
      speed: 1.2,
      effects: true,
      smoothTouch: 0.1,
      onUpdate: self => {
        const progress = self.progress || 0
        // 페이지 하단 20% 이내면 화살표 숨김
        if (progress > 0.8) {
          setShowScrollArrow(false)
        } else {
          setShowScrollArrow(true)
        }
      }
    })

    const features = gsap.utils.toArray<HTMLElement>('.feature')
    features.forEach((el, i) => {
      const img = el.querySelector('.feature__image')
      const txt = el.querySelector('.feature__text')
      const fromXImg = i % 2 === 0 ? -60 : 60
      const fromXTxt = i % 2 === 0 ? 60 : -60

      gsap.fromTo(
        img,
        { x: fromXImg, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 75%' }
        }
      )
      gsap.fromTo(
        txt,
        { x: fromXTxt, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: { trigger: el, start: 'top 75%' }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      smoother.kill()
    }
  }, [])

  return (
    <div
      id="wrapper"
      className="overflow-hidden bg-[#f8fafc] text-[#0b0b0b]">
      <div id="content">
        <Hero />
        <Teaser />
        <Services />

        <section className="flow-demo border-t border-neutral-200 bg-white py-16 md:py-24 text-[#0b0b0b]">
          <div className="mx-auto mb-8 max-w-6xl px-5">
            <h2 className="text-3xl font-semibold md:text-4xl">
              ZoopZoop Flow
            </h2>
            <p className="mt-2 text-neutral-600">
              수집 → 정리 → 공유 → 추천 흐름을 직접 드래그하고 연결해 보세요.
            </p>
          </div>
          <DemoFlow />
        </section>
      </div>

      {showScrollArrow && (
        <Image
          className="fixed bottom-4 left-1/2 w-12 -translate-x-1/2 opacity-80 transition-opacity duration-300"
          src="https://img.icons8.com/glyph-neue/128/000000/circled-down-2.png"
          alt="scroll down"
          loading="lazy"
          width={48}
          height={48}
        />
      )}
    </div>
  )
}
