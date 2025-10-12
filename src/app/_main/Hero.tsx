'use client'

export function Hero({ imageUrl, cols }: { imageUrl: string; cols: number }) {
  return (
    <section className="hero h-screen">
      <div className="hero__inner grid h-full w-screen grid-cols-6 gap-0">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="hero__image-cont relative overflow-hidden">
            <div
              className="slice absolute inset-[-1px] bg-cover bg-no-repeat will-change-transform"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${cols * 100}% 100%`,
                backgroundPosition: `${(i / (cols - 1)) * 100}% 50%`,
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            />
            <div className="anim-swipe absolute inset-0 bg-white" />
            {i !== cols - 1 && (
              <div className="absolute right-0 top-0 z-[2] h-full w-[2.5px] bg-white/90" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
