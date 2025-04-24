"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function BookStats({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("categories")

  const categoryData = [
    { name: "Religious", value: 45, color: "var(--chart-purple)" },
    { name: "Business", value: 32, color: "var(--chart-blue)" },
    { name: "Fiction", value: 28, color: "var(--chart-green)" },
    { name: "Self-Help", value: 24, color: "var(--chart-yellow)" },
    { name: "Biography", value: 13, color: "var(--chart-red)" },
  ]

  return (
    <Card className={`border-none shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Book Statistics</CardTitle>
            <CardDescription>Distribution of books by category</CardDescription>
          </div>
          <Tabs defaultValue="categories" className="w-[240px]" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="categories" className="text-xs">
                Categories
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {activeTab === "categories" ? (
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.value} books</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-in-out"
                      style={{
                        width: `${(category.value / 142) * 100}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-6 gap-2 w-full h-[200px] items-end">
                {[12, 19, 15, 22, 28, 32].map((value, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm transition-all duration-500 hover:bg-blue-600 dark:hover:bg-blue-500"
                      style={{ height: `${(value / 32) * 100}%` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 dark:bg-zinc-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {value} books
                    </div>
                    <div className="text-xs text-center mt-2 text-muted-foreground">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
