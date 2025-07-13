import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import colors from "tailwindcss/colors";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2025-01-01", revenue: 100 },
  { date: "2025-01-02", revenue: 200 },
  { date: "2025-01-03", revenue: 300 },
  { date: "2025-01-04", revenue: 400 },
  { date: "2025-01-05", revenue: 500 },
  { date: "2025-01-06", revenue: 600 },
  { date: "2025-01-07", revenue: 700 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diaria no perido</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <YAxis
              stroke="#888"
              strokeWidth={1}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <XAxis
              dataKey="date"
              stroke="#888"
              strokeWidth={1}
              axisLine={false}
              tickLine={false}
              dy={16}
            />
            <Line
              type="linear"
              dataKey="revenue"
              strokeWidth={2}
              stroke={colors.violet[500]}
            />

            <CartesianGrid
              stroke={colors.zinc[200]}
              strokeDasharray="3 3"
              vertical={false}
            />

            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
