import { useModalStore } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import { Inbox, PlusCircle } from 'lucide-react'

const EmptyList = () => {
  const openModal = useModalStore(state => state.openModal)

  return (
    <section className="flex flex-col items-center justify-center gap-1 min-h-[calc(100vh-214px)] text-center">
      <Inbox className="h-16 w-16 text-gray-400" />
      <h3 className="text-2xl font-semibold">스페이스가 없습니다</h3>
      <p className="text-muted-foreground mb-5">
        새로운 스페이스를 만들어 팀원들과 협업을 시작하세요.
      </p>
      <Button onClick={() => openModal({ type: 'create-space' })}>
        <PlusCircle className="mr-2 h-4 w-4" /> 스페이스 생성
      </Button>
    </section>
  )
}
export default EmptyList
