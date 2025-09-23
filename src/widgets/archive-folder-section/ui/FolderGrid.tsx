import FolderItem from './FolderItem'
const mockData = [1, 2, 3, 4, 5, 6, 7, 8]

function FolderGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {mockData.map(item => (
        <FolderItem
          key={item}
          folderName={`폴더이름0${item}`}
        />
      ))}
    </div>
  )
}
export default FolderGrid
