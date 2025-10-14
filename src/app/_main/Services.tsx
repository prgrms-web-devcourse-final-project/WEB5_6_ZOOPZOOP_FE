'use client'

import Image from 'next/image'
import { tw } from '@/shared/lib/tw'

export function Services() {
  const items = [
    {
      title: '웹 서핑 중 즉시 수집',
      desc: '크롬 확장 프로그램으로 웹 페이지를 탐색하다 마음에 드는 정보를 발견하면 바로 저장하세요. AI가 자동으로 요약하고 태그를 추천해 드립니다.',
      bullets: [
        '원클릭으로 웹 페이지 전체 또는 선택 영역 저장',
        'AI 기반 자동 요약 및 핵심 키워드 추출',
        '스마트 태그 추천으로 빠른 분류'
      ],
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: '체계적인 정리와 관리',
      desc: '수집한 정보를 폴더와 태그로 구조화하고, 직관적인 대시보드에서 한눈에 파악하세요. 검색과 필터링으로 원하는 정보를 빠르게 찾을 수 있습니다.',
      bullets: [
        '폴더 계층 구조로 주제별 체계적 분류',
        '다중 태그 시스템으로 유연한 카테고리 관리',
        '카드형 대시보드로 시각적 정보 탐색'
      ],
      img: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: '팀 협업과 지식 공유',
      desc: '개인 아카이브를 팀 스페이스로 확장하세요. 팀원들과 정보를 공유하고, 댓글로 의견을 나누며, 보드에서 함께 브레인스토밍할 수 있습니다.',
      bullets: [
        '팀 스페이스 생성 및 멤버 초대/권한 관리',
        '실시간 댓글 스레드로 활발한 의견 교환',
        '칸반 보드 방식의 협업 브레인스토밍'
      ],
      img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: '맞춤 추천과 트렌드 발견',
      desc: '내가 수집한 태그와 관심사를 분석해 새로운 콘텐츠를 추천받으세요. 뉴스 API 연동으로 실시간 트렌드를 놓치지 않습니다.',
      bullets: [
        '관심 태그 기반 AI 콘텐츠 추천',
        '뉴스 API 연동으로 최신 정보 자동 큐레이션',
        '카테고리별 트렌드 분석 및 인사이트 제공'
      ],
      img: 'https://cdn.aitimes.com/news/photo/202312/155957_167196_4613.jpg'
    }
  ]

  return (
    <section
      id="benefits"
      className="services relative border-t border-neutral-200 bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-[#0b0b0b] md:text-4xl">
            ZoopZoop이 제공하는 핵심 기능
          </h2>
          <p className="mx-auto max-w-3xl text-base text-neutral-600">
            웹 서핑 중 발견한 정보를 효율적으로 수집하고 요약·정리한 뒤, 팀
            단위로 공유하며 브레인스토밍까지 이어가는 통합 지식 관리
            플랫폼입니다.
          </p>
        </div>

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
