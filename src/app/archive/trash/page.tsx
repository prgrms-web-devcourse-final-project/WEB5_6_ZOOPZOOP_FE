import { Header } from '@/shared/ui/header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '휴지통',
  description: '삭제된 파일과 폴더를 관리하는 휴지통 페이지'
}
function ArchiveTrashPage() {
  return (
    <>
      <Header
        title="휴지통"
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FileSection fileList={[]} />
        <Pagination totalPages={5} />
      </div>
    </>
  )
}
export default ArchiveTrashPage
