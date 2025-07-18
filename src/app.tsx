import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import "./index.css";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <div className="min-h-screen">
      <HelmetProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | pizza.shop" />

          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
      <Toaster richColors />
    </div>
  );
}
