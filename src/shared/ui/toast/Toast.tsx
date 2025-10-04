import { toast } from 'react-hot-toast'

const baseStyle = `
  flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
  font-medium text-sm
`

export const showSuccessToast = (message: string) => {
  toast.custom(t => (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${baseStyle}
        bg-green-200 text-gray-darker border border-green-600
      `}>
      ✅ {message}
    </div>
  ))
}

export const showErrorToast = (message: string) => {
  toast.custom(t => (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${baseStyle}
        bg-red-200 text-gray-darker border border-red-600
      `}>
      ❌ {message}
    </div>
  ))
}

export const showInfoToast = (message: string) => {
  toast.custom(t => (
    <div
      className={`
        ${t.visible ? 'animate-enter' : 'animate-leave'}
        ${baseStyle}
        bg-blue-200 text-gray-darker border border-blue-600
      `}>
      🔎 {message}
    </div>
  ))
}
