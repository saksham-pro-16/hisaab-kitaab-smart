import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ScanLine, Package, Sparkles, Receipt, Bell, Store, Users, ShoppingBag, ListPlus, Link2, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/scan", label: "Scan Bill", icon: ScanLine },
  { to: "/marketplace", label: "Market", icon: ShoppingBag },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/catalog", label: "Catalog", icon: ListPlus },
  { to: "/integrations", label: "Integrations", icon: Link2 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

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
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop header with profile button */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-8 py-4 items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
            <p className="text-sm text-muted-foreground">{user?.storeName || 'Your Store'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-10 w-10 rounded-full bg-muted hover:bg-muted/80 grid place-items-center transition-smooth">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert" />
            </button>

            {/* Profile Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-smooth grid place-items-center ring-2 ring-primary/20"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl border border-border shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-primary text-primary-foreground font-bold grid place-items-center">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{user?.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-left"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">View Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-left"
                      >
                        <Store className="h-4 w-4" />
                        <span className="text-sm font-medium">Store Settings</span>
                      </button>
                    </div>
                    <div className="p-2 border-t border-border">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-alert/10 text-alert transition-smooth text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
              <Store className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Hisaab Kitaab</h1>
              <p className="text-[10px] text-muted-foreground">Welcome, {user?.name?.split(' ')[0] || 'User'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative h-9 w-9 rounded-lg bg-muted grid place-items-center">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground font-bold grid place-items-center"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </button>
          </div>
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
