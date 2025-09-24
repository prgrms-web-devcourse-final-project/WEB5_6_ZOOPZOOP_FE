import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: '전체',
    href: '/news'
  },
  {
    id: 2,
    name: '정치',
    href: '/news/politics'
  },
  {
    id: 3,
    name: '경제',
    href: '/news/economy'
  },
  {
    id: 4,
    name: '사회',
    href: '/news/society'
  },
  {
    id: 5,
    name: 'IT',
    href: '/news/it'
  },
  {
    id: 6,
    name: '스포츠',
    href: '/news/sports'
  }
]

export const CategoryFilter = () => {
  return (
    <div className="flex gap-8">
      {categories.map(category => (
        <Link
          key={category.id}
          href={`${category.href}`}
          className="text-base cursor-pointer font-medium">
          {category.name}
        </Link>
      ))}
    </div>
  )
}
