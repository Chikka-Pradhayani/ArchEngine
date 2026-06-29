import React from "react";
import { ProjectInputs } from "../types";
import { Sparkles, Code2, Users, ShieldAlert, FileText, ChevronRight, Play } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (inputs: ProjectInputs) => void;
  loading: boolean;
}

const PRESETS = [
  {
    name: "Realistic: Capstone App",
    inputs: {
      title: "Campus Smart Study Planner",
      description: "An interactive web application for college students to coordinate study groups, reserve library rooms, and share notes. Includes a smart AI assistant that suggests study times based on members' uploaded schedules and lists matching subject peers.",
      category: "Web Platform",
      targetUsers: "University students and professors",
      expectedUsers: "1,500 students",
      teamSize: 3,
      skillLevel: "Intermediate",
      availableTech: "React, Node.js, Express, PostgreSQL, CSS",
      missingSkills: "DevOps, Hosting, AI Prompt Engineering",
      budget: 100,
      deadline: 120,
      weeklyHours: 15,
      projectType: "Capstone",
    }
  },
  {
    name: "Reality Check: ChatGPT Clone",
    inputs: {
      title: "OmniMind AI - Next-Gen ChatGPT Competitor",
      description: "A complete autonomous AI chatbot and model platform with full voice support, real-time web search, visual parsing, image creation, multi-modal reasoning, and collaborative enterprise workspaces with custom security.",
      category: "AI/ML tool",
      targetUsers: "Global Enterprise Employees",
      expectedUsers: "5,000,000",
      teamSize: 2,
      skillLevel: "Beginner",
      availableTech: "HTML, JavaScript, basic CSS",
      missingSkills: "Machine Learning, LLM Pretraining, GPU Cluster Setup, PostgreSQL, Distributed Systems, JWT Security, React, FastAPI",
      budget: 0,
      deadline: 30,
      weeklyHours: 10,
      projectType: "Personal Project",
    }
  },
  {
    name: "Fast: 48h Hackathon Idea",
    inputs: {
      title: "EcoNeighbor - Local Produce Swap",
      description: "A fast geolocated web app where neighbors can list leftover garden herbs, fruits, and home-baked bread for trade or free pick-up, reducing neighborhood waste.",
      category: "SaaS",
      targetUsers: "Local community garden hobbyists and environment-conscious neighbors",
      expectedUsers: "200 active neighborhood users",
      teamSize: 4,
      skillLevel: "Mixed",
      availableTech: "React, Firebase Firestore, Tailwind CSS, Google Maps API",
      missingSkills: "Mobile UI optimization, production deployment",
      budget: 50,
      deadline: 2,
      weeklyHours: 40,
      projectType: "Hackathon",
    }
  },
  {
    name: "Startup: AI Recruitment Recruiter",
    inputs: {
      title: "TalentScan - AI CV Screening Platform",
      description: "A B2B SaaS platform that imports PDF CVs, ranks candidates based on complex job descriptions using advanced semantic semantic queries, conducts initial auto-chats with shortlisted candidates, and updates HR systems.",
      category: "SaaS",
      targetUsers: "HR departments and mid-market recruitment agencies",
      expectedUsers: "25 recruiting firms, 5,000 CVs processed daily",
      teamSize: 3,
      skillLevel: "Advanced",
      availableTech: "Next.js, Python, FastAPI, Supabase, Tailwind, OpenAI API",
      missingSkills: "Enterprise security auditing, ISO certifications",
      budget: 5000,
      deadline: 90,
      weeklyHours: 35,
      projectType: "Startup",
    }
  }
];

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = React.useState<ProjectInputs>({
    title: "",
    description: "",
    category: "SaaS",
    targetUsers: "",
    expectedUsers: "",
    teamSize: 3,
    skillLevel: "Intermediate",
    availableTech: "",
    missingSkills: "",
    budget: 200,
    deadline: 90,
    weeklyHours: 15,
    projectType: "Capstone",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "teamSize" || name === "budget" || name === "deadline" || name === "weeklyHours" 
        ? parseFloat(value) || 0 
        : value,
    }));
  };

  const handleApplyPreset = (presetInputs: ProjectInputs) => {
    setFormData(presetInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in the project title and detailed description.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden" id="project-form-container">
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-5 text-white">
        <h2 className="font-display text-xl font-bold tracking-wide flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          Project Blueprints Input Portal
        </h2>
        <p className="text-indigo-100 text-xs mt-1 font-sans">
          Load an instant preset scenario or specify your custom team and project requirements below.
        </p>
      </div>

      <div className="p-6">
        {/* Preset Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Instant Presets (Select to fill form instantly)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset.inputs)}
                className="text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition text-xs font-medium cursor-pointer"
              >
                <div className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-semibold mb-0.5">
                  <Play className="w-3 h-3 fill-indigo-600 dark:fill-indigo-400" />
                  {preset.name.split(":")[0]}
                </div>
                <div className="text-slate-500 dark:text-slate-400 font-normal truncate">
                  {preset.inputs.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Project Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
              <Code2 className="w-4 h-4 text-indigo-500" />
              1. Project Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Campus Smart Study Planner"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="SaaS">SaaS Platform</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Web Platform">Web Platform</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="AI/ML tool">AI / Machine Learning</option>
                  <option value="IoT">IoT / Hardware</option>
                  <option value="Blockchain">Web3 / Blockchain</option>
                  <option value="Game">Video Game</option>
                  <option value="DevTools">Developer Tools</option>
                  <option value="Social Network">Social Network</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Detailed Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project, core features, how it works, and what makes it distinct..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Users
                </label>
                <input
                  type="text"
                  name="targetUsers"
                  value={formData.targetUsers}
                  onChange={handleChange}
                  placeholder="e.g. University students, local merchants, HR teams"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Expected Number of Users
                </label>
                <input
                  type="text"
                  name="expectedUsers"
                  value={formData.expectedUsers}
                  onChange={handleChange}
                  placeholder="e.g. 500 local active, 10k monthly visitors"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Team Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
              <Users className="w-4 h-4 text-violet-500" />
              2. Team Information & Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Team Size (Persons)
                </label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  min={1}
                  max={25}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  General Skill Level
                </label>
                <select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="Beginner">Beginner (Little/No prior projects)</option>
                  <option value="Intermediate">Intermediate (Academic/Some project experience)</option>
                  <option value="Advanced">Advanced (Professional engineers / Expert hackers)</option>
                  <option value="Mixed">Mixed (Various levels represented)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Type / Audience
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="Capstone">Capstone / University Thesis</option>
                  <option value="Startup">Startup / Commercial MVP</option>
                  <option value="Hackathon">Hackathon / Speed Build</option>
                  <option value="Personal Project">Personal Project</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Technologies the Team Knows
                </label>
                <input
                  type="text"
                  name="availableTech"
                  value={formData.availableTech}
                  onChange={handleChange}
                  placeholder="e.g. React, Python, basic HTML"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Key Skills Missing in Team
                </label>
                <input
                  type="text"
                  name="missingSkills"
                  value={formData.missingSkills}
                  onChange={handleChange}
                  placeholder="e.g. Hosting, backend database connections, custom UI design"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Constraints */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-fuchsia-500" />
              3. Constraints & Budget Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Available Budget (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-slate-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min={0}
                    className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Deadline to Launch (Days)
                </label>
                <input
                  type="number"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Weekly Dev Hours (per person)
                </label>
                <input
                  type="number"
                  name="weeklyHours"
                  value={formData.weeklyHours}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Evaluating Architectural Feasibility...
                </>
              ) : (
                <>
                  Generate Software Architecture & Feasibility Report
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
