const categories = [
  {
    id: 1,
    name: '전체'
  },
  {
    id: 2,
    name: '정치 '
  },
  {
    id: 3,
    name: '경제'
  },
  {
    id: 4,
    name: '사회'
  },
  {
    id: 5,
    name: 'IT'
  },
  {
    id: 6,
    name: '스포츠'
  }
]

export const CategoryFilter = () => {
  return (
    <div className="flex gap-8">
      {categories.map(category => (
        <p
          key={category.id}
          className="text-base cursor-pointer font-medium">
          {category.name}
        </p>
      ))}
    </div>
  )
}
