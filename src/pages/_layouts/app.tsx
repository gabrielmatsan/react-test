import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
export function AppLayout() {
  return (
    <div className="flex grid-cols-2 flex-col antialiased">
      <Header />

      <div className="flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
