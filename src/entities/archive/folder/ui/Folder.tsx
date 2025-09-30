interface Props {
  folderName: string
}

function Folder({ folderName }: Props) {
  return (
    <>
      <p className="text-base text-gray-darker ">{folderName}</p>
    </>
  )
}
export default Folder
