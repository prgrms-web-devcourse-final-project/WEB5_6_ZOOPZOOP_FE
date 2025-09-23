import { ModalLayout } from '../ModalLayout'
import { AlarmCard } from './AlarmCard'

export const AlarmModal = () => {
  return (
    <ModalLayout size="sm">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-center">알림</h1>
        <div>
          <AlarmCard
            sender="보낸사람"
            spaceName="스페이스"
          />
          <AlarmCard
            sender="보낸사람"
            spaceName="스페이스"
          />
        </div>
        <div className="flex justify-between text-sm text-dark">
          <p>모두 거절</p>
          <p className="font-bold">모두 수락</p>
        </div>
      </div>
    </ModalLayout>
  )
}
