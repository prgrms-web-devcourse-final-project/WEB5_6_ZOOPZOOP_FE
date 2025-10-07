// shared/hooks/useOnClickOutside.ts
import { RefObject, useEffect } from 'react'

/**
 * 특정 요소 외부를 클릭하거나 ESC 키를 눌렀을 때 콜백을 실행하는 훅
 * @param ref - 감지할 요소의 ref
 * @param handler - 외부 클릭 또는 ESC 키 입력 시 실행할 콜백
 * @param enabled - 훅 활성화 여부 (기본값: true)
 * @param excludeRefs - 외부 클릭으로 간주하지 않을 요소들의 ref 배열
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent | KeyboardEvent) => void,
  enabled: boolean = true,
  excludeRefs?: RefObject<HTMLElement | null>[]
) => {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current
      const target = event.target as Node

      if (!element || element.contains(target)) {
        return
      }

      if (
        excludeRefs?.some(excludeRef => excludeRef.current?.contains(target))
      ) {
        return
      }

      handler(event)
    }

    const keyListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    document.addEventListener('keydown', keyListener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('keydown', keyListener)
    }
  }, [ref, handler, enabled, excludeRefs])
}
