"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, Package, Settings, ShoppingCart, Tag, Users, BarChart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Books", href: "/dashboard/books", icon: BookOpen },
  { name: "Categories", href: "/dashboard/categories", icon: Tag },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-border h-screen sticky top-0 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary/10 p-2 rounded-md">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl">Bookstore</span>
        </div>
        <nav className="space-y-1.5">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?text=JD" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
