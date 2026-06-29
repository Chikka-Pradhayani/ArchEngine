import React from "react";
import { DbTable } from "../types";
import { Table, Key, Link2, ShieldCheck, Database } from "lucide-react";

interface DbSchemaViewerProps {
  tables: DbTable[];
  description: string;
}

export const DbSchemaViewer: React.FC<DbSchemaViewerProps> = ({ tables, description }) => {
  const [activeTable, setActiveTable] = React.useState<string>(tables[0]?.name || "");

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="db-schema-viewer">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5 gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-500" />
            PostgreSQL Database Schema
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Architected relational tables with primary keys, types, and relational constraints.
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {tables.map((table) => (
            <button
              key={table.name}
              onClick={() => setActiveTable(table.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                activeTable === table.name
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {table.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Schema Inspector Card */}
        <div className="lg:col-span-2 space-y-4">
          {tables.map((table) => {
            if (table.name !== activeTable) return null;

            return (
              <div
                key={table.name}
                className="border border-emerald-100 dark:border-emerald-950/60 rounded-xl overflow-hidden shadow-sm bg-slate-50/50 dark:bg-slate-950/20"
              >
                <div className="bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 border-b border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Table className="w-4.5 h-4.5" />
                    <span className="font-mono font-bold text-sm">{table.name}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                    {table.columns.length} columns
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/50">
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Column</th>
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Type</th>
                        <th className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Constraints & Keys</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 dark:divide-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {table.columns.map((col, idx) => {
                        const isPk = col.constraints.toLowerCase().includes("primary key");
                        const isFk = col.constraints.toLowerCase().includes("references");

                        return (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                            <td className="px-4 py-3 flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                              {isPk && <Key className="w-3.5 h-3.5 text-amber-500" />}
                              {isFk && <Link2 className="w-3.5 h-3.5 text-indigo-400" />}
                              {!isPk && !isFk && <div className="w-3.5 h-3.5" />}
                              {col.name}
                            </td>
                            <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                              {col.type}
                            </td>
                            <td className="px-4 py-3 text-[11px]">
                              {isPk && <span className="bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900 px-1.5 py-0.5 rounded mr-1">PRIMARY KEY</span>}
                              {isFk && <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900 px-1.5 py-0.5 rounded mr-1">FOREIGN KEY</span>}
                              <span className="opacity-75">{col.constraints.replace(/primary key/gi, "").replace(/references.*/gi, "")}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* Database Architectural Justification Panel */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/50 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1 mb-3">
              <ShieldCheck className="w-4 h-4" />
              Database Architectural Guardrails
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-100 dark:border-emerald-950 font-mono text-[11px] text-emerald-800 dark:text-emerald-300 space-y-2">
            <div className="flex justify-between">
              <span>Primary DB Type:</span>
              <span className="font-bold">PostgreSQL</span>
            </div>
            <div className="flex justify-between">
              <span>Entity Relationships:</span>
              <span className="font-bold">Enforced Relational</span>
            </div>
            <div className="flex justify-between">
              <span>Index Strategy:</span>
              <span className="font-bold">PK Auto, custom FK indices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
