// hooks/useDebounce.ts
import { useEffect, useState } from 'react'

/**
 * 값의 변경을 지연시켜 불필요한 업데이트를 방지하는 훅
 *
 * @param value - 디바운스할 값 (어떤 타입이든 가능)
 * @param delay - 지연 시간 (밀리초, 기본값: 500ms)
 * @returns 디바운스된 값
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 500)
 *
 * searchTerm은 타이핑할 때마다 변경
 * debouncedSearchTerm은 타이핑 멈춘 후 500ms 뒤 변경
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debouncedValue
}
