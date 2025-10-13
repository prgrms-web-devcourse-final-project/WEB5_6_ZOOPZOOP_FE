import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { SpaceFileMode } from '../model/type'

interface Props {
  mode: SpaceFileMode
}
const EmptySpaceFileList = ({ mode }: Props) => {
  const openModal = useModalStore(state => state.openModal)

  return (
    <section className="flex flex-col items-center justify-center gap-1 text-center">
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
      <h3 className="text-2xl font-semibold">등록된 파일이 없습니다</h3>
      <p className="text-muted-foreground mb-5">
        내 아카이브에서 URL을 불러와서 공유하세요!
      </p>
      {mode === 'space' && (
        <Button onClick={() => openModal({ type: 'copy-to-space' })}>
          <PlusCircle className="mr-2 h-4 w-4" /> URL 업로드 불러오기
        </Button>
      )}
    </section>
  )
}
export default EmptySpaceFileList
