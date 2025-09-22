import { tw } from '@/shared/lib'
import { CreateSpaceModal } from '@/shared/ui/modal'

export default function Home() {
  return (
    <div className={tw('flex-center h-screen text-2xl')}>
      <CreateSpaceModal initialStep={1} />
    </div>
  )
}
