import { LuCirclePlus } from 'react-icons/lu'

export const FileUploadZone = () => {
  return (
    <div className="h-12 flex items-center py-3.5 px-4.5 border border-light-hover rounded-md text-base relative">
      <p>파일 업로드</p>
      <LuCirclePlus
        size={20}
        color="green"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  )
}
