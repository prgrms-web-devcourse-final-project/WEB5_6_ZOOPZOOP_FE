import { NextResponse } from 'next/server'

export interface APIResponse<T> {
  status: string
  msg: string
  data: T | null
}

export type AuthHandler<T> = (
  token: string,
  request: Request
) => Promise<APIResponse<T>>

export interface NextFetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
  cache?: 'force-cache' | 'no-store'
}
