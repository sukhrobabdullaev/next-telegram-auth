"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, Menu, Search, User, Sun, Moon, LogOut, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, logout } from "@/actions/auth"
import { useRouter } from "next/navigation"

interface UserInfo {
  name: string
  email: string
  avatar?: string
}

export function Header() {
  const { setTheme, theme } = useTheme()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "admin@example.com",
    avatar: undefined
  })
  const router = useRouter()

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getCurrentUser()
      if (user) {
        setUserInfo(user)
      }
    }
    fetchUserInfo()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.refresh()
  }

  const initials = userInfo.name
    ? userInfo.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "AS"

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-muted/30 border-none focus-visible:ring-1"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userInfo.avatar || `/placeholder.svg?text=${initials}`} alt={userInfo.name} />
                  {/* <AvatarFallback>{initials}</AvatarFallback> */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userInfo.avatar || `/placeholder.svg?text=${initials}`} alt={userInfo.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userInfo.name}</p>
                  <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
