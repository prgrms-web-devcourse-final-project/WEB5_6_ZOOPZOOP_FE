'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const COLS = 6
const IMG =
  'https://images.unsplash.com/photo-1483213097419-365e22f0f258?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'

export default function ArchiveScrollPage() {
  useEffect(() => {
    // ScrollSmoother 생성
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1.5,
      speed: 2,
      effects: true
    })

    // 각 이미지 컬럼에 패럴랙스 속도 차 적용
    smoother.effects('.hero__image-cont', {
      speed: () => gsap.utils.random(0.55, 0.85, 0.05)
    })

    // 첫 등장 시 스와이프 애니메이션
    gsap.set('.anim-swipe', { yPercent: 0 })
    gsap.to('.anim-swipe', {
      yPercent: 300,
      delay: 0.2,
      duration: 3,
      stagger: { from: 'random', each: 0.1 },
      ease: 'sine.out'
    })

    // 이미지 확대 + x축 미세 이동 (스크롤 연동)
    gsap.to('.slice', {
      scale: 1.5,
      xPercent: 20,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=3000',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      smoother.kill()
    }
  }, [])

  return (
    <div
      id="wrapper"
      className="overflow-hidden bg-[#111111] text-white">
      <div id="content">
        <section className="hero h-screen">
          <div className="hero__inner grid h-full w-screen grid-cols-6 gap-0">
            {Array.from({ length: COLS }).map((_, i) => (
              <div
                key={i}
                className="hero__image-cont relative overflow-hidden">
                <div
                  className="slice absolute inset-[-1px] bg-cover bg-no-repeat will-change-transform"
                  style={{
                    backgroundImage: `url(${IMG})`,
                    backgroundSize: `${COLS * 100}% 100%`,
                    backgroundPosition: `${(i / (COLS - 1)) * 100}% 50%`,
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
                <div className="anim-swipe absolute inset-0 bg-[#111111]" />
                {i !== COLS - 1 && (
                  <div className="absolute right-0 top-0 z-[2] h-full w-[2.5px] bg-[#111111]" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="h-[300vh]" />
      </div>

      <Image
        className="fixed bottom-4 left-1/2 w-12 -translate-x-1/2 opacity-80"
        src="https://img.icons8.com/glyph-neue/128/ffffff/circled-down-2.png"
        alt="scroll down"
        loading="lazy"
        width={48}
        height={48}
      />
    </div>
  )
}
