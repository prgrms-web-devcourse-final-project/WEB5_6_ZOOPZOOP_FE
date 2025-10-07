interface Props {
  path: string
}
export const SelectItem = ({ path }: Props) => {
  return (
    <div className="py-3.5 px-4.5 bg-gray-light rounded-md text-base">
      내 아카이브/{path}
    </div>
  )
}
