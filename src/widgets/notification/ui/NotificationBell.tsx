import { Bell } from 'lucide-react'
import NotificationList from './NotificationList'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui/shadcn/popover'

const NotificationBell = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="알림"
          className="bg-white rounded-lg hover:bg-gray-100 p-2">
          <Bell
            className="text-gray-600"
            size={18}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        side="bottom">
        <NotificationList />
      </PopoverContent>
    </Popover>
  )
}
export default NotificationBell
