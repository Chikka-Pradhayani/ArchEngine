import React from "react";

interface MetricCardProps {
  score: number;
  title: string;
  subtitle: string;
  colorType: "indigo" | "emerald" | "amber" | "rose" | "fuchsia";
}

export const MetricCard: React.FC<MetricCardProps> = ({ score, title, subtitle, colorType }) => {
  // Determine tailwind color classes based on colorType or score
  let strokeColor = "stroke-indigo-600";
  let textColor = "text-indigo-600 dark:text-indigo-400";
  let bgColor = "bg-indigo-50 dark:bg-indigo-950/40";
  let badgeColor = "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200";

  if (colorType === "fuchsia") {
    strokeColor = "stroke-fuchsia-500";
    textColor = "text-fuchsia-600 dark:text-fuchsia-400";
    bgColor = "bg-fuchsia-50 dark:bg-fuchsia-950/30";
    badgeColor = "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/60 dark:text-fuchsia-200";
  } else if (colorType === "emerald" || (score >= 70 && colorType === "indigo")) {
    strokeColor = "stroke-emerald-500";
    textColor = "text-emerald-600 dark:text-emerald-400";
    bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
    badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200";
  } else if (colorType === "amber" || (score >= 40 && score < 70 && colorType === "indigo")) {
    strokeColor = "stroke-amber-500";
    textColor = "text-amber-600 dark:text-amber-400";
    bgColor = "bg-amber-50 dark:bg-amber-950/30";
    badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200";
  } else if (colorType === "rose" || (score < 40 && colorType === "indigo")) {
    strokeColor = "stroke-rose-500";
    textColor = "text-rose-600 dark:text-rose-400";
    bgColor = "bg-rose-50 dark:bg-rose-950/30";
    badgeColor = "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200";
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-5">
      <div className={`relative w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-full ${bgColor}`}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className={`transition-all duration-1000 ease-out ${strokeColor}`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-bold tracking-tight font-display ${textColor}`}>
            {score}
          </span>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-sans font-medium">/100</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-display">
            {title}
          </h4>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>
            {score >= 70 ? "Optimal" : score >= 40 ? "Caution" : "At Risk"}
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 line-clamp-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
