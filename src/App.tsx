import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import Insights from "./pages/Insights";
import PredictStock from "./pages/PredictStock";
import Scan from "./pages/Scan";
import Marketplace from "./pages/Marketplace";
import Customers from "./pages/Customers";
import ManageProducts from "./pages/ManageProducts";
import Integrations from "./pages/Integrations";
import Storefront from "./pages/Storefront";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <Dashboard />
              </AppShell>
            }
          />
          <Route
            path="/billing"
            element={
              <AppShell>
                <Billing />
              </AppShell>
            }
          />
          <Route
            path="/inventory"
            element={
              <AppShell>
                <Inventory />
              </AppShell>
            }
          />
          <Route
            path="/insights"
            element={
              <AppShell>
                <Insights />
              </AppShell>
            }
          />
          <Route
            path="/insights/predict"
            element={
              <AppShell>
                <PredictStock />
              </AppShell>
            }
          />
          <Route
            path="/scan"
            element={
              <AppShell>
                <Scan />
              </AppShell>
            }
          />
          <Route
            path="/marketplace"
            element={
              <AppShell>
                <Marketplace />
              </AppShell>
            }
          />
          <Route
            path="/customers"
            element={
              <AppShell>
                <Customers />
              </AppShell>
            }
          />
          <Route
            path="/catalog"
            element={
              <AppShell>
                <ManageProducts />
              </AppShell>
            }
          />
          <Route
            path="/integrations"
            element={
              <AppShell>
                <Integrations />
              </AppShell>
            }
          />
          <Route path="/store" element={<Storefront />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
