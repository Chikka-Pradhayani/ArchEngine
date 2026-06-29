import React from "react";
import { DeploymentAdvisor } from "../types";
import { Layout, Server, Database, Cloud, Check, AlertTriangle, ExternalLink } from "lucide-react";

interface DeploymentAdvisorCompProps {
  advisor: DeploymentAdvisor;
}

export const DeploymentAdvisorComp: React.FC<DeploymentAdvisorCompProps> = ({ advisor }) => {
  const [activeCategory, setActiveCategory] = React.useState<"frontend" | "backend" | "database" | "cloud">("frontend");

  const categories = [
    { key: "frontend", label: "Frontend Platforms", icon: <Layout className="w-4 h-4" /> },
    { key: "backend", label: "Backend API Hosting", icon: <Server className="w-4 h-4" /> },
    { key: "database", label: "Hosted Databases", icon: <Database className="w-4 h-4" /> },
    { key: "cloud", label: "General Cloud Services", icon: <Cloud className="w-4 h-4" /> },
  ] as const;

  const currentPlatforms = advisor[activeCategory] || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="deployment-advisor-portal">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-indigo-500" />
            Deployment & Ingress Architect Advisor
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Discover optimized cloud, edge hosting, and serverless node providers.
          </p>
        </div>

        {/* Tab switches */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentPlatforms.map((platform, idx) => (
          <div
            key={idx}
            className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-950 transition-all bg-slate-50/30 dark:bg-slate-950/10 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100 font-display">
                    {platform.platform}
                  </h4>
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                    {platform.pricing}
                  </span>
                </div>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Pros & Cons list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Advantages */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                    Advantages
                  </span>
                  {platform.advantages.map((adv, aIdx) => (
                    <div key={aIdx} className="flex gap-1.5 text-xs text-slate-650 dark:text-slate-350 leading-tight">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest block mb-1">
                    Limitations
                  </span>
                  {platform.limitations.map((lim, lIdx) => (
                    <div key={lIdx} className="flex gap-1.5 text-xs text-slate-650 dark:text-slate-350 leading-tight">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{lim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-150 dark:border-slate-850 flex justify-end">
              <span className="text-[9px] font-mono font-semibold text-slate-400">
                URL: {platform.link}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
