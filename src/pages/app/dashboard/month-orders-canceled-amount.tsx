import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthOrdersCanceledAmountCard() {
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Pedidos cancelados (mês)
          </CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>

        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">12</span>

          <p className="text-muted-foreground text-2xl">
            <span className="text-emerald-500 dark:text-emerald-400"> -3%</span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
