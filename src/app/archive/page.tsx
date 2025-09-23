'use client'
import { Header } from '@/shared/ui/header'
import { Button } from '@/shared/ui/header/Header'
import { Plus, Upload } from 'lucide-react'

export default function Archive() {
  const buttons: Button[] = [
    {
      label: '파일 생성',
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
    <div>
      <Header
        title="아카이브"
        buttons={buttons}
        searchBar={{ placeholder: '검색어를 입력해 주세요' }}
      />
    </div>
  )
}
