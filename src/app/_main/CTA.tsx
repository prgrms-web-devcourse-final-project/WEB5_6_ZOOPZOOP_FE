'use client'

export function CTA() {
  return (
    <section className="cta border-t border-neutral-200 bg-[#fff7f2] py-16 text-[#0b0b0b]">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          지금 바로 ZoopZoop 시작하기
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          웹으로 즉시 사용하거나, 확장 프로그램을 설치해 더 빠르게 줍줍해보세요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/auth/login"
            className="rounded-full bg-[#ff9354] px-5 py-3 text-sm font-semibold text-white hover:brightness-105">
            웹으로 시작
          </a>
          <a
            href="https://chromewebstore.google.com/detail/your-extension-id"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-[#0b0b0b] hover:border-neutral-400">
            Chrome 확장 설치
          </a>
        </div>
      </div>
    </section>
  )
}
