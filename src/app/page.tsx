import { tw } from '@/shared/lib'
import { ArchiveSelectModal } from '@/shared/ui/modal'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen text-2xl')}>
      <ArchiveSelectModal />
    </div>
  )
}
