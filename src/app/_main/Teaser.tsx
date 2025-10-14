'use client'

export function Teaser() {
  const cards = [
    {
      title: '발견한 순간을 놓치지 않아요',
      desc: '크롬 확장으로 웹에서 마음에 드는 내용을 즉시 저장하고, 자동 요약·태그로 정리합니다.',
      icon: '🔍'
    },
    {
      title: '생각을 맥락으로 묶어요',
      desc: '폴더와 태그로 주제별로 정리하고, 대시보드에서 한눈에 흐름을 파악할 수 있습니다.',
      icon: '📂'
    },
    {
      title: '아이디어를 함께 키워요',
      desc: '팀 스페이스에서 함께 아카이브를 관리하고, 댓글·보드로 브레인스토밍을 이어갑니다.',
      icon: '🤝'
    }
  ]

  return (
    <section className="border-t border-neutral-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-4 text-center text-sm font-medium text-[#ff9354]">
          생각은 흘러가지만, 기록은 남아야 하니까
        </p>
        <h2 className="mb-12 text-center text-3xl font-semibold text-[#0b0b0b] md:text-4xl">
          ZoopZoop이 특별한 이유
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-5xl">{card.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-[#0b0b0b]">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
