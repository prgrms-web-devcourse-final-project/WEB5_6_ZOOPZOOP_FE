// 0000.00.00 형식으로 변환
export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '')
}
