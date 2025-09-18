import { tw } from '@/shared/lib'

export default function Home() {
  return (
    <div
      className={tw(
        'flex flex-col items-center justify-center h-screen text-red-600 text-2xl'
      )}>
      <h1>Hello World</h1>
    </div>
  )
}
