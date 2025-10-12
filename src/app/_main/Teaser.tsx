'use client'

export function Teaser() {
  return (
    <section className="teaser border-t border-neutral-200 bg-white">
      <div className="mx-auto h-[100vh] max-w-6xl px-5">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative w-full">
            <p className="mb-3 text-center text-sm font-medium text-[#ff9354]">
              생각은 흘러가지만, 기록은 남아야 하니까
            </p>

            <div className="relative mx-auto h-[220px] max-w-3xl">
              <div className="teaser__card absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-semibold md:text-4xl">
                  발견한 순간을 놓치지 않아요
                </h2>
                <p className="mt-3 max-w-xl text-sm text-neutral-600">
                  크롬 확장으로 웹에서 마음에 드는 내용을 즉시 저장하고, 자동
                  요약·태그로 정리합니다.
                </p>
              </div>

              <div className="teaser__card absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-semibold md:text-4xl">
                  생각을 맥락으로 묶어요
                </h2>
                <p className="mt-3 max-w-xl text-sm text-neutral-600">
                  폴더와 태그로 주제별로 정리하고, 대시보드에서 한눈에 흐름을
                  파악할 수 있습니다.
                </p>
              </div>

              <div className="teaser__card absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-semibold md:text-4xl">
                  아이디어를 함께 키워요
                </h2>
                <p className="mt-3 max-w-xl text-sm text-neutral-600">
                  팀 스페이스에서 함께 아카이브를 관리하고, 댓글·보드로
                  브레인스토밍을 이어갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
