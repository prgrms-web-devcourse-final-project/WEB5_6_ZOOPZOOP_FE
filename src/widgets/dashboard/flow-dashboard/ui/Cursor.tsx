type Props = {
  x: number
  y: number
  name?: string
  color?: string
}

export function Cursor({ x, y, name, color = 'red' }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        zIndex: 1000,
        pointerEvents: 'none'
      }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
          fill={color}
        />
      </svg>

      {name && (
        <div
          className="ml-6 -mt-1 px-2 py-1 text-xs text-white rounded shadow-lg whitespace-nowrap"
          style={{ backgroundColor: color }}>
          {name}
        </div>
      )}
    </div>
  )
}
