import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'

const EmptyArchiveFileList = () => {
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
        URL을 업로드하여 아카이브를 만들어보세요!
      </p>
      <Button onClick={() => openModal({ type: 'upload-archive-url' })}>
        <PlusCircle className="mr-2 h-4 w-4" /> URL 업로드
      </Button>
    </section>
  )
}
export default EmptyArchiveFileList
