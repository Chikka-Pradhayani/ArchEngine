import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let resolvedFilename = "";
let resolvedDirname = "";
try {
  resolvedFilename = __filename;
  resolvedDirname = __dirname;
} catch (e) {
  resolvedFilename = fileURLToPath(import.meta.url);
  resolvedDirname = path.dirname(resolvedFilename);
}

const __filenameName = resolvedFilename;
const __dirnameName = resolvedDirname;

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with User-Agent header for telemetry
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment. Please add it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint to evaluate the project
app.post("/api/analyze", async (req, res) => {
  try {
    const inputs = req.body;
    
    if (!inputs || !inputs.title || !inputs.description) {
      return res.status(400).json({ error: "Project Title and Description are required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a highly experienced CTO, Solution Architect, Technical Lead, and Software Project Mentor. 
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

    const userPrompt = `
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

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from Gemini API.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(responseText.trim());
    } catch (parseErr) {
      console.error("Failed to parse response as JSON. Raw response:", responseText);
      // Fallback clean-up if markdown wrappers are added by any chance
      const cleaned = responseText
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      parsedData = JSON.parse(cleaned);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "An error occurred during project analysis." });
  }
});

// Setup dev server or static file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
