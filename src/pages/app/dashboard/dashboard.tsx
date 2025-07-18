import { Helmet } from "react-helmet-async";
import { DayOrdersAmountCard } from "./day-orders-amount";
import { PopularProductsChart } from "./popular-products-chart";
import { MonthOrdersAmountCard } from "./month-orders-amount";
import { MonthRevenueCard } from "./month-revenue-card";
import { RevenueChart } from "./revenue-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
