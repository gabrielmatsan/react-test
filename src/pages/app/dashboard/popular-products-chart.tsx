import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import colors from "tailwindcss/colors";

import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { product: "Pizza", amount: 100 },
  { product: "Hamburguer", amount: 200 },
  { product: "Refrigerante", amount: 300 },
  { product: "Sorvete", amount: 400 },
  { product: "Cerveja", amount: 500 },
  { product: "Pão de queijo", amount: 600 },
  { product: "Batata frita", amount: 700 },
];

const COLORS = [
  colors.violet[500],
  colors.emerald[500],
  colors.amber[500],
  colors.rose[500],
  colors.sky[500],
  colors.orange[500],
  colors.pink[500],
];

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos mais vendidos
          </CardTitle>
          <BarChart className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart data={data} style={{ fontSize: 12 }}>
            <Pie
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                // midAngle pode ser undefined, então fornecemos um valor padrão (0) caso seja
                const safeMidAngle = midAngle ?? 0;
                const safeInnerRadius = innerRadius ?? 0;
                const safeOuterRadius = outerRadius ?? 0;
                const safeCx = cx ?? 0;
                const safeCy = cy ?? 0;
                const radius =
                  12 + safeInnerRadius + (safeOuterRadius - safeInnerRadius);
                const x = safeCx + radius * Math.cos(-safeMidAngle * RADIAN);
                const y = safeCy + radius * Math.sin(-safeMidAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index!].product.length > 12
                      ? data[index!].product.substring(0, 12).concat("...")
                      : data[index!].product}{" "}
                    ({value})
                  </text>
                );
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="hsl(var(--background)) hover:opacity-80"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
