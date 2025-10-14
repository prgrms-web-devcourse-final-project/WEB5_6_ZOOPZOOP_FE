'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui/shadcn/button'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-16 bg-white">
      <section className="w-full max-w-xl text-center space-y-8">
        <div className="mx-auto size-24 rounded-2xl bg-orange-accent/10 flex items-center justify-center ring-1 ring-orange-accent/30">
          <svg
            viewBox="0 0 24 24"
            className="size-12 text-orange-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5">
            <path d="M12 3c3.866 0 7 3.134 7 7 0 3.2-2.1 5.9-5 6.73V21l-3.2-2.13c-.25-.17-.55-.26-.85-.26H9c-3.866 0-7-3.134-7-7s3.134-7 7-7Z" />
            <circle
              cx="9.5"
              cy="9.5"
              r=".8"
            />
            <circle
              cx="14.5"
              cy="9.5"
              r=".8"
            />
            <path d="M9 13c1.2 1 2.8 1 4 0" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
          길을 잃으셨나요?
        </h1>
        <p className="text-gray-600 leading-relaxed">
          요청하신 페이지를 찾을 수 없어요. 아래 버튼으로 원하는 곳으로 이동해
          보세요.
        </p>

        <div className="flex items-stretch sm:items-center justify-center gap-3 pt-2">
          <Link
            href="/archive"
            aria-label="내 스페이스로 이동">
            <Button className="w-full sm:w-auto bg-orange-accent hover:bg-orange-accent/90 py-5">
              내 아카이브로 가기
            </Button>
          </Link>
        </div>

        <p
          className="sr-only"
          role="status"
          aria-live="polite">
          404 Not Found
        </p>
      </section>
    </main>
  )
}
