import { formatISODate } from '@/shared/lib'

interface Props {
  createAt: string
}

const JoinDateInfo = ({ createAt }: Props) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor="joinDate">
        가입일
      </label>
      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600">
        {formatISODate(createAt)}
      </div>
    </div>
  )
}
export default JoinDateInfo
