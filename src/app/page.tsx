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

const HERO_COLUMNS = [
  {
    speed: 0.45,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/The_Verge_logo_2016.svg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/BBC_News_2022_%28Alt%29.svg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/TechCrunch_logo.svg'
    ]
  },
  {
    speed: 0.6,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Medium_logo_Monogram.svg',
      'https://static.toss.im/illusts/logo-toss-tech.png',
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Substack_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/4/48/Naver_Blog_Icon_2022.svg'
    ]
  },
  {
    speed: 0.75,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Notion-logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9c/OpenAI_Logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/GitHub_logo_2013.svg',
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Google_News_icon.svg'
    ]
  },
  {
    speed: 0.55,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Vercel_logo_black.svg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Stack_Overflow_logo.svg'
    ]
  },
  {
    speed: 0.7,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Product_Hunt_Logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/9/91/Dev.to_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/4/45/Hacker_News_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4e/Reddit_logo_new.svg'
    ]
  },
  {
    speed: 0.5,
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/24/YouTube_logo_%282013-2017%29.png',
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Twitter_logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/5/51/LinkedIn_Logo.svg',
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Medium_logo_wordmark.svg'
    ]
  }
]

export default function ArchiveScrollPage() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1.2,
      speed: 1.6,
      effects: true
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
          columns={HERO_COLUMNS}
          height={400}
          gap={16}
          repeat={8}
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
