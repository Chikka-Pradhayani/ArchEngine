import React from "react";
import Markdown from "react-markdown";
import { Documents } from "../types";
import { FileText, Copy, Download, Check, Layout, BookOpen, Presentation, Scroll } from "lucide-react";

interface DocumentDownloaderProps {
  documents: Documents;
  projectTitle: string;
}

type DocKey = keyof Documents;

export const DocumentDownloader: React.FC<DocumentDownloaderProps> = ({ documents, projectTitle }) => {
  const [activeTab, setActiveTab] = React.useState<DocKey>("readme");
  const [copied, setCopied] = React.useState<boolean>(false);

  const tabs: { key: DocKey; label: string; icon: React.ReactNode }[] = [
    { key: "readme", label: "README.md", icon: <FileText className="w-4 h-4" /> },
    { key: "proposal", label: "Project Proposal", icon: <BookOpen className="w-4 h-4" /> },
    { key: "srs", label: "SRS Document", icon: <Scroll className="w-4 h-4" /> },
    { key: "pptStructure", label: "PPT Deck Structure", icon: <Presentation className="w-4 h-4" /> },
    { key: "capstoneStructure", label: "Capstone Report Structure", icon: <Layout className="w-4 h-4" /> },
  ];

  const getDocName = (key: DocKey): string => {
    switch (key) {
      case "readme":
        return "README.md";
      case "proposal":
        return "PROJECT_PROPOSAL.md";
      case "srs":
        return "SOFTWARE_REQUIREMENTS_SPECIFICATION.md";
      case "pptStructure":
        return "PRESENTATION_DECK_STRUCTURE.md";
      case "capstoneStructure":
        return "CAPSTONE_REPORT_STRUCTURE.md";
      default:
        return "DOCUMENT.md";
    }
  };

  const currentContent = documents[activeTab] || "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownload = () => {
    const filename = `${projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${getDocName(activeTab)}`;
    const blob = new Blob([currentContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm" id="document-downloader">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-150 dark:border-slate-800">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Scroll className="w-5 h-5 text-indigo-500" />
            Software Blueprint & Documentation Generator
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            AI-authored enterprise documentation ready to copy or download.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-250 dark:border-slate-700 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy to Clipboard
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download .MD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Hand Navigation Links */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/20"
                    : "text-slate-650 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Markdown Document Display */}
        <div className="lg:col-span-3 border border-slate-150 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 max-h-[500px] overflow-y-auto p-5 md:p-6 lg:p-8">
          <div className="markdown-body text-slate-750 dark:text-slate-350 text-sm leading-relaxed prose dark:prose-invert prose-indigo max-w-none">
            <Markdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 mt-1" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-base font-bold font-display text-slate-800 dark:text-slate-100 mb-3 mt-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-sm font-semibold text-slate-850 dark:text-slate-200 mb-2 mt-3" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                code: ({ node, ...props }) => <code className="bg-slate-200/60 dark:bg-slate-800 font-mono text-xs px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-medium" {...props} />,
                pre: ({ node, ...props }) => <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-4" {...props} />,
                table: ({ node, ...props }) => <table className="w-full border-collapse border border-slate-200 dark:border-slate-800 mb-4 text-xs text-left" {...props} />,
                th: ({ node, ...props }) => <th className="bg-slate-100 dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800 font-semibold" {...props} />,
                td: ({ node, ...props }) => <td className="p-2 border border-slate-200 dark:border-slate-800" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 dark:text-slate-400 mb-4" {...props} />,
              }}
            >
              {currentContent}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
