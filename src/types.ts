export interface ProjectInputs {
  title: string;
  description: string;
  category: string;
  targetUsers: string;
  expectedUsers: string;
  teamSize: number;
  skillLevel: string; // 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed'
  availableTech: string;
  missingSkills: string;
  budget: number;
  deadline: number; // in days
  weeklyHours: number;
  projectType: string; // 'Capstone' | 'Startup' | 'Hackathon' | 'Personal Project'
}

export interface MetricAnalysis {
  score: number;
  details: string;
}

export interface StackDetail {
  name: string;
  justification: string;
}

export interface RecommendedStack {
  frontend: StackDetail;
  backend: StackDetail;
  database: StackDetail;
  auth: StackDetail;
  cloud: StackDetail;
  ai: StackDetail;
  monitoring: StackDetail;
}

export interface AlternativeStack {
  cost: string;
  pros: string[];
  cons: string[];
  components: string[];
}

export interface AlternativeStacks {
  studentFreeTier: AlternativeStack;
  budgetFriendly: AlternativeStack;
  productionReady: AlternativeStack;
  enterprise: AlternativeStack;
}

export interface CostEstimation {
  development: number;
  hosting: number;
  domain: number;
  database: number;
  storage: number;
  aiApi: number;
  monitoring: number;
  monthlyTotal: number;
  annualTotal: number;
}

export interface DeploymentPlatform {
  platform: string;
  link: string;
  pricing: string;
  advantages: string[];
  limitations: string[];
}

export interface DeploymentAdvisor {
  frontend: DeploymentPlatform[];
  backend: DeploymentPlatform[];
  database: DeploymentPlatform[];
  cloud: DeploymentPlatform[];
}

export interface ArchComponent {
  id: string;
  name: string;
  type: string; // 'client' | 'server' | 'database' | 'auth' | 'ai' | 'external'
  description: string;
  x: number;
  y: number;
}

export interface ArchConnection {
  from: string;
  to: string;
  label: string;
}

export interface DbTableColumn {
  name: string;
  type: string;
  constraints: string;
}

export interface DbTable {
  name: string;
  columns: DbTableColumn[];
}

export interface ApiEndpoint {
  method: string;
  path: string;
  desc: string;
  payload: string;
  response: string;
}

export interface ArchitectureData {
  systemArchitectureDesc: string;
  components: ArchComponent[];
  connections: ArchConnection[];
  databaseSchemaDesc: string;
  dbTables: DbTable[];
  apiFlowDesc: string;
  apiEndpoints: ApiEndpoint[];
  deploymentArchitectureDesc: string;
}

export interface RoadmapTask {
  category: string;
  task: string;
  duration: string;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  tasks: RoadmapTask[];
}

export interface MaintenancePrediction {
  monthlyHours: number;
  bugFixingEffort: string;
  scalingRequirements: string;
  databaseGrowth: string;
  infrastructureUpgrades: string;
}

export interface RiskItem {
  category: string; // 'Technical' | 'Financial' | 'Security' | 'Scalability' | 'Timeline'
  risk: string;
  severity: string; // 'Low' | 'Medium' | 'High'
  mitigation: string;
}

export interface RealityCheck {
  isRealistic: boolean;
  verdict: string;
  mvpSuggestion: string;
}

export interface SimilarProject {
  type: string; // 'GitHub Repository' | 'Existing Product' | 'Competitor' | 'Alternative Approach'
  name: string;
  url: string;
  description: string;
}

export interface Documents {
  readme: string;
  proposal: string;
  srs: string;
  pptStructure: string;
  capstoneStructure: string;
}

export interface LearningRoadmapTopic {
  topic: string;
  resource: string;
  duration: string;
}

export interface AnalysisResponse {
  feasibilityScore: number;
  feasibilityExplanation: string;
  complexityAnalysis: MetricAnalysis;
  budgetAnalysis: MetricAnalysis;
  timelineAnalysis: MetricAnalysis;
  teamCapabilityAnalysis: MetricAnalysis;
  successProbability: number;
  successExplanation: string;
  strengths: string[];
  weaknesses: string[];
  bottlenecks: string[];
  innovationScore: number;
  innovationDetails: string;
  saturationLevel: string; // 'Low' | 'Medium' | 'High'
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
