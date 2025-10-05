"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle, FileText, Calendar, LogOut, ChevronDown, Users } from "lucide-react"
import { MemberManagementDialog } from "./member-management-dialog"

interface AdminMenuProps {
  username: string
  onLogout: () => void
  onManageBlogs: () => void
  onManageEvents: () => void
}

export function AdminMenu({ username, onLogout, onManageBlogs, onManageEvents }: AdminMenuProps) {
  return (
    <>

    const [showMemberManagement, setShowMemberManagement] = useState(false)

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 rounded-full">
          <UserCircle className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-medium">{username}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <div className="flex flex-col">
            <span>Welcome back!</span>
            <span className="text-xs text-muted-foreground">{username}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onManageBlogs} className="flex items-center gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>Manage Blogs</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onManageEvents} className="flex items-center gap-2 cursor-pointer">
          <Calendar className="h-4 w-4" />
          <span>Manage Events</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowMemberManagement(true)} className="flex items-center gap-2 cursor-pointer">
          <Users className="h-4 w-4" />
          <span>Manage Members</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 cursor-pointer text-red-600">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <MemberManagementDialog open={showMemberManagement} onOpenChange={setShowMemberManagement} />
    </>
  )
}
