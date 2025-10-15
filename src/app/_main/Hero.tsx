'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-[#0b0b0b] md:text-5xl lg:text-6xl">
              마음에 드는 순간을
              <br />
              <span className="text-[#ff9354]">줍줍</span>하세요
            </h1>
            <p className="text-lg text-neutral-600 md:text-xl">
              웹에서 발견한 콘텐츠를 저장, 정리, 공유해 보세요.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full bg-[#ff9354] px-6 py-3 text-base font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg">
                지금 시작하기
              </Link>
              <Link
                href="https://github.com/prgrms-web-devcourse-final-project/WEB5_6_ZOOPS_TENSION_FE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-neutral-300 px-6 py-3 text-base font-semibold text-[#0b0b0b] transition-all hover:border-neutral-400 hover:bg-neutral-50">
                Chrome 확장 설치
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="ZoopZoop 협업 화면"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#ff9354]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
