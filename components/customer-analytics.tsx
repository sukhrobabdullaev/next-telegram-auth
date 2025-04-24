"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function CustomerAnalytics() {
  const [period, setPeriod] = useState("acquisition")

  const monthlyData = [
    { month: "Jan", newCustomers: 8, activeCustomers: 45, churnRate: 2.1 },
    { month: "Feb", newCustomers: 12, activeCustomers: 52, churnRate: 1.8 },
    { month: "Mar", newCustomers: 10, activeCustomers: 58, churnRate: 2.3 },
    { month: "Apr", newCustomers: 15, activeCustomers: 65, churnRate: 1.5 },
    { month: "May", newCustomers: 18, activeCustomers: 72, churnRate: 1.2 },
    { month: "Jun", newCustomers: 14, activeCustomers: 78, churnRate: 1.7 },
    { month: "Jul", newCustomers: 16, activeCustomers: 82, churnRate: 1.9 },
    { month: "Aug", newCustomers: 20, activeCustomers: 85, churnRate: 2.0 },
    { month: "Sep", newCustomers: 22, activeCustomers: 88, churnRate: 1.6 },
    { month: "Oct", newCustomers: 18, activeCustomers: 92, churnRate: 1.4 },
    { month: "Nov", newCustomers: 15, activeCustomers: 95, churnRate: 1.3 },
    { month: "Dec", newCustomers: 12, activeCustomers: 89, churnRate: 2.5 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-none shadow-md bg-white dark:bg-zinc-900 md:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Customer Metrics</CardTitle>
              <CardDescription>Customer acquisition, retention, and churn</CardDescription>
            </div>
            <Tabs defaultValue="acquisition" className="w-[300px]" onValueChange={setPeriod}>
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="acquisition" className="text-xs">
                  Acquisition
                </TabsTrigger>
                <TabsTrigger value="retention" className="text-xs">
                  Retention
                </TabsTrigger>
                <TabsTrigger value="churn" className="text-xs">
                  Churn
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative mt-6">
                {/* Line chart */}
                <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 75}
                      x2="1200"
                      y2={i * 75}
                      stroke="var(--border)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Line */}
                  <path
                    d={`M 0 ${
                      300 -
                      (
                        monthlyData[0][
                          period === "acquisition"
                            ? "newCustomers"
                            : period === "retention"
                              ? "activeCustomers"
                              : "churnRate"
                        ] / (period === "acquisition" ? 25 : period === "retention" ? 100 : 3)
                      ) *
                        300
                    } ${monthlyData
                      .map(
                        (d, i) =>
                          `L ${(i * 1200) / (monthlyData.length - 1)} ${
                            300 -
                            (
                              d[
                                period === "acquisition"
                                  ? "newCustomers"
                                  : period === "retention"
                                    ? "activeCustomers"
                                    : "churnRate"
                              ] / (period === "acquisition" ? 25 : period === "retention" ? 100 : 3)
                            ) *
                              300
                          }`,
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke={
                      period === "acquisition"
                        ? "var(--chart-green)"
                        : period === "retention"
                          ? "var(--chart-blue)"
                          : "var(--chart-red)"
                    }
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />

                  {/* Area */}
                  <path
                    d={`M 0 ${
                      300 -
                      (
                        monthlyData[0][
                          period === "acquisition"
                            ? "newCustomers"
                            : period === "retention"
                              ? "activeCustomers"
                              : "churnRate"
                        ] / (period === "acquisition" ? 25 : period === "retention" ? 100 : 3)
                      ) *
                        300
                    } ${monthlyData
                      .map(
                        (d, i) =>
                          `L ${(i * 1200) / (monthlyData.length - 1)} ${
                            300 -
                            (
                              d[
                                period === "acquisition"
                                  ? "newCustomers"
                                  : period === "retention"
                                    ? "activeCustomers"
                                    : "churnRate"
                              ] / (period === "acquisition" ? 25 : period === "retention" ? 100 : 3)
                            ) *
                              300
                          }`,
                      )
                      .join(" ")} L 1200 300 L 0 300 Z`}
                    fill={
                      period === "acquisition"
                        ? "var(--chart-green)"
                        : period === "retention"
                          ? "var(--chart-blue)"
                          : "var(--chart-red)"
                    }
                    opacity="0.2"
                    className="transition-all duration-500"
                  />

                  {/* Data points */}
                  {monthlyData.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i * 1200) / (monthlyData.length - 1)}
                      cy={
                        300 -
                        (d[
                          period === "acquisition"
                            ? "newCustomers"
                            : period === "retention"
                              ? "activeCustomers"
                              : "churnRate"
                        ] /
                          (period === "acquisition" ? 25 : period === "retention" ? 100 : 3)) *
                          300
                      }
                      r="6"
                      fill="var(--background)"
                      stroke={
                        period === "acquisition"
                          ? "var(--chart-green)"
                          : period === "retention"
                            ? "var(--chart-blue)"
                            : "var(--chart-red)"
                      }
                      strokeWidth="3"
                      className="transition-all duration-500"
                    />
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-2">
                  {period === "acquisition" ? (
                    <>
                      <div>25</div>
                      <div>20</div>
                      <div>15</div>
                      <div>10</div>
                      <div>5</div>
                    </>
                  ) : period === "retention" ? (
                    <>
                      <div>100</div>
                      <div>80</div>
                      <div>60</div>
                      <div>40</div>
                      <div>20</div>
                    </>
                  ) : (
                    <>
                      <div>3%</div>
                      <div>2.4%</div>
                      <div>1.8%</div>
                      <div>1.2%</div>
                      <div>0.6%</div>
                    </>
                  )}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                {monthlyData.map((d) => (
                  <div key={d.month}>{d.month}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Customer Lifetime Value</CardTitle>
          <CardDescription>Average revenue per customer over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">$142</div>
                <div className="text-sm text-muted-foreground mb-6">Average Customer Lifetime Value</div>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">$42</div>
                    <div className="text-xs text-muted-foreground">First Purchase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3.4</div>
                    <div className="text-xs text-muted-foreground">Purchases/Customer</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">8.2</div>
                    <div className="text-xs text-muted-foreground">Months Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white dark:bg-zinc-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Customer Segments</CardTitle>
          <CardDescription>Distribution of customers by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="space-y-6 mt-4">
              {[
                { name: "New (0-30 days)", value: 15, color: "var(--chart-blue)" },
                { name: "Growing (30-90 days)", value: 32, color: "var(--chart-green)" },
                { name: "Established (90-180 days)", value: 28, color: "var(--chart-yellow)" },
                { name: "Loyal (180+ days)", value: 25, color: "var(--chart-purple)" },
              ].map((segment) => (
                <div key={segment.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                      <span className="text-sm font-medium">{segment.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{segment.value}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-in-out"
                      style={{
                        width: `${segment.value}%`,
                        backgroundColor: segment.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
