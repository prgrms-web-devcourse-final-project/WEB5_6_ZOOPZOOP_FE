'use client'
import { Header } from '@/shared/ui/header'
import { Button } from '@/shared/ui/header/Header'
import Pagination from '@/shared/ui/pagination/Pagination'
import { FileSection } from '@/widgets/archive-file-section'
import { FolderSection } from '@/widgets/archive-folder-section'
import { Plus, Upload } from 'lucide-react'
import { Suspense } from 'react'

export default function ArchivePage() {
  const buttons: Button[] = [
    {
      label: '폴더 생성',
      icon: Plus,
      onClick: () => {
        // TODO: 파일 생성 기능 구현
      }
    },
    {
      label: '파일 업로드',
      icon: Upload,
      onClick: () => {
        // TODO: 파일 업로드 기능 구현
      }
    }
  ]

  return (
    <>
      <Header
        title="내 아카이브"
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
      <div className="flex flex-col p-6 gap-4">
        <FolderSection />
        <FileSection />
        <Suspense fallback={<div>로딩 중...</div>}>
          <FileSection />
        </Suspense>
      </div>
    </>
  )
}
