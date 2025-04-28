import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js Telegram Authentication",
  description: "Next.js Backend for Telegram Authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <footer className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Made with ❤️ by <a href="https://sukhrob.io" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">sukhrob.io</a>
        </footer>
      </body>
    </html>
  )
}
