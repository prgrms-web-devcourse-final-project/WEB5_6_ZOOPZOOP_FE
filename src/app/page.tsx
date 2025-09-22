import { tw } from '@/shared/lib'
import { CreateFolderModal } from '@/shared/ui/modal'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen text-2xl')}>
      <CreateFolderModal />
    </div>
  )
}
