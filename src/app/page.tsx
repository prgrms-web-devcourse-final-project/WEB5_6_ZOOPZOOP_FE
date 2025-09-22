import { tw } from '@/shared/lib'
import { AlarmModal } from '@/shared/ui/modal'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen text-2xl')}>
      <AlarmModal />
    </div>
  )
}
