import { tw } from '@/shared/lib'
import { UploadArchiveModal } from '@/shared/ui/modal/archive/UploadArchiveModal'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen text-2xl')}>
      <UploadArchiveModal />
    </div>
  )
}
