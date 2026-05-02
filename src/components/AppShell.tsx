import { NavLink } from "react-router-dom";
import { LayoutDashboard, ScanLine, Package, Sparkles, Receipt, Bell, Store, Users, ShoppingBag, ListPlus, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
  { to: "/scan", label: "Scan Bill", icon: ScanLine },
  { to: "/marketplace", label: "Market", icon: ShoppingBag },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/catalog", label: "Catalog", icon: ListPlus },
  { to: "/integrations", label: "Integrations", icon: Link2 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground leading-tight">Hisaab Kitaab</h1>
            <p className="text-[11px] text-muted-foreground">Smart shop assistant</p>
          </div>
        </div>
        <nav className="px-3 py-2 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="m-3 p-4 rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow shrink-0">
          <p className="text-xs font-semibold opacity-90">Pro Tip</p>
          <p className="mt-1 text-sm leading-snug">Stock cold drinks 2x — summer demand rising.</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
              <Store className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Hisaab Kitaab</h1>
              <p className="text-[10px] text-muted-foreground">Welcome, Raju Bhai</p>
            </div>
          </div>
          <button className="relative h-9 w-9 rounded-lg bg-muted grid place-items-center">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert" />
          </button>
        </header>

        <main className="flex-1 px-4 md:px-8 py-6 pb-24 lg:pb-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border px-2 py-2 flex overflow-x-auto gap-1 hide-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 py-1.5 min-w-[64px] rounded-lg transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn("p-1.5 rounded-lg", isActive && "bg-primary-soft")}>
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
