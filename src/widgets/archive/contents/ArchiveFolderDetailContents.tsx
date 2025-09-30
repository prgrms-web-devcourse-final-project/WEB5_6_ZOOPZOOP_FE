'use client'

import { Header } from '@/shared/ui/header'
import { Button } from '@/shared/ui/header/Header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive/file-section'
import { FolderSection } from '@/widgets/archive/folder-section'
import { Plus, Upload } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function ArchiveFolderDetailContents() {
  const { folder } = useParams()

  const buttons: Button[] = [
    {
      label: '폴더 생성'
    },
    {
      label: '파일 업로드'
    }
  ]

  return (
    <>
      <Header
        title={String(folder)}
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FolderSection folderList={[]} />
        <FileSection fileList={[]} />
        <Pagination totalPages={5} />
      </div>
    </>
  )
}
