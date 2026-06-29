import React from "react";
import { ArchComponent, ArchConnection } from "../types";
import { Laptop, Database, Key, Brain, Cloud, HelpCircle, ArrowRight, Share2 } from "lucide-react";

interface ArchitectureDiagramProps {
  components: ArchComponent[];
  connections: ArchConnection[];
  description: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  components,
  connections,
  description,
}) => {
  const [selectedComp, setSelectedComp] = React.useState<ArchComponent | null>(components[0] || null);

  const getIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Laptop className="w-5 h-5" />;
      case "database":
        return <Database className="w-5 h-5" />;
      case "auth":
        return <Key className="w-5 h-5" />;
      case "ai":
        return <Brain className="w-5 h-5" />;
      case "server":
        return <ArrowRight className="w-5 h-5" />;
      case "external":
      case "storage":
        return <Cloud className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getCompColor = (type: string) => {
    switch (type) {
      case "client":
        return "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-900 dark:text-indigo-300";
      case "server":
        return "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/30 dark:border-violet-900 dark:text-violet-300";
      case "database":
        return "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300";
      case "auth":
        return "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300";
      case "ai":
        return "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:border-fuchsia-900 dark:text-fuchsia-300";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300";
    }
  };

  // Find a component by ID to locate its center
  const getCompCoords = (id: string) => {
    const comp = components.find((c) => c.id === id);
    if (comp) {
      return { x: comp.x || 150, y: comp.y || 150 };
    }
    return { x: 100, y: 100 };
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="architecture-diagram-panel">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-500 animate-pulse" />
            Visual System Architecture & Flows
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Hover or click nodes to inspect architectural roles and gateway specifications.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Interactive Canvas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Drawing Canvas */}
        <div className="lg:col-span-3 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950/50 relative min-h-[380px] lg:min-h-[460px]">
          {/* Blueprint Dotted Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
            {/* Draw connections first (so nodes stand on top) */}
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-400 dark:fill-slate-600" />
              </marker>
            </defs>

            {connections.map((conn, index) => {
              const start = getCompCoords(conn.from);
              const end = getCompCoords(conn.to);
              
              // Calculate control points for subtle curve
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const midX = start.x + dx / 2;
              const midY = start.y + dy / 2 - (dx !== 0 ? 15 : 0); // curve up slightly

              return (
                <g key={index}>
                  {/* Connection Line */}
                  <path
                    d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                    fill="none"
                    className="stroke-slate-300 dark:stroke-slate-700"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrow)"
                  />
                  {/* Connection Label text container */}
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    className="font-mono text-[9px] font-semibold fill-slate-500 dark:fill-slate-400 bg-white dark:bg-slate-900 px-1"
                  >
                    {conn.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Render Interactive Nodes */}
          <div className="absolute inset-0 z-20 overflow-auto">
            {components.map((comp) => {
              const colorClass = getCompColor(comp.type);
              const isSelected = selectedComp?.id === comp.id;

              return (
                <div
                  key={comp.id}
                  style={{ left: `${comp.x}px`, top: `${comp.y}px` }}
                  onClick={() => setSelectedComp(comp)}
                  onMouseEnter={() => setSelectedComp(comp)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3 rounded-xl border-2 shadow-sm transition-all duration-200 flex flex-col items-center gap-1.5 w-[140px] text-center ${colorClass} ${
                    isSelected ? "ring-4 ring-indigo-500/20 scale-105 border-indigo-500 dark:border-indigo-400" : ""
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-white/80 dark:bg-black/20 shadow-xs">
                    {getIcon(comp.type)}
                  </div>
                  <div className="text-xs font-bold leading-tight truncate w-full">
                    {comp.name}
                  </div>
                  <div className="text-[9px] font-mono font-semibold uppercase tracking-wider opacity-85">
                    {comp.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Metadata Detail Panel */}
        <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              Component Details
            </h4>
            {selectedComp ? (
              <div className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    {getIcon(selectedComp.type)}
                    {selectedComp.type.toUpperCase()}
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2">
                    {selectedComp.name}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  {selectedComp.description}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500">
                Hover/click any architecture node to see specifications
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <h5 className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              CTO Notes
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
