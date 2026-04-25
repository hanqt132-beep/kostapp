import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  color?: "slate" | "emerald" | "indigo" | "rose";
  delay?: number;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = "slate",
  delay = 0 
}: StatsCardProps) => {
  
  const colorStyles = {
    slate: "bg-slate-50 text-slate-600 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <div 
      className={cn(
        "glass-panel p-6 rounded-xl flex flex-col justify-between h-full animate-enter hover:shadow-md transition-shadow duration-300",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-lg border", colorStyles[color])}>
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border",
            trend.positive 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-rose-50 text-rose-700 border-rose-100"
          )}>
            {trend.positive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
          {trend && (
            <span className="text-xs text-slate-400 font-medium">
              {trend.label}
            </span>
          )}
        </div>
      </div>

      {/* Decorative Sparkline (Simulated) */}
      <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
         {[...Array(12)].map((_, i) => (
           <div 
             key={i} 
             className={cn(
               "h-full flex-1 rounded-full opacity-60",
               color === "slate" ? "bg-slate-300" :
               color === "emerald" ? "bg-emerald-300" :
               color === "indigo" ? "bg-indigo-300" : "bg-rose-300"
             )}
             style={{ 
               height: `${30 + Math.random() * 70}%`,
               marginTop: 'auto' 
             }} 
           />
         ))}
      </div>
    </div>
  );
};
