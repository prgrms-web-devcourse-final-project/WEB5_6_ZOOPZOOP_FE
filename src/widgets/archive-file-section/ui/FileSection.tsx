import FileHeader from './FileHeader'
import FileTable from './FileTable'

function FileSection() {
  return (
    <div className="flex flex-col gap-4">
      <FileHeader />

      <FileTable />
    </div>
  )
}
export default FileSection
