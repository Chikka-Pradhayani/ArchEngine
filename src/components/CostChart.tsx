import React from "react";
import { CostEstimation, AlternativeStacks } from "../types";
import { DollarSign, BarChart3, Receipt, Globe, Cpu, Server, Database, Activity } from "lucide-react";

interface CostChartProps {
  cost: CostEstimation;
  alternativeStacks: AlternativeStacks;
}

export const CostChart: React.FC<CostChartProps> = ({ cost, alternativeStacks }) => {
  const [activeTier, setActiveTier] = React.useState<"current" | "student" | "budget" | "production" | "enterprise">("current");

  const categories = [
    { label: "Hosting / Cloud Node", value: cost.hosting, icon: <Server className="w-4 h-4 text-indigo-500" /> },
    { label: "Database Operations", value: cost.database, icon: <Database className="w-4 h-4 text-emerald-500" /> },
    { label: "Storage Capacity", value: cost.storage, icon: <DollarSign className="w-4 h-4 text-sky-500" /> },
    { label: "AI Models & API Calls", value: cost.aiApi, icon: <Cpu className="w-4 h-4 text-fuchsia-500" /> },
    { label: "Telemetry & Monitoring", value: cost.monitoring, icon: <Activity className="w-4 h-4 text-amber-500" /> },
    { label: "Domain Names (Prorated)", value: +(cost.domain / 12).toFixed(2), icon: <Globe className="w-4 h-4 text-slate-500" /> },
  ];

  const maxVal = Math.max(...categories.map((c) => c.value), 1);

  // Alternative Tiers info mapping
  const tierDetails = {
    current: {
      name: "Your Custom Proposal Estimate",
      cost: `$${cost.monthlyTotal.toFixed(2)}/mo`,
      pros: ["Tailored specifically to your description constraints", "Bridges team available techs and budget boundaries"],
      cons: ["May require hosting setup modifications if budget is low"],
      components: ["Custom Frontend Hosting", "Custom Server API Node", "PostgreSQL database"],
    },
    student: {
      name: "Student Free Tier Stack",
      cost: alternativeStacks.studentFreeTier.cost,
      pros: alternativeStacks.studentFreeTier.pros,
      cons: alternativeStacks.studentFreeTier.cons,
      components: alternativeStacks.studentFreeTier.components,
    },
    budget: {
      name: "Budget-Friendly Stack",
      cost: alternativeStacks.budgetFriendly.cost,
      pros: alternativeStacks.budgetFriendly.pros,
      cons: alternativeStacks.budgetFriendly.cons,
      components: alternativeStacks.budgetFriendly.components,
    },
    production: {
      name: "Production-Ready Stack",
      cost: alternativeStacks.productionReady.cost,
      pros: alternativeStacks.productionReady.pros,
      cons: alternativeStacks.productionReady.cons,
      components: alternativeStacks.productionReady.components,
    },
    enterprise: {
      name: "Enterprise Multi-Zone Stack",
      cost: alternativeStacks.enterprise.cost,
      pros: alternativeStacks.enterprise.pros,
      cons: alternativeStacks.enterprise.cons,
      components: alternativeStacks.enterprise.components,
    },
  };

  const selectedTier = tierDetails[activeTier];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="cost-analysis-chart">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5 gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Infrastructure Cost Estimator & Stack Explorer
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Compare monthly projections and explore alternative pre-optimized pricing tiers.
          </p>
        </div>
        
        {/* Toggle selectors */}
        <div className="flex flex-wrap gap-1">
          {(["current", "student", "budget", "production", "enterprise"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTier === tier
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {tier === "current" ? "Your Estimate" : tier === "student" ? "Free Tier" : tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Cost breakdown progress chart */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            Monthly Running Cost Breakdown (USD / mo)
          </h4>
          
          <div className="space-y-3.5">
            {categories.map((cat, idx) => {
              const percentage = (cat.value / maxVal) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                      {cat.icon}
                      {cat.label}
                    </div>
                    <span className="font-mono text-slate-800 dark:text-slate-100 font-bold">${cat.value.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Summed Monthly Total
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-white font-display mt-0.5 block">
                ${cost.monthlyTotal.toFixed(2)}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Summed Annualized Total
              </span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-display mt-0.5 block">
                ${cost.annualTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Tier comparative info panel */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Receipt className="w-4 h-4 text-indigo-500" />
              Tier Comparison Node
            </div>
            <h4 className="text-base font-bold text-slate-850 dark:text-slate-100 font-display">
              {selectedTier.name}
            </h4>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
              {selectedTier.cost}
            </div>

            {/* Components list */}
            <div className="mt-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Included Services
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedTier.components.map((comp, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="mt-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  Pros
                </span>
                <ul className="text-xs text-slate-650 dark:text-slate-350 list-disc pl-4 space-y-0.5">
                  {selectedTier.pros.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              {selectedTier.cons.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider block mb-1">
                    Cons / Limits
                  </span>
                  <ul className="text-xs text-slate-650 dark:text-slate-350 list-disc pl-4 space-y-0.5">
                    {selectedTier.cons.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            *Labor development costs are excluded from hosting metrics.
          </div>
        </div>
      </div>
    </div>
  );
};
