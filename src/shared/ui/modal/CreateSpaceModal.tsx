'use client'

import { useState } from 'react'
import { ModalLayout } from './ModalLayout'
import { tw } from '@/shared/lib'

export const CreateSpaceModal = () => {
  const [step, setStep] = useState(1)
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold">스페이스 생성</h1>

      <div className="flex">
        <p
          className={tw(
            'w-[200px] py-2.5 text-center text-lg text-grey-normal border-b-2 border-grey-light-active',
            step === 1 && 'border-green-normal text-green-normal'
          )}>
          1. 이름 입력
        </p>
        <p
          className={tw(
            'w-[200px] py-2.5 text-center text-lg text-grey-normal border-b-2 border-grey-light-active',
            step === 2 && 'border-green-normal text-green-normal'
          )}>
          2. 팀원 초대
        </p>
      </div>

      {step === 1 && (
        <>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="space-name"
              className="text-base">
              스페이스 이름
            </label>
            <input
              type="text"
              id="space-name"
              className="border border-grey-light rounded-md py-3 px-3 text-base"
              placeholder="스페이스 이름을 입력해 주세요"
            />
          </div>
          <button
            className="bg-green-normal w-full text-white rounded-md py-3 px-3 text-base"
            onClick={() => setStep(2)}>
            다음
          </button>
        </>
      )}
    </ModalLayout>
  )
}
