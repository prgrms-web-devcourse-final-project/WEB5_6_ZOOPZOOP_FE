import FolderGrid from './FolderGrid'
import FolderHeader from './FolderHeader'

function FolderSection() {
  // 폴더 헤더
  // 폴더 리스트

  return (
    <div className="flex flex-col gap-4 pb-5 border-b-1 border-gray-light-hover">
      <FolderHeader />
      <FolderGrid />
    </div>
  )
}
export default FolderSection
