import { NextFetchOptions } from '../types'

const API_BASE_URL = process.env.API_URL || ''

const createFetchOptions = (
  method: string,
  data?: unknown,
  options?: NextFetchOptions
): NextFetchOptions => {
  const { headers, token, ...restOptions } = options || {}

  const isFormData = data instanceof FormData

  return {
    method,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers
    },
    body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    ...restOptions
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const result = await response.json()

  // 성공이면 그대로 반환
  if (response.ok) {
    return {
      ...result,
      status: Number(result.status)
    } as T
  }

  // 백엔드가 { status, data, msg } 형식으로 보낸다면
  return {
    data: null,
    status: Number(response.status),
    msg: result.msg || '알 수 없는 오류'
  } as T
}

export const httpClient = {
  async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    options?: NextFetchOptions
  ): Promise<T> {
    const { ...fetchOptions } = options || {}
    const url = `${API_BASE_URL}${endpoint}`

    const requestOptions = createFetchOptions(method, data, fetchOptions)

    const response = await fetch(url, requestOptions)

    return handleResponse<T>(response)
  },

  async get<T>(endpoint: string, options?: NextFetchOptions): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options)
  },

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: NextFetchOptions
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, options)
  },

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: NextFetchOptions
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, options)
  },

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: NextFetchOptions
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, options)
  },

  async delete<T>(endpoint: string, options?: NextFetchOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, options)
  }
}
