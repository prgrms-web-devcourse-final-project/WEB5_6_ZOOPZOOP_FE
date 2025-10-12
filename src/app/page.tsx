'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Image from 'next/image'
import { Hero } from '@/app/_main/Hero'
import { Teaser } from '@/app/_main/Teaser'
import { Services } from '@/app/_main/Services'
import { CTA } from '@/app/_main/CTA'
import { DemoFlow } from '@/app/_main/DemoFlow'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const COLS = 6
const IMG =
  'https://images.unsplash.com/photo-1483213097419-365e22f0f258?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'

export default function ArchiveScrollPage() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1.2,
      speed: 1.6,
      effects: true
    })

    gsap.set('.anim-swipe', { yPercent: 0 })
    gsap.to('.anim-swipe', {
      yPercent: 300,
      delay: 0.2,
      duration: 2.4,
      stagger: { from: 'random', each: 0.08 },
      ease: 'sine.out'
    })

    const cols = gsap.utils.toArray<HTMLElement>('.hero__image-cont')
    cols.forEach((col, i) => {
      smoother.effects(col, { speed: i % 2 === 0 ? 0.6 : 0.85, lag: 0.12 })
    })
    cols.forEach((col, i) => {
      const slice = col.querySelector('.slice')
      if (!slice) return
      gsap.to(slice, {
        yPercent: i % 2 === 0 ? -10 : 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=2200',
          scrub: true
        }
      })
    })
    gsap.to('.slice', {
      scale: 1.35,
      xPercent: 14,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=2200',
        scrub: true
      }
    })

    const cards = gsap.utils.toArray<HTMLElement>('.teaser__card')
    cards.forEach(c => gsap.set(c, { autoAlpha: 0, scale: 0.98, y: 20 }))
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.teaser',
          start: 'top top',
          end: '+=1800',
          scrub: true,
          pin: true
        }
      })
      .to(cards[0], {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.33,
        ease: 'power2.out'
      })
      .to(
        cards[0],
        { autoAlpha: 0, y: -20, duration: 0.25, ease: 'power2.in' },
        '+=0.25'
      )
      .to(cards[1], {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.33,
        ease: 'power2.out'
      })
      .to(
        cards[1],
        { autoAlpha: 0, y: -20, duration: 0.25, ease: 'power2.in' },
        '+=0.25'
      )
      .to(cards[2], {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.33,
        ease: 'power2.out'
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
        <Hero
          imageUrl={IMG}
          cols={COLS}
        />
        <Teaser />
        <Services />
        <CTA />
        <section className="flow-demo border-t border-neutral-200 bg-white py-24 text-[#0b0b0b]">
          <div className="mx-auto mb-8 max-w-6xl px-5">
            <h2 className="text-3xl font-semibold md:text-4xl">
              ZoopZoop Flow 데모
            </h2>
            <p className="mt-2 text-neutral-600">
              수집 → 정리 → 공유 → 추천 흐름을 직접 드래그하고 연결해 보세요.
            </p>
          </div>
          <DemoFlow />
        </section>
      </div>

      <Image
        className="fixed bottom-4 left-1/2 w-12 -translate-x-1/2 opacity-80"
        src="https://img.icons8.com/glyph-neue/128/000000/circled-down-2.png"
        alt="scroll down"
        loading="lazy"
        width={48}
        height={48}
      />
    </div>
  )
}
