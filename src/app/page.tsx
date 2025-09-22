import { tw } from '@/shared/lib'
import { ModalLayout } from '@/shared/ui/modal/ModalLayout'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen  text-2xl')}>
      <ModalLayout size="md">
        <h1>Hello World</h1>
      </ModalLayout>
    </div>
  )
}
