import { ModalLayout } from '../ModalLayout'
import { ArchiveFolder } from './ArchiveFolderTree'
import { FileUploadZone } from './FileUploadZone'
import { SelectItem } from './SelectedFileItem'

import { LuFolder } from 'react-icons/lu'

export const UploadArchiveModal = () => {
  return (
    <ModalLayout size="md">
      <h1 className="text-2xl font-bold text-center">아카이브 업로드</h1>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-bold">가져올 위치</h2>
        <div className="flex items-center gap-2 text-base">
          <LuFolder size={20} />
          <p>내 아카이브</p>
        </div>
        <ArchiveFolder />
        <ArchiveFolder />
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <FileUploadZone />

        <div className="flex flex-col gap-2.5">
          <SelectItem />
          <SelectItem />
          <SelectItem />
        </div>
      </div>
    </ModalLayout>
  )
}
