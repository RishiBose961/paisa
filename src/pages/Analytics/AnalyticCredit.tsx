"use client"

import { useQuery } from "@tanstack/react-query"
import { TrendingUp } from "lucide-react"
import { useSelector } from "react-redux"
import { Pie, PieChart, Tooltip } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment"


const getColor = (index: number, total: number) => {
  const hue = (index * 360) / total
  return `hsl(${hue}, 70%, 50%)`
}
const { base_url } = CheckEnvironment();


const fetchCreditData = async (token: string) => {
  const res = await fetch(`${base_url}/api/credits/sum-by-month`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export default function AnalyticsPage() {
  const { user } = useSelector((state: { auth: { user: { token: string } } }) => state.auth)

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["credit-month"],
    queryFn: () => fetchCreditData(user?.token),
    enabled: !!user?.token,
  })

  // 🔄 Transform + auto colors
  const chartData = data.map((item: { _id: { month: number; year: number }; totalAmount: number }, index: number) => ({
    name: `${item._id.month}/${item._id.year}`,
    value: item.totalAmount,
    fill: getColor(index, data.length),
  }))

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error loading data</div>

  return (
    <Card className="flex flex-col w-full max-w-3xl mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Credit Analytics</CardTitle>
        <CardDescription>Pie Chart + Table View</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        <div className="mx-auto flex justify-center aspect-square max-h-[250px] w-full">
          <PieChart width={250} height={250}>
            <Tooltip />
            <Pie data={chartData} dataKey="value" nameKey="name">
           
            </Pie>
          </PieChart>
        </div>

        {/* 📋 TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="">
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item: { _id: { month: string; year: string }; totalAmount: number }, index: number) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{item._id.month}</td>
                    <td className="p-2 border">{item._id.year}</td>
                    <td className="p-2 border font-semibold">
                      ₹{item.totalAmount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* 📈 FOOTER */}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Monthly spending insights <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Based on your credit transactions
        </div>
      </CardFooter>
    </Card>
  )
}