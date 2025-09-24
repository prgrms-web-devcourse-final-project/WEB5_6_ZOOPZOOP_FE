import { GridData } from '@/features/archive-sort'

// 서버에서 내려주는 원본 데이터
export const rawFiles = [
  {
    id: '1',
    category: '경제',
    title:
      '가나 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-15',
    origin: '동아일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '2',
    category: '정치',
    title:
      '하하 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-16',
    origin: '동아일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '3',
    category: '스포츠',
    title:
      '마바 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-17',
    origin: '동아일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '4',
    category: '환경',
    title:
      '바나 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-18',
    origin: '조선일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '5',
    category: '역사',
    title:
      '사라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-19',
    origin: '한겨레',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '6',
    category: '세계',
    title:
      '아라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-20',
    origin: '경향신문',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '7',
    category: '정치',
    title:
      '자라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-21',
    origin: '동아일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '8',
    category: '경제',
    title:
      '차라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-22',
    origin: '조선일보',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '9',
    category: '과학',
    title:
      '카라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-23',
    origin: '한겨레',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  },
  {
    id: '10',
    category: '문화',
    title:
      '타라 can’t compress the program without quantifying the open-source SSD...',
    createdAt: '2024-03-24',
    origin: '경향신문',
    imageUrl: '/image.png',
    sourceUrl: '/source.pdf',
    ownerProfileUrl: '/zoopzoop.png'
  }
]

// 파일 Grid용으로 가공
export const gridFiles: GridData[] = rawFiles.map(file => ({
  id: Number(file.id),
  title: file.title,
  category: file.category,
  createAt: new Date(file.createdAt),
  imageUrl: file.imageUrl,
  sourceUrl: file.sourceUrl,
  ownerProfileUrl: file.ownerProfileUrl,
  isSelected: false
}))

// 파일 Table용으로 가공
export const tableFiles = rawFiles.map(file => ({
  id: file.id,
  category: file.category,
  title: file.title,
  createdAt: file.createdAt,
  origin: file.origin
}))

export const folderData = [
  { id: 1, name: 'Documents' },
  { id: 2, name: 'Pictures' },
  { id: 3, name: 'Music' },
  { id: 4, name: 'Videos' },
  { id: 5, name: 'Projects' },
  { id: 6, name: 'Downloads' },
  { id: 7, name: 'Work' },
  { id: 8, name: 'Personal' },
  { id: 9, name: 'Archive' },
  { id: 10, name: 'Temp' }
]
