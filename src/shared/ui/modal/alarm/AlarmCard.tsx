interface Props {
  sender: string
  spaceName: string
}

export const AlarmCard = ({ sender, spaceName }: Props) => {
  return (
    <div className="flex flex-col gap-2.5 p-4 border-b-1 border-gray-light">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 bg-gray-light rounded-full"></div>
        <div className="text-base font-bold">보낸사람</div>
      </div>

      <p className="text-sm">
        {`${sender}께서 당신을 ${spaceName} 스페이스에 초대하고 싶어합니다!`}
      </p>

      <div className="w-full flex gap-4">
        <button className="flex-center flex-1 h-10  bg-white text-black border border-gray-normal rounded-md py-3 px-3 text-base">
          거절
        </button>
        <button className="flex-center flex-1 h-10 bg-green-normal text-white rounded-md py-3 px-3 text-base">
          수락
        </button>
      </div>
    </div>
  )
}
