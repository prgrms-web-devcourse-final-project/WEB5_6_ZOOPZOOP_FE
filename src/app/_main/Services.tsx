'use client'

import Image from 'next/image'
import { tw } from '@/shared/lib/tw'

export function Services() {
  const items = [
    {
      title: '웹에서 바로 수집',
      desc: '크롬 확장 프로그램으로 웹 페이지의 원하는 부분을 바로 저장하고, 제목·요약·태그를 자동으로 생성합니다.',
      bullets: [
        '웹에서 텍스트/이미지 선택 저장',
        '자동 요약 및 태그 추천',
        'URL 직접 추가 지원'
      ],
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: '나만의 아카이브',
      desc: '폴더와 태그로 구조적으로 관리하고, 대시보드에서 수집한 정보를 카드 형태로 빠르게 찾아볼 수 있습니다.',
      bullets: ['폴더 기반 분류', '검색 및 필터링', '카드형 대시보드 UI'],
      img: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: '함께 쓰는 스페이스',
      desc: '팀원과 아카이브를 공유하고, 실시간으로 의견을 나누며 콘텐츠를 함께 정리합니다.',
      bullets: [
        '팀 초대 및 권한 관리',
        '댓글 및 의견 스레드',
        '보드형 브레인스토밍'
      ],
      img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'AI 추천 & 탐색',
      desc: '수집한 태그와 관심사를 기반으로 새로운 콘텐츠를 추천하고, 트렌드를 빠르게 발견합니다.',
      bullets: ['태그 기반 맞춤 추천', '뉴스 API 연동', '실시간 트렌드 반영'],
      img: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=2070&auto=format&fit=crop'
    }
  ]

  return (
    <section
      id="benefits"
      className="services relative border-t border-neutral-200 bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-12 text-3xl font-semibold text-[#0b0b0b] md:text-4xl">
          ZoopZoop, 이렇게 일합니다
        </h2>

        {items.map((item, i) => (
          <article
            key={item.title}
            className="feature mb-16 grid items-center gap-8 md:grid-cols-12">
            <div
              className={tw(
                'feature__image relative md:col-span-6',
                i % 2 === 1 && 'md:order-2'
              )}>
              <div className="relative h-72 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white md:h-96">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            </div>

            <div
              className={tw(
                'feature__text md:col-span-6',
                i % 2 === 1 && 'md:order-1'
              )}>
              <h3 className="mb-3 text-2xl font-semibold text-[#0b0b0b] md:text-3xl">
                {item.title}
              </h3>
              <p className="mb-4 text-base text-neutral-600">{item.desc}</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                {item.bullets.map(b => (
                  <li
                    key={b}
                    className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ff9354]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
