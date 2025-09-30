interface Props {
  title: string
  sourceUrl: string
}
// 파일 카드 타이틀
const FileTitle = ({ sourceUrl, title }: Props) => {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (새 탭에서 열림)`}>
      <h3 className="text-sm font-medium truncate transition-colors duration-200 hover:text-orange-accent cursor-pointer">
        {title}
      </h3>
    </a>
  )
}
export default FileTitle
