import { APIResponse } from '@/shared/types'

export type NewsResponse = APIResponse<{
  total: number
  items: News[]
}>

export interface News {
  title: string
  link: string
  description: string
  pubDate: string
  imageUrl?: string
  category?: string
}

export interface RecommendedNews {
  total: number
  items: News[]
}

export type RecommendedNewsResponse = APIResponse<RecommendedNews>
