import { LucideIcon, CheckCircle, AlertCircle, Clock, UserPlus, FileText, CreditCard } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatDateTime } from "../../utils/helpers";

interface ActivityItem {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

// Mock Data generator for visual purposes
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "success",
    title: "New Booking Confirmed",
    description: "Booking #BK-2024-001 has been fully paid.",
    timestamp: new Date().toISOString(),
    user: "Sarah Johnson"
  },
  {
    id: "2",
    type: "info",
    title: "System Update",
    description: "Database backup completed successfully.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "System"
  },
  {
    id: "3",
    type: "warning",
    title: "Payment Verification Required",
    description: "User uploaded transfer proof for Kost Navi.",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "Budi Santoso"
  },
  {
    id: "4",
    type: "info",
    title: "New User Registration",
    description: "Account created via email verification.",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    user: "Rina Kartika"
  }
];

const icons: Record<string, LucideIcon> = {
  success: CheckCircle,
  warning: AlertCircle,
  info: FileText,
  error: AlertCircle
};

const colors: Record<string, string> = {
  success: "text-emerald-600 bg-emerald-50 border-emerald-100",
  warning: "text-amber-600 bg-amber-50 border-amber-100",
  info: "text-indigo-600 bg-indigo-50 border-indigo-100",
  error: "text-rose-600 bg-rose-50 border-rose-100"
};

export const ActivityFeed = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Recent Activity</h3>
        <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline">View Log</button>
      </div>
      
      <div className="overflow-y-auto max-h-[320px] p-2">
        {mockActivities.map((item, idx) => {
          const Icon = icons[item.type];
          return (
            <div 
              key={item.id} 
              className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors group animate-enter"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border shrink-0 mt-0.5",
                colors[item.type]
              )}>
                <Icon size={14} strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <p className="text-sm font-semibold text-slate-800 truncate pr-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </p>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {formatDateTime(item.timestamp).split(',')[1]}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                {item.user && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                      {item.user.charAt(0)}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{item.user}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
