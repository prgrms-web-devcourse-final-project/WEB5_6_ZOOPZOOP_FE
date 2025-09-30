import { GridDataType } from './type'

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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다.가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다. 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.가나 관련 경제 기사 요약입니다 오픈소스 SSD와 관련한 프로그램 압축 이슈를 다룹니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '정치 분야 기사 요약. SSD 관련 기술이 정치·정책과 연결된 맥락을 설명합니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '스포츠 분야 기사 요약. 기술적 비유를 통해 스포츠 이슈를 전하고 있습니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '환경 기사 요약. 프로그램과 오픈소스 기술이 환경 분야와 연결되는 맥락을 보여줍니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary: '역사 기사 요약. 과거와 현재 기술 발전의 연관성을 다룹니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '세계 기사 요약. 글로벌 관점에서 기술적 변화와 사회 이슈를 설명합니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary: '정치 기사 요약. 최신 정책과 기술 발전 간의 관계를 다룹니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary:
      '경제 기사 요약. 조선일보 보도 기준으로 시장과 기술을 연결하는 내용을 담았습니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary: '과학 기사 요약. 기술적 요소와 최신 과학적 논의의 접점을 다룹니다.'
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
    ownerProfileUrl: '/zoopzoop.png',
    summary: '문화 기사 요약. 기술과 문화적 현상이 교차하는 맥락을 소개합니다.'
  }
]

// 파일 Grid용으로 가공
export const gridFiles: GridDataType[] = rawFiles.map(file => ({
  id: Number(file.id),
  title: file.title,
  category: file.category,
  createAt: new Date(file.createdAt),
  imageUrl: file.imageUrl,
  sourceUrl: file.sourceUrl,
  ownerProfileUrl: file.ownerProfileUrl,
  isSelected: false,
  summary: file.summary
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
