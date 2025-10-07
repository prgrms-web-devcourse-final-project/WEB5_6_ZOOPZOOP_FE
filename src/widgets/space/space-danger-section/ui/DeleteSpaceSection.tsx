import { DeleteSpaceButton } from '@/features/space'

const DeleteSpaceSection = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          스페이스 삭제
        </h3>
        <p className="text-sm text-gray-600">
          스페이스를 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수
          없습니다.
          <span className="font-semibold text-red-600">
            {' '}
            이 작업은 되돌릴 수 없습니다.
          </span>
        </p>
      </div>
      <DeleteSpaceButton />
    </div>
  )
}
export default DeleteSpaceSection
