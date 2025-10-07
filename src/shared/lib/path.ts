/**
 * 동적 경로 패턴과 실제 pathname을 비교
 * @param pathname - 현재 경로 (예: '/space/123/m')
 * @param pattern - 패턴 경로 (예: '/space/:id/m')
 * @returns 매칭 여부
 */
export function matchPath(pathname: string, pattern: string): boolean {
  // 패턴에 :가 없으면 정확히 일치하는지 확인
  if (!pattern.includes(':')) {
    return pathname === pattern
  }

  // :id, :slug 등을 [^/]+ 로 변경하여 정규식 생성
  const regex = new RegExp('^' + pattern.replace(/:\w+/g, '[^/]+') + '$')
  return regex.test(pathname)
}
