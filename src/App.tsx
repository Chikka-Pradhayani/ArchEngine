import React, { useState, useEffect } from "react";
import { ProjectInputs, AnalysisResponse } from "./types";
import { ProjectForm } from "./components/ProjectForm";
import { MetricCard } from "./components/MetricCard";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { DbSchemaViewer } from "./components/DbSchemaViewer";
import { RoadmapViewer } from "./components/RoadmapViewer";
import { DocumentDownloader } from "./components/DocumentDownloader";
import { CostChart } from "./components/CostChart";
import { DeploymentAdvisorComp } from "./components/DeploymentAdvisorComp";
import { GoogleGenAI } from "@google/genai";

import {
  Sun,
  Moon,
  Sparkles,
  AlertTriangle,
  Users,
  CheckCircle,
  Clock,
  ShieldAlert,
  RefreshCw,
  Layout,
  Terminal,
  BookOpen,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Brain,
  Layers,
  Database,
  Calendar,
  DollarSign,
  Scroll,
  Printer,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";

const SYSTEM_INSTRUCTION = `You are a highly experienced CTO, Solution Architect, Technical Lead, and Software Project Mentor. 
Your goal is to evaluate software project proposals for feasibility, success probability, costs, technical risks, and architecture.
You must be extremely realistic, rigorous, and objective. Never sugarcoat findings. If a project is unrealistic given its timeline, budget, or team skills, explain exactly why and suggest a realistic MVP in the realityCheck module.

You must return a single, valid, raw JSON object that maps perfectly to the following typescript interface:
interface MetricAnalysis {
  score: number; // 0-100
  details: string;
}
interface StackDetail {
  name: string;
  justification: string;
}
interface RecommendedStack {
  frontend: StackDetail;
  backend: StackDetail;
  database: StackDetail;
  auth: StackDetail;
  cloud: StackDetail;
  ai: StackDetail;
  monitoring: StackDetail;
}
interface AlternativeStack {
  cost: string;
  pros: string[];
  cons: string[];
  components: string[];
}
interface AlternativeStacks {
  studentFreeTier: AlternativeStack;
  budgetFriendly: AlternativeStack;
  productionReady: AlternativeStack;
  enterprise: AlternativeStack;
}
interface CostEstimation {
  development: number; // estimated development labor value in USD if hired out, or 0 if team-internal
  hosting: number; // monthly hosting in USD
  domain: number; // annual domain cost in USD
  database: number; // monthly database cost in USD
  storage: number; // monthly storage cost in USD
  aiApi: number; // monthly AI API cost in USD
  monitoring: number; // monthly monitoring cost in USD
  monthlyTotal: number;
  annualTotal: number;
}
interface DeploymentPlatform {
  platform: string;
  link: string;
  pricing: string;
  advantages: string[];
  limitations: string[];
}
interface DeploymentAdvisor {
  frontend: DeploymentPlatform[];
  backend: DeploymentPlatform[];
  database: DeploymentPlatform[];
  cloud: DeploymentPlatform[];
}
interface ArchComponent {
  id: string; // e.g. "ui", "api", "db", "auth", "gemini", "storage"
  name: string;
  type: 'client' | 'server' | 'database' | 'auth' | 'ai' | 'external';
  description: string;
  x: number; // Coordinate for visual plotting, standard bounds 100 to 700
  y: number; // Coordinate for visual plotting, standard bounds 100 to 500
}
interface ArchConnection {
  from: string; // matches id of component
  to: string; // matches id of component
  label: string; // description of flow
}
interface DbTableColumn {
  name: string;
  type: string;
  constraints: string;
}
interface DbTable {
  name: string;
  columns: DbTableColumn[];
}
interface ApiEndpoint {
  method: string;
  path: string;
  desc: string;
  payload: string;
  response: string;
}
interface ArchitectureData {
  systemArchitectureDesc: string;
  components: ArchComponent[];
  connections: ArchConnection[];
  databaseSchemaDesc: string;
  dbTables: DbTable[];
  apiFlowDesc: string;
  apiEndpoints: ApiEndpoint[];
  deploymentArchitectureDesc: string;
}
interface RoadmapTask {
  category: string;
  task: string;
  duration: string;
}
interface RoadmapWeek {
  week: number;
  title: string;
  tasks: RoadmapTask[];
}
interface MaintenancePrediction {
  monthlyHours: number;
  bugFixingEffort: string;
  scalingRequirements: string;
  databaseGrowth: string;
  infrastructureUpgrades: string;
}
interface RiskItem {
  category: 'Technical' | 'Financial' | 'Security' | 'Scalability' | 'Timeline';
  risk: string;
  severity: 'Low' | 'Medium' | 'High';
  mitigation: string;
}
interface RealityCheck {
  isRealistic: boolean;
  verdict: string;
  mvpSuggestion: string; // Concrete suggestion on what they should actually build if their proposal is unrealistic, or how to phase it.
}
interface SimilarProject {
  type: 'GitHub Repository' | 'Existing Product' | 'Competitor' | 'Alternative Approach';
  name: string;
  url: string;
  description: string;
}
interface Documents {
  readme: string; // Full markdown content for README.md with clear structure, setup, and features
  proposal: string; // Full markdown content for Project Proposal
  srs: string; // Full markdown content for Software Requirements Specification (SRS)
  pptStructure: string; // Full markdown content detailing a slide-by-slide presentation outline
  capstoneStructure: string; // Full markdown content detailing a capstone/thesis report structure
}
interface LearningRoadmapTopic {
  topic: string;
  resource: string;
  duration: string;
}
interface AnalysisResponse {
  feasibilityScore: number; // 0-100 overall
  feasibilityExplanation: string;
  complexityAnalysis: MetricAnalysis;
  budgetAnalysis: MetricAnalysis;
  timelineAnalysis: MetricAnalysis;
  teamCapabilityAnalysis: MetricAnalysis;
  successProbability: number; // 0-100
  successExplanation: string;
  strengths: string[];
  weaknesses: string[];
  bottlenecks: string[];
  innovationScore: number; // 0-100
  innovationDetails: string;
  saturationLevel: 'Low' | 'Medium' | 'High';
  suggestionsForUniqueness: string[];
  competitorComparison: string;
  recommendedTeamSize: number;
  requiredRoles: string[];
  missingSkillsRoadmap: string[];
  suggestedLearningRoadmap: LearningRoadmapTopic[];
  recommendedStack: RecommendedStack;
  alternativeStacks: AlternativeStacks;
  costEstimation: CostEstimation;
  deploymentAdvisor: DeploymentAdvisor;
  architecture: ArchitectureData;
  developmentRoadmap: RoadmapWeek[];
  maintenancePrediction: MaintenancePrediction;
  riskAnalysis: RiskItem[];
  realityCheck: RealityCheck;
  similarProjects: SimilarProject[];
  documentation: Documents;
}

Guidelines for generating fields:
1. Architectural diagram components should have unique coordinates (x and y) between 100-700 and 100-500 so they look tidy when rendered. Standard components should represent client apps, server gateways, databases, cloud bucket storage, auth microservices, and AI APIs.
2. Deployment Advisor: Include real services like Vercel, Netlify, Railway, Render, Fly.io, Supabase, Neon, MongoDB Atlas, AWS, Azure, Google Cloud with exact pricing notes and valid links (e.g. "https://vercel.com", "https://railway.app", etc.).
3. Database schema: design 3-5 key relational database tables that represent the core features of the app, complete with realistic column types and foreign key constraint labels.
4. Roadmaps: Produce a week-by-week timeline based on the project's deadline and constraints. If the user's deadline is 30 days, generate a 4-week roadmap. If it's 90 days, generate a 12-week or 6-biweekly phase roadmap.
5. README, SRS, and Proposal markdown: Provide detailed, highly comprehensive, fully formatted markdown texts in the documentation field. Avoid brief summaries. The user wants to copy these texts to jumpstart their project.
6. Return ONLY a valid JSON object. No pre-text or post-text.`;

const buildUserPrompt = (inputs: ProjectInputs) => `
Analyze the following project proposal details and return a complete feasibility report and project blueprint in the requested JSON structure.

--- PROJECT DETAILS ---
Title: ${inputs.title}
Description: ${inputs.description}
Category: ${inputs.category}
Target Users: ${inputs.targetUsers}
Expected Number of Users: ${inputs.expectedUsers}

--- TEAM DETAILS ---
Team Size: ${inputs.teamSize}
Skill Level: ${inputs.skillLevel}
Available Technologies: ${inputs.availableTech}
Missing Skills: ${inputs.missingSkills}

--- CONSTRAINTS ---
Budget: $${inputs.budget}
Deadline: ${inputs.deadline} days
Weekly Available Hours: ${inputs.weeklyHours} hours
Project Type: ${inputs.projectType}
`;

export default function App() {
  const [inputs, setInputs] = useState<ProjectInputs | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to a gorgeous Dark Mode
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Client Side Direct Mode Configuration
  const [clientApiKey, setClientApiKey] = useState<string>(() => localStorage.getItem("arch_engine_api_key") || "");
  const [useClientSide, setUseClientSide] = useState<boolean>(() => localStorage.getItem("arch_engine_use_client_side") === "true");

  // Manage dark mode classes on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const evaluateProjectClientSide = async (inputs: ProjectInputs, apiKey: string): Promise<AnalysisResponse> => {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-client",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: buildUserPrompt(inputs),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from direct Gemini API call.");
    }

    try {
      return JSON.parse(responseText.trim());
    } catch (err) {
      // Attempt markdown block clean-up
      const cleaned = responseText
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      return JSON.parse(cleaned);
    }
  };

  const handleEvaluateProject = async (formData: ProjectInputs) => {
    setLoading(true);
    setError(null);
    setInputs(formData);

    try {
      let result: AnalysisResponse;

      if (useClientSide && clientApiKey) {
        result = await evaluateProjectClientSide(formData, clientApiKey);
      } else {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        let responseText = "";
        try {
          responseText = await response.text();
        } catch (readErr) {
          throw new Error("Unable to read the response from the server.");
        }

        if (!response.ok) {
          let backendError = "Server responded with an error.";
          try {
            const parsedError = JSON.parse(responseText);
            backendError = parsedError.error || backendError;
          } catch (e) {
            backendError = responseText.substring(0, 300) || `HTTP status ${response.status}`;
          }
          throw new Error(`[Backend Response] ${backendError}`);
        }

        try {
          result = JSON.parse(responseText);
        } catch (parseErr) {
          console.error("Parse error. Raw response text was:", responseText);
          throw new Error(
            `The server returned a non-JSON response (likely an HTML error page from a static hosting provider or misconfigured proxy router). This typically happens when the Express server is not running or is deployed as client-side only.\n\nResponse Preview:\n"${responseText.substring(0, 120)}..."`
          );
        }
      }

      setAnalysisResult(result);
      setActiveTab("dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during evaluation.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setInputs(null);
  };

  // Helper for printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/25">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-wide uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                ArchEngine
              </span>
              <span className="hidden md:inline-block text-xs text-slate-400 dark:text-slate-500 ml-2 font-mono font-bold">
                Project Architect & Feasibility Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 transition cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            {analysisResult && (
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Print Report"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Report</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-5 rounded-2xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/10 text-rose-800 dark:text-rose-300 text-xs flex gap-4 items-start">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold mb-1 text-sm text-rose-900 dark:text-rose-200">Architecture Analysis Failure</h4>
              <p className="leading-relaxed whitespace-pre-wrap font-mono text-[11px] bg-white/40 dark:bg-slate-950/40 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950/20">{error}</p>
              
              {/* Intelligent Client-Side Direct Mode Fallback suggestion */}
              {(error.includes("Unexpected token") || error.includes("non-JSON") || error.includes("proxy") || error.includes("router") || error.includes("Express")) && (
                <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 animate-bounce" />
                    💡 Deploying on GitHub Pages, Netlify, or Vercel?
                  </div>
                  <p className="text-slate-650 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
                    Static web hosts serve only static frontend files and do not automatically boot the full-stack Express server, which is why request path <code>/api/analyze</code> returns HTML fallback page.
                    <br /><br />
                    To run successfully on static hosts, you can switch to <strong>Direct Client Mode</strong>, which queries the official Google Gemini API directly from your browser!
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        setUseClientSide(true);
                        localStorage.setItem("arch_engine_use_client_side", "true");
                        setError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition cursor-pointer shadow-sm shadow-indigo-600/20"
                    >
                      Enable Direct Client Mode
                    </button>
                    <button
                      onClick={() => setError(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-150 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition cursor-pointer"
                    >
                      Dismiss Error
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Home Screen (Form) */}
        {!analysisResult && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Promo / Info Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  CTO & Solution Architect Agent
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight text-slate-850 dark:text-white">
                  Is your software idea actually{" "}
                  <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    feasible?
                  </span>
                </h1>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Avoid costly software architectural mistakes. ArchEngine acts as a Technical Lead, Project Manager, Cost Estimator, and Deployment Consultant to analyze feasibility, design relational schemas, layout roadmaps, and generate complete documentation.
                </p>
              </div>

              {/* Roles list */}
              <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Integrated Engineering Modules
                </h3>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Rigorously calculated Feasibility Score</span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Whiteboard component diagrams with visual coordinates</span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Comprehensive relational Database Schemas</span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Realistic cost estimation & hosting models</span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Week-by-week development timeline roadmaps</span>
                  </div>
                  <div className="flex gap-2 items-center text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Full documentation portal (.MD exports)</span>
                  </div>
                </div>
              </div>

              {/* Direct Client-side Configuration Widget */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-500" />
                    Direct Client Mode
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useClientSide}
                      onChange={(e) => {
                        setUseClientSide(e.target.checked);
                        localStorage.setItem("arch_engine_use_client_side", String(e.target.checked));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-slate-600 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {useClientSide ? (
                  <div className="space-y-3">
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Queries the Google Gemini API directly from your browser. <strong>Recommended for GitHub Pages, Vercel, Netlify static deployments.</strong>
                    </p>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Google Gemini API Key
                      </label>
                      <input
                        type="password"
                        placeholder="Paste your Gemini API Key (AIzaSy...)"
                        value={clientApiKey}
                        onChange={(e) => {
                          setClientApiKey(e.target.value);
                          localStorage.setItem("arch_engine_api_key", e.target.value);
                        }}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono transition-colors"
                      />
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal pt-1">
                        Get a free key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Google AI Studio</a>. Keys are saved securely in your browser's local storage.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    Requests are processed via the companion full-stack Express server proxy (<code>/api/analyze</code>).
                  </p>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-8">
              <ProjectForm onSubmit={handleEvaluateProject} loading={loading} />
            </div>
          </div>
        )}

        {/* Dashboard Results Screen */}
        {analysisResult && (
          <div className="space-y-6" id="dashboard-results-panel">
            {/* Header meta */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-indigo-500 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Form
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                      {inputs?.projectType}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-medium">
                      Deadline: {inputs?.deadline} Days
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white mt-1">
                    {inputs?.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Evaluate Another Idea
                </button>
              </div>
            </div>

            {/* Tabbed Navigation bar */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 pb-1 bg-slate-50/50 dark:bg-slate-950/50 p-1 rounded-xl">
              {[
                { key: "dashboard", label: "Overview", icon: <Layout className="w-4 h-4" /> },
                { key: "architecture", label: "Architecture", icon: <Layers className="w-4 h-4" /> },
                { key: "database", label: "Database Schema", icon: <Database className="w-4 h-4" /> },
                { key: "roadmap", label: "Timeline Roadmap", icon: <Calendar className="w-4 h-4" /> },
                { key: "costs", label: "Cost & Stacks", icon: <DollarSign className="w-4 h-4" /> },
                { key: "documentation", label: "Documentation Docs", icon: <Scroll className="w-4 h-4" /> },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-800/80 font-bold"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-900/30"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT SWITCH */}
            <div className="space-y-6">
              {/* TAB 1: EXECUTIVE DASHBOARD */}
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Scores Grid */}
                  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MetricCard
                      score={analysisResult.feasibilityScore}
                      title="Feasibility Score"
                      subtitle={analysisResult.feasibilityExplanation}
                      colorType="indigo"
                    />
                    <MetricCard
                      score={analysisResult.successProbability}
                      title="Success Probability"
                      subtitle={analysisResult.successExplanation}
                      colorType="emerald"
                    />
                    <MetricCard
                      score={analysisResult.innovationScore}
                      title="Innovation Score"
                      subtitle={analysisResult.innovationDetails}
                      colorType="fuchsia"
                    />
                  </div>

                  {/* Reality Check Module (Prominent Block) */}
                  <div className="lg:col-span-3 bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/20 dark:to-amber-950/5 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center gap-2 mb-3 text-amber-800 dark:text-amber-300">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
                      <h3 className="font-display text-base font-bold tracking-tight">
                        Reality Check Module Verdict
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 border-r border-amber-200 dark:border-amber-900/55 pr-4 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest block mb-1">
                          Achievability Status
                        </span>
                        <span
                          className={`text-base font-extrabold flex items-center gap-1.5 ${
                            analysisResult.realityCheck.isRealistic
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {analysisResult.realityCheck.isRealistic ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Highly Realistic
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-5 h-5" />
                              Extremely High Risk
                            </>
                          )}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                          {analysisResult.realityCheck.verdict}
                        </p>
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest block">
                          Suggested Minimum Viable Product (MVP) Scope
                        </span>
                        <div className="text-xs text-slate-700 dark:text-slate-350 bg-white/80 dark:bg-black/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 leading-relaxed font-medium">
                          {analysisResult.realityCheck.mvpSuggestion}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left Column (Team Cap & Risks) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Risk Registry */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                      <h3 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <ShieldAlert className="w-4.5 h-4.5 text-rose-500" />
                        Risk Analysis Registry & Mitigation
                      </h3>
                      <div className="space-y-4">
                        {analysisResult.riskAnalysis.map((item, index) => {
                          const isHigh = item.severity.toLowerCase() === "high";
                          const isMed = item.severity.toLowerCase() === "medium";

                          return (
                            <div
                              key={index}
                              className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2 hover:border-slate-250 dark:hover:border-slate-700 transition"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {item.category} Risk
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    — {item.risk}
                                  </span>
                                </div>
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    isHigh
                                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400"
                                      : isMed
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                                  }`}
                                >
                                  {item.severity}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium pl-1.5 border-l-2 border-indigo-500/50">
                                <span className="font-semibold text-slate-650 dark:text-slate-300">Mitigation:</span> {item.mitigation}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team Capabilities & Roadmap */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                      <h3 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <Users className="w-4.5 h-4.5 text-indigo-500" />
                        Team Structure & Learning Roadmap
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                            Recommended Size
                          </span>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {analysisResult.recommendedTeamSize} Engineers
                          </span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                            Required Project Roles
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {analysisResult.requiredRoles.map((role, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Upskilling plan */}
                      <div>
                        <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block mb-3">
                          Suggested Learning Roadmap (Up-skilling)
                        </span>
                        <div className="space-y-3">
                          {analysisResult.suggestedLearningRoadmap.map((item, idx) => (
                            <div key={idx} className="flex gap-3 text-xs border-b border-slate-100 dark:border-slate-800/60 pb-3 last:border-0 last:pb-0">
                              <div className="w-6.5 h-6.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex-shrink-0 flex items-center justify-center font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-slate-800 dark:text-slate-200">{item.topic}</h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  Duration: <span className="font-semibold text-slate-700 dark:text-slate-350">{item.duration}</span> | Recommended: <span className="font-semibold text-indigo-500 dark:text-indigo-400 underline">{item.resource}</span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Similar projects & Maintenance) */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Similar Project Discovery */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                      <h3 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <BookOpen className="w-4.5 h-4.5 text-fuchsia-500" />
                        Similar Project Discovery
                      </h3>
                      <div className="space-y-4">
                        {analysisResult.similarProjects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20"
                          >
                            <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest font-mono">
                              {proj.type}
                            </span>
                            <div className="flex items-center justify-between gap-1.5 mt-0.5 mb-1.5">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate flex-1">
                                {proj.name}
                              </h4>
                              {proj.url && proj.url.startsWith("http") && (
                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-400 hover:text-indigo-500 flex-shrink-0"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                              {proj.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Maintenance & Scaling Prediction */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                      <h3 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <Clock className="w-4.5 h-4.5 text-amber-500" />
                        Operations & Maintenance Projections
                      </h3>
                      <div className="space-y-3.5 text-xs">
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
                          <span className="text-slate-500">Monthly Mtce Hours:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{analysisResult.maintenancePrediction.monthlyHours} Hrs</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bug Fixing Effort</span>
                          <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                            {analysisResult.maintenancePrediction.bugFixingEffort}
                          </p>
                        </div>
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scaling Requirements</span>
                          <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                            {analysisResult.maintenancePrediction.scalingRequirements}
                          </p>
                        </div>
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Database Growth Pattern</span>
                          <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                            {analysisResult.maintenancePrediction.databaseGrowth}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARCHITECTURE CANVASES */}
              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <ArchitectureDiagram
                    components={analysisResult.architecture.components}
                    connections={analysisResult.architecture.connections}
                    description={analysisResult.architecture.systemArchitectureDesc}
                  />

                  {/* API Endpoints Catalog */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                      <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-indigo-500" />
                        Microservice API Flow Gateway
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        Documented core RESTful communication pathways between client and microservices.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border-b border-slate-100 dark:border-slate-800">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-150 dark:border-slate-800">
                            <th className="p-3">Route Endpoint</th>
                            <th className="p-3">Method</th>
                            <th className="p-3">Purpose / Desc</th>
                            <th className="p-3">Payload Structure</th>
                            <th className="p-3">Expected Response</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300">
                          {analysisResult.architecture.apiEndpoints.map((ep, idx) => {
                            const isGet = ep.method.toUpperCase() === "GET";
                            const isPost = ep.method.toUpperCase() === "POST";

                            return (
                              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                                <td className="p-3 font-bold text-slate-850 dark:text-slate-200">
                                  {ep.path}
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`px-2 py-0.5 rounded font-black text-[10px] ${
                                      isGet
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                                        : isPost
                                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400"
                                        : "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                                    }`}
                                  >
                                    {ep.method}
                                  </span>
                                </td>
                                <td className="p-3 font-sans text-xs max-w-xs leading-normal">
                                  {ep.desc}
                                </td>
                                <td className="p-3 opacity-80 text-[10px]">
                                  {ep.payload || "—"}
                                </td>
                                <td className="p-3 opacity-80 text-[10px]">
                                  {ep.response || "—"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DATABASE SCHEMAS */}
              {activeTab === "database" && (
                <DbSchemaViewer
                  tables={analysisResult.architecture.dbTables}
                  description={analysisResult.architecture.databaseSchemaDesc}
                />
              )}

              {/* TAB 4: ROADMAPS */}
              {activeTab === "roadmap" && (
                <RoadmapViewer weeks={analysisResult.developmentRoadmap} />
              )}

              {/* TAB 5: COSTS & ALTERNATIVES */}
              {activeTab === "costs" && (
                <div className="space-y-6">
                  <CostChart cost={analysisResult.costEstimation} alternativeStacks={analysisResult.alternativeStacks} />
                  <DeploymentAdvisorComp advisor={analysisResult.deploymentAdvisor} />
                </div>
              )}

              {/* TAB 6: DOCUMENTATION & REPORT EXPORTS */}
              {activeTab === "documentation" && (
                <DocumentDownloader documents={analysisResult.documentation} projectTitle={inputs?.title || "Report"} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          © 2026 Developed by Pradhayani_Chikka
        </div>
      </footer>
    </div>
  );
}
