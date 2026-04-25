import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard,
  Calendar,
  Receipt,
  Users,
  Settings,
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout, setRoute, currentRoute } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, route: 'admin' },
    { name: 'Properties', icon: Building2, route: 'admin-properties' },
    { name: 'All Bookings', icon: Calendar, route: 'admin-bookings' },
    { name: 'Transactions', icon: Receipt, route: 'admin-transactions' },
    { name: 'Users', icon: Users, route: 'admin-users' },
  ];

  // Filter navigation based on role (simple version)
  const filteredNav = currentUser?.role === 'admin' 
    ? navigation 
    : [
        { name: 'My Bookings', icon: CreditCard, route: 'pesanan' },
        { name: 'Favorites', icon: Building2, route: 'favorit' },
        { name: 'Settings', icon: Settings, route: 'settings' },
      ];

  const handleLogout = () => {
    logout();
    setRoute('home');
  };

  const handleNavigate = (route: string) => {
    setRoute(route);
    setSidebarOpen(false);
  };

  return (
    // FIX: Main container is h-screen and overflow-hidden to prevent body scroll
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed behavior on mobile, Flex column on Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2 font-bold text-xl text-emerald-600">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="tracking-tight">KostApp<span className="text-slate-400 font-normal text-sm ml-1">Ent.</span></span>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Workspace
            </p>
            {filteredNav.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.route)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                  currentRoute === item.route
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {currentRoute === item.route && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                )}
                <item.icon className={cn(
                  "w-4.5 h-4.5 transition-colors",
                  currentRoute === item.route ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {item.name}
              </button>
            ))}
          </div>
          
          <div>
             <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Support
            </p>
             <button
                onClick={() => handleNavigate('pusat-bantuan')}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
              >
                <User className="w-4.5 h-4.5 text-slate-400 group-hover:text-slate-600" />
                Help Center
              </button>
          </div>
        </nav>

        {/* User Profile Footer (Fixed at bottom of sidebar) */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <button 
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 transition-colors text-left" 
            onClick={() => handleNavigate('settings')}
          >
            <img 
              src={currentUser?.photo} 
              alt={currentUser?.name} 
              className="w-9 h-9 rounded-full border border-slate-200 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{currentUser?.name}</p>
              <p className="text-xs text-slate-500 truncate">{currentUser?.role === 'admin' ? 'Administrator' : 'Tenant'}</p>
            </div>
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full transition-all duration-300">
        
        {/* Top Header (Sticky) */}
        <header className="h-16 bg-white border-b border-slate-200 flex-shrink-0 flex items-center justify-between px-4 lg:px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Breadcrumb-like display */}
            <div className="hidden md:flex items-center text-sm">
              <span className="text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => setRoute('home')}>Home</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="font-semibold text-slate-800 capitalize">{currentRoute.replace(/-/g, ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Bar - Hidden on small mobile */}
            <div className="relative hidden sm:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-48 lg:w-64 transition-all"
              />
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
              >
                 <img 
                  src={currentUser?.photo} 
                  alt={currentUser?.name} 
                  className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                />
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-40 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                      <p className="text-sm font-semibold text-slate-900">Signed in as</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{currentUser?.contact}</p>
                    </div>
                    <div className="p-1">
                      <button 
                        onClick={() => { handleNavigate('settings'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" /> Account Settings
                      </button>
                      <button 
                        onClick={() => { setRoute('home'); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2 rounded-lg transition-colors"
                      >
                        <Building2 className="w-4 h-4" /> Public Homepage
                      </button>
                    </div>
                    <div className="p-1 border-t border-slate-50">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
