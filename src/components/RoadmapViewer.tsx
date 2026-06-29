import React from "react";
import { RoadmapWeek } from "../types";
import { Calendar, ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";

interface RoadmapViewerProps {
  weeks: RoadmapWeek[];
}

export const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ weeks }) => {
  const [expandedWeek, setExpandedWeek] = React.useState<number>(1);

  const toggleWeek = (weekNum: number) => {
    setExpandedWeek((prev) => (prev === weekNum ? 0 : weekNum));
  };

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("frontend") || cat.includes("ui") || cat.includes("ux")) {
      return "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900";
    }
    if (cat.includes("backend") || cat.includes("api")) {
      return "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-900";
    }
    if (cat.includes("database") || cat.includes("db") || cat.includes("schema")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900";
    }
    if (cat.includes("test") || cat.includes("quality")) {
      return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900";
    }
    if (cat.includes("deploy") || cat.includes("hosting") || cat.includes("ci/cd")) {
      return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900";
    }
    return "bg-slate-50 text-slate-700 border-slate-150 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-750";
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="roadmap-viewer">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Tactical Development Roadmap
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            A granular, sequential weekly task schedule tailored to your project goals and constraints.
          </p>
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-semibold">
          <Clock className="w-4 h-4 text-slate-300 dark:text-slate-600" />
          {weeks.length} Week Plan
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-y-1 before:left-6 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
        {weeks.map((wk) => {
          const isExpanded = expandedWeek === wk.week;

          return (
            <div
              key={wk.week}
              className={`relative z-10 transition-all duration-300 rounded-xl border ${
                isExpanded
                  ? "bg-indigo-50/20 dark:bg-indigo-950/5 border-indigo-200 dark:border-indigo-900"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {/* Header */}
              <div
                onClick={() => toggleWeek(wk.week)}
                className="flex items-center justify-between p-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  {/* Timeline Badge */}
                  <div
                    className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isExpanded
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {wk.week}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                      Week {wk.week}
                    </h4>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                      {wk.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline-block font-semibold">
                    {wk.tasks.length} subtasks
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Tasks List */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-150 dark:border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {wk.tasks.map((task, index) => {
                      const badgeClass = getCategoryColor(task.category);

                      return (
                        <div
                          key={index}
                          className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-3 shadow-xs items-start"
                        >
                          <CheckCircle2 className="w-4.5 h-4.5 text-slate-300 dark:text-slate-700 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${badgeClass}`}
                              >
                                {task.category}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-medium">
                                {task.duration}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                              {task.task}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
