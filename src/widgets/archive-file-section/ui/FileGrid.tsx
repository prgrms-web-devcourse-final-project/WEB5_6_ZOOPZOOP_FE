import { FileCard } from '@/shared/ui'

const mockData = [1, 2, 3, 4, 5, 6, 7, 8]

function FileGrid() {
  const handleSelect = (cardId: number) => {
    // console.log('Selected:', cardId)
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {mockData.map(item => (
        <FileCard
          key={item}
          id={item}
          title={`React 컴포넌트 설계${item}`}
          category="Frontend"
          createAt={new Date('2024-03-15')}
          imageUrl="/image.png"
          sourceUrl="/image.png"
          ownerProfileUrl="/zoopzoop.png"
          isSelected={false}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
export default FileGrid
