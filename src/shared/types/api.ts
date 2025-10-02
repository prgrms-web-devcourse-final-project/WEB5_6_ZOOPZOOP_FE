// 기본 통신
export interface APIResponse<T> {
  status: number
  msg: string
  data: T | null
}

export type AuthHandler<T> = (
  token: string,
  request?: Request
) => Promise<APIResponse<T>>

export interface NextFetchOptions extends RequestInit {
  token?: string
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
  cache?: 'force-cache' | 'no-store'
}

// 페이지네이션 데이터
export type Pagination<K extends string, T> = {
  [key in K]: T[]
} & {
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

// 페이지 네이션  API response 타입
export type PaginationAPIResponse<K extends string, T> = APIResponse<
  Pagination<K, T>
>
