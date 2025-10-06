import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'

const EmptyList = () => {
  const openModal = useModalStore(state => state.openModal)

  return (
    <section className="flex flex-col items-center justify-center gap-1 min-h-[calc(100vh-214px)] text-center">
      <Image
        src={
          'https://zoopzoop-test-bucket.s3.ap-northeast-2.amazonaws.com/empty_space'
        }
        alt="empty space image"
        className="w-64 h-auto"
        width={300}
        height={300}
        priority
      />
      <h3 className="text-2xl font-semibold">스페이스가 없습니다</h3>
      <p className="text-muted-foreground mb-5">
        스페이스를 만들어 자료를 시각화 해보세요!
      </p>
      <Button onClick={() => openModal({ type: 'create-space' })}>
        <PlusCircle className="mr-2 h-4 w-4" /> 스페이스 생성
      </Button>
    </section>
  )
}
export default EmptyList
