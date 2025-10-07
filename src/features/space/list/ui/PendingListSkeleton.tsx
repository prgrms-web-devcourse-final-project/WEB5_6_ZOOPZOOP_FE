import { SpaceCardSkeleton } from '@/entities/space'

const PendingListSkeleton = () => {
  return (
    <section className="flex flex-col gap-5 min-h-[calc(100vh-214px)]">
      <h2 className="sr-only">내 스페이스 목록 로딩중</h2>
      <ul className="grid gap-5 flex-1 grid-cols-1 min-[480px]:grid-cols-2 min-[896px]:grid-cols-3 min-[1312px]:grid-cols-4 min-[1728px]:grid-cols-5 auto-rows-min">
        {Array.from({ length: 10 }).map((_, i) => (
          <SpaceCardSkeleton key={i} />
        ))}
      </ul>
    </section>
  )
}
export default PendingListSkeleton
