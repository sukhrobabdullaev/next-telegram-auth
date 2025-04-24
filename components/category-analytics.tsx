"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CategoryAnalytics() {
  const categoryData = [
    { name: "Religious", sales: 45, revenue: 4500, growth: 12 },
    { name: "Business", sales: 32, revenue: 3200, growth: 8 },
    { name: "Fiction", sales: 28, revenue: 2800, growth: -3 },
    { name: "Self-Help", sales: 24, revenue: 2400, growth: 15 },
    { name: "Biography", sales: 13, revenue: 1300, growth: 5 },
  ]

  const totalSales = categoryData.reduce((acc, curr) => acc + curr.sales, 0)
  const totalRevenue = categoryData.reduce((acc, curr) => acc + curr.revenue, 0)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md bg-white dark:bg-zinc-900 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Category Performance</CardTitle>
          <CardDescription>Sales and revenue by book category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Category</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Sales</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">% of Total</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Revenue</th>
                    <th className="text-xs font-medium text-muted-foreground text-left py-3 px-4">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categoryData.map((category) => (
                    <tr key={category.name} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-sm">{category.name}</div>
                      </td>
                      <td className="py-3 px-4 text-sm">{category.sales}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(category.sales / totalSales) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{Math.round((category.sales / totalSales) * 100)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">${category.revenue}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`px-2 py-0.5 text-xs font-medium ${
                            category.growth > 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {category.growth > 0 ? "+" : ""}
                          {category.growth}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/30">
                  <tr>
                    <td className="py-3 px-4 font-medium text-sm">Total</td>
                    <td className="py-3 px-4 font-medium text-sm">{totalSales}</td>
                    <td className="py-3 px-4 font-medium text-sm">100%</td>
                    <td className="py-3 px-4 font-medium text-sm">${totalRevenue}</td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Category Distribution</CardTitle>
          <CardDescription>Sales distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex flex-col justify-center h-full">
              <div className="relative w-full aspect-square max-w-[250px] mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{totalSales}</div>
                    <div className="text-sm text-muted-foreground">Total Sales</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {categoryData.map((category, i) => {
                    const startAngle = categoryData
                      .slice(0, i)
                      .reduce((acc, curr) => acc + (curr.sales / totalSales) * 360, 0)
                    const endAngle = startAngle + (category.sales / totalSales) * 360

                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                    const colors = [
                      "var(--chart-blue)",
                      "var(--chart-green)",
                      "var(--chart-yellow)",
                      "var(--chart-purple)",
                      "var(--chart-red)",
                    ]

                    return (
                      <path
                        key={category.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={colors[i % colors.length]}
                        className="transition-all duration-500 hover:opacity-90"
                      />
                    )
                  })}
                  <circle cx="50" cy="50" r="25" fill="var(--background)" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {categoryData.map((category, i) => {
                  const colors = [
                    "var(--chart-blue)",
                    "var(--chart-green)",
                    "var(--chart-yellow)",
                    "var(--chart-purple)",
                    "var(--chart-red)",
                  ]
                  return (
                    <div key={category.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: colors[i % colors.length] }}
                      ></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Revenue Distribution</CardTitle>
          <CardDescription>Revenue distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="space-y-6 mt-4">
              {categoryData.map((category, i) => {
                const colors = [
                  "var(--chart-blue)",
                  "var(--chart-green)",
                  "var(--chart-yellow)",
                  "var(--chart-purple)",
                  "var(--chart-red)",
                ]
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: colors[i % colors.length] }}
                        ></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">${category.revenue}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round((category.revenue / totalRevenue) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-in-out"
                        style={{
                          width: `${(category.revenue / totalRevenue) * 100}%`,
                          backgroundColor: colors[i % colors.length],
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
