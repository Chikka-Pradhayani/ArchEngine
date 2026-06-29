# ArchEngine: AI Software Project Architect & Feasibility Engine

ArchEngine is a powerful, full-stack automated Technical Lead, CTO, and Solution Architect. It empowers developers, product managers, and founders by evaluating software concepts, estimating running costs, recommending tailored hosting options, building comprehensive relational database structures, laying out milestone-based roadmaps, and producing exportable markdown documentation.

---

## 🚀 Core Features

- **Rigorously Calculated Feasibility**: Gauges an idea's success probability, innovation score, and feasibility metrics using real-time AI modeling.
- **System Architecture Whiteboard Canvas**: Designs custom microservice diagrams with physical node coordinate calculations and real-time interface listings.
- **Relational Database Schema Designer**: Generates complete PostgreSQL/relational schemas showing tables, columns, data types, keys, and relational cardinality.
- **Microservice API Gateway Flow Catalog**: Maps REST pathways between clients and backend microservices with sample request payloads and response structures.
- **Milestone-Based Timeline Roadmaps**: Provides week-by-week development sequencing with target deliverables and clear tasks.
- **Cost Estimator & Stack Explorer**: Compares customized monthly infrastructure charges against pre-optimized tiers (Student Free Tier, Budget, Production, and Enterprise).
- **Cloud Ingress & Deployment Advisor**: Recommends edge, serverless, and cloud hosting platform options (Vercel, Railway, Supabase, Neon, GCP, AWS) with clear pros and cons.
- **Adaptive Dark & Light Mode**: Features a tailored CSS variant setup built on modern Tailwind CSS v4.
- **Exportable & Printable Reports**: Facilitates easy printing of reports or downloading structured `.md` files for use in internal planning wikis.

---

## 🛠️ Tech Stack

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (with custom `@variant dark (&:where(.dark, .dark *))` theme synchronization)
- **Icons**: Lucide React
- **Animations**: Tailwind utilities and state-driven transitions

### Backend Architecture
- **Server Environment**: Node.js & Express
- **TypeScript Runner**: `tsx` (for rapid development compilation)
- **Production Bundler**: `esbuild` (compiles and bundles Express server into a standalone CJS file `dist/server.cjs` to ensure optimized startup and full compliance on container clouds like Google Cloud Run)

### Core AI Integration
- **SDK**: Official `@google/genai` TypeScript SDK
- **Model**: `gemini-3.1-flash-lite` (carefully selected and configured for extremely reliable, low-latency structured JSON generation and high-demand request handling)

---

## 📁 Project Structure

```text
├── .env.example              # Template for local environment variables
├── .gitignore                # Paths excluded from version control
├── index.html                # Vite HTML template entry point
├── metadata.json             # AI Studio Applet configuration and capability declarations
├── package.json              # Dependency declarations and build/run script mappings
├── server.ts                 # Full-stack Express server and Gemini integration route handler
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite bundler configuration
│
└── src/                      # Client-side React source code
    ├── main.tsx              # React mounting entry point
    ├── App.tsx               # Main application hub, global dark mode controller, and tab router
    ├── index.css             # Tailwind v4 import and custom typography configuration
    ├── types.ts              # Global strongly-typed interface declarations for schemas and results
    │
    └── components/           # Modularized UI Components
        ├── ProjectForm.tsx           # Form capture for title, details, constraints, stack, and types
        ├── MetricCard.tsx            # Custom circular progress visualizers for dashboard metrics
        ├── ArchitectureDiagram.tsx   # Interactive canvas mapping visual architectural blocks
        ├── DbSchemaViewer.tsx        # High-contrast interactive table and relationship explorer
        ├── RoadmapViewer.tsx         # Weekly roadmap scheduler with progress check off
        ├── CostChart.tsx             # Pricing comparison charts and interactive stack toggles
        ├── DeploymentAdvisorComp.tsx  # Interactive hosting recommendations portal
        └── DocumentDownloader.tsx    # Markdown report synthesis and file export actions
```

---

## 💻 Local Installation & Setup

Ensure you have **Node.js (v18+)** and **npm** installed locally.

### 1. Clone or Download the Project
Extract the project code to your local workspace.

### 2. Configure Environment Variables
Copy `.env.example` to create a `.env` file:
```bash
cp .env.example .env
```
Open the `.env` file and insert your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies
Run npm install to populate the `node_modules` directory:
```bash
npm install
```

### 4. Start Development Server
Boot up both the Express backend proxy and the Vite server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`** to interact with the application.

### 5. Build for Production
To bundle and prepare the application for container or static hosting platforms:
```bash
npm run build
```
The compiled files will build to the `dist/` directory.

### 6. Run Production Server
Run the compiled server locally to verify production builds:
```bash
npm run start
```

---

## 📋 Usage Instructions

1. **Enter Project Scope**: Fill in the Project Title, Detailed Description, Target Deadline, Available Team Budget, and choose the most relevant Project Type (e.g., Full Stack SaaS, E-Commerce, AI Integration).
2. **Review Executive Dashboard**: Examine the generated feasibility matrix, MVP scope, learn of potential pitfalls in the **Risk Registry**, and review the **Learning Roadmap**.
3. **Explore System Architecture**: View the visual diagram mapping the system layout. Inspect the endpoints mapped under the REST API Flow Catalog.
4. **Inspect Database Layout**: Browse relational database tables, verify key relationships, and inspect field structures.
5. **Analyze Cost Projections**: Navigate to **Cost & Stacks** to inspect predicted cloud running costs and comparative pricing models.
6. **Export Documents**: Visit the **Documentation Docs** tab to copy or download full-length Markdown files, or click **Print Report** in the top navigation bar to save/print a polished PDF.

---

## 💡 Future Improvements

- **Interactive Schema SQL Exporter**: Allow users to download raw DDL schemas directly as `.sql` scripts for PostgreSQL or MySQL.
- **Boilerplate Code Exporter**: Download ready-to-run backend boilerplates (e.g., Express + Knex or NestJS setup) mapped to the generated architecture.
- **Live Currency Converter**: Allow international cost comparisons by translating hosting costs to EUR, JPY, INR, or GBP.
- **Deep Research Mode**: Extend inputs to import existing documentation or markdown system requirements to run deeper, highly custom feasibility tests.

---

## 👤 Author Details

_Insert your name, portfolio website, GitHub username, or contact information below:_

- **Author**: Pradhayani Chikka 
- **GitHub**: https://github.com/Chikka-Pradhayani
- **LinkedIn**https://www.linkedin.com/in/pradhayani-chikka-45a8a33a6?utm_source=share_via&utm_content=profile&utm_medium=member_android: 
