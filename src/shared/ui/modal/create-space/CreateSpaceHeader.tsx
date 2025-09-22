import { tw } from '@/shared/lib'

export const CreateModalHeader = ({ step }: { step: number }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">스페이스 생성</h1>

      <div className="flex">
        <p
          className={tw(
            'w-[200px] py-2.5 text-center text-lg text-normal border-b-2 border-light-active',
            step === 1 && 'border-green-normal text-green-normal'
          )}>
          1. 이름 입력
        </p>
        <p
          className={tw(
            'w-[200px] py-2.5 text-center text-lg text-normal border-b-2 border-light-active',
            step === 2 && 'border-green-normal text-green-normal'
          )}>
          2. 팀원 초대
        </p>
      </div>
    </>
  )
}
