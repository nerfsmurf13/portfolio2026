# Edward Williams - Portfolio Reference

## Personal Info

- **Name:** Edward Williams
- **Title:** Self-Taught Web Developer
- **From:** Houston, TX
- **Lives in:** Dallas, TX
- **Bio:** "Hello! I am a Self Taught Web Developer from Houston. I currently live in Dallas and professionally bend Javascript and Vue.js to my will."

---

## Contact & Socials

| Platform | Link |
|----------|------|
| Email | edward.williams91@gmail.com |
| GitHub | https://github.com/nerfsmurf13 |
| LinkedIn | https://www.linkedin.com/in/edwardalexanderwilliams/ |
| YouTube | https://www.youtube.com/channel/UChCmp3gZe35BSTEHcJRDHog |
| Twitter | https://twitter.com/JustEdWilliams |

---

## Skills & Tech Stack

- **Frontend:** Vue 3 (Composition API), Tailwind CSS 4, Pinia, Vite 6, Chart.js, Headless UI, Capacitor 7 (iOS/Android)
- **Backend:** Node.js, Express.js, Socket.IO, Bull Queue (Redis)
- **Databases:** MongoDB (Mongoose 8), Google Firebase (NoSQL/Auth), Pinecone (vector DB)
- **AI Integration:** Anthropic Claude SDK (tool_use structured output), OpenAI API (GPT-4/5, embeddings, function calling), Google Gemini Pro (vision + `@google/genai`), Z.AI (GLM-4.7)
- **Payments:** Stripe (Checkout, Subscriptions, Webhooks, Customer Portal)
- **Auth:** JWT (access/refresh tokens), Google OAuth, Apple Sign-In, Firebase Auth, bcrypt, magic links
- **APIs:** RESTful API design, CORS, webhook handling, Steam Web API, SerpAPI, Unsplash API, Twilio SMS, Resend email
- **Validation:** Zod (runtime schema validation for AI output)
- **DevOps:** Git, GitHub, CI/CD
- **Hosting:** Netlify (frontend), Render (backend + workers), MongoDB Atlas, Google Cloud Storage
- **Other:** Photoshop, WordPress

---

## Projects

### 1. Define Your Dollars

**Personal finance SaaS platform with AI-powered bank statement analysis and debt payoff planning.**

- **Live:** https://defineyourdollars.com
- **Hosting:** Netlify (frontend), Render (backend)
- **Tech:** Vue 3, Node.js/Express, MongoDB, Anthropic Claude, Stripe, Capacitor 7
- **Timeline:** Ongoing since mid-2025 — actively developed with 100+ commits

#### What It Does

A freemium finance app with a free debt payoff calculator and a premium "Accelerator" tier that uses AI to analyze real bank statements and build personalized financial plans.

#### Key Features

| Feature | Description |
|---------|-------------|
| **Debt Payoff Calculator** | Real-time projections using avalanche or snowball strategies with interest savings comparison |
| **AI Statement Analysis** | Upload PDF/CSV bank statements — Claude extracts transactions, categorizes spending, and flags recurring charges |
| **Cross-Statement Reconciliation** | Detects transfers between checking, savings, and credit cards across multiple statements using confidence scoring |
| **Recurring Charge Detection** | Identifies subscriptions and bills with source tracking (AI-detected, heuristic, cross-statement) |
| **AI Financial Coach** | 6 selectable personality modes (Sweetheart, Smartass, Wise Sage, Motivator, Realist, Crude Dude) |
| **Monthly Battle Plan** | Month-by-month debt payoff schedule with customizable payment ordering |
| **Plan Sharing** | Public read-only links for accountability and sharing |
| **Stripe Subscriptions** | Tier-gated premium features with checkout, webhooks, and customer portal |
| **Admin Dashboard** | User management, 90-day activity scoring, announcements, feedback review, system health KPIs |
| **Mobile Apps** | iOS/Android via Capacitor 7 with haptics, file system access, and social login |

#### Engineering Highlights

- **Hybrid AI + rule-based processing** — First 100 CSV rows go to Claude for categorization; the rest use pattern-matched rules built from AI output, cutting processing time ~80%
- **Structured output via tool_use** — Claude's tool_use feature with strict JSON schemas guarantees reliable extraction from messy bank data. Zero parsing failures in production
- **5-stage aggregation pipeline** — Normalize merchants → detect transfers → remove duplicates → merge recurring charges → extract financial entities. Each stage is independent and testable
- **Merchant normalization** — Strips payment processor prefixes (SQ\*, PAYPAL\*, STRIPE\*), resolves abbreviations, and uses Levenshtein similarity for fuzzy grouping
- **Dynamic amount tolerance** — 50% for variable bills (electric, gas) vs. 30% for predictable ones (insurance, subscriptions) to reduce false positives
- **Session contamination detection** — Validates no stale session data can cause privilege escalation on login
- **Auth caching** — 30-second cache on admin validation to optimize Core Web Vitals (INP)

#### Full Stack Breakdown

| Layer | Tech |
|-------|------|
| **Frontend** | Vue 3 (`<script setup>`), Pinia, Vite, Tailwind CSS 3.3, Chart.js, html-to-image, PapaParse, DOMPurify, web-vitals |
| **Mobile** | Capacitor 7 (iOS/Android) — haptics, keyboard, file system, status bar, share, social login |
| **Backend** | Node.js, Express.js, Mongoose 7.5 |
| **AI** | Anthropic Claude SDK (`@anthropic-ai/sdk`) with tool_use for structured output |
| **Payments** | Stripe SDK — Checkout sessions, subscription lifecycle webhooks, customer portal, tier-gated middleware |
| **Auth** | JWT (access + refresh tokens), Google OAuth, Apple Sign-In, Firebase Auth, bcrypt |
| **Database** | MongoDB Atlas — 10+ models (User, Plan, MonthlyPlan, Transaction, OriginalStatement, AggregatedReport, etc.) |
| **Analytics** | Amplitude, Mixpanel |

#### Data Models

User, Plan, MonthlyPlan, Transaction, OriginalStatement, AggregatedReport, FinancialProfile, Feedback, Announcement, AccountDeletion, PublicPlan

#### API Surface

25+ REST endpoints across auth, plans, admin, Stripe, AI analysis, accelerator, aggregation, transactions, feedback, announcements, waitlist, and health checks.

---

### 2. Frisco Web Designs

**AI-powered web design agency platform — mockup generator, CRM, embeddable chatbot builder, client onboarding, and billing automation.**

- **Live:** https://friscowebdesigns.com
- **Hosting:** Render (backend + background worker), Netlify (generated client sites)
- **Tech:** Vue 3, Node.js/Express, MongoDB, Socket.IO, Anthropic Claude, OpenAI GPT-5, Google Gemini, Z.AI, Stripe, Twilio, Resend, Firebase Auth, Google Cloud Storage, Unsplash API
- **Timeline:** Ongoing — 200+ server files, 119 Vue components, 20 database models, 28 feature modules

#### What It Does

A production SaaS platform for a web design agency targeting small businesses in the Dallas/Frisco, TX area. The system automates the entire agency workflow — from lead discovery and AI-powered website mockup generation to client onboarding, billing, and delivery. Includes an embeddable AI chatbot builder and a suite of free web design tools as SEO lead magnets.

#### Key Features

| Feature | Description |
|---------|-------------|
| **AI Website Mockup Generator** | Text prompt → complete, conversion-optimized website with real Unsplash images, correct business data, and a full design system. Structured JSON output (not raw HTML) validated by Zod schemas |
| **Multi-AI Provider System** | Runtime switching between Claude, GPT-5, and Gemini with circuit breakers (3 failures/60s → fail fast), prompt caching (30min TTL), and graceful fallbacks |
| **AI Mockup Modification** | Natural-language edit requests analyzed by Claude → classified (styling/content/images/structure) → structured patches applied with version tracking |
| **CRM / Lead Pipeline** | CSV import from business databases, 15+ lead statuses, priority scoring, tagging, and one-click mockup generation from lead data |
| **Smart Lead Discovery** | SerpAPI + Z.AI (GLM-4.7) analyzes search results, classifies digital presence (no site, dead site, outdated, etc.), and generates outreach angles |
| **Quick Website Audit** | APIFlash screenshots → OpenAI Vision analysis → quality report |
| **Embeddable AI Chatbot** | Multi-tenant, OpenAI-powered chatbots with function-calling lead capture, domain-restricted CORS, webhook delivery (HMAC signed), Twilio SMS alerts, and AI spam detection |
| **Client Onboarding** | Starter ($27/mo) and Professional ($175/mo) tiers — 8-step design brief wizard, Stripe checkout, magic link activation, journey progress tracking |
| **Real-Time Generation** | Socket.IO streams mockup generation progress to the client — multi-stage status updates during AI processing |
| **Google Reviews Aggregation** | Nightly cron job fetches Google reviews via SerpAPI per client |
| **Free Web Design Tools** | Domain checker, AI color palette generator, image resizer, QR code generator, WHOIS lookup, tech detector — drive organic traffic |
| **Background Worker** | Separate process for heavy mockup generation using a file-based job queue (JSON files in queue/processing/completed/failed directories) |

#### Engineering Highlights

- **Circuit Breaker pattern** — Separate breakers per AI provider with OPEN → HALF_OPEN → CLOSED state machine. 3 failures in 60s trips the circuit, requests fail fast until recovery
- **Structured AI output via Zod** — All AI-generated data validated against comprehensive schemas with `z.union()` for multi-format support and `safeParseOrDefault()` for graceful degradation
- **3-tier image fallback** — Memory cache → MongoDB cache → Unsplash API → industry-specific deterministic picsum.photos seeds. Zero broken images in production
- **Multi-tenant widget architecture** — Chatbot widgets with per-domain CORS, UUID-based public IDs, webhook HMAC signing, and configurable rate limiting
- **V3 mockup pipeline** — AI generates structured JSON (15+ sections including full design system), Unsplash resolves image search phrases, Vue template renders production-quality output
- **Hybrid authentication** — Firebase Auth for clients, separate admin auth with role hierarchy (client/admin/superadmin), magic link tokens with expiration
- **File-based job queue** — Lightweight alternative to Redis/RabbitMQ — JSON files move through queue → processing → completed → failed directories

#### Full Stack Breakdown

| Layer | Tech |
|-------|------|
| **Frontend** | Vue 3 (`<script setup>`), Pinia (12 stores), Vite 6, Vue Router 4, Tailwind CSS 4, Headless UI, Heroicons, Socket.IO Client, `@unhead/vue` |
| **Backend** | Node.js, Express 4, Mongoose 8, Socket.IO, node-cron, Zod, JSON5, Cheerio |
| **AI (4 providers)** | Anthropic Claude SDK, OpenAI SDK (GPT-5), Google Gemini (`@google/genai`), Z.AI REST (GLM-4.7) |
| **Payments** | Stripe SDK — checkout sessions, subscription lifecycle webhooks, customer portal, tier-gated middleware |
| **Auth** | Firebase Auth (client), Firebase Admin SDK (server), magic link tokens, admin role middleware |
| **Comms** | Twilio (SMS), Resend (transactional email with templates) |
| **Storage** | MongoDB Atlas (20 models), Google Cloud Storage (file uploads), Unsplash (image sourcing with caching) |
| **Search/Data** | SerpAPI (Google search + reviews), APIFlash (website screenshots) |
| **SEO/GEO** | `@unhead/vue`, JSON-LD structured data, OG/Twitter meta, route-level SEO config |

#### Data Models

Lead, Client, Mockup, Chatbot, ChatbotConversation, ChatbotLead, ContactFormSubmission, DesignBrief, Appointment, Giveaway, GiveawayEntry, Review, SupportTicket, Form, FormSubmission, TextService, UnsplashCache, Component, Palette, User

#### API Surface

28 feature modules with endpoints spanning mockup generation, lead management, discovery, chatbot, client onboarding, Stripe billing, contact forms, reviews, scheduling, support tickets, SMS, storage, tools, and health checks.

---

### 3. OriginSmith

**Gaming tools platform — AI-powered Kenshi story generator with community quirks, and a Project Zomboid server mod manager with Steam Workshop integration.**

- **Live:** https://originsmith.netlify.app
- **Hosting:** Netlify (frontend), Render (backend)
- **Tech:** Vue 3, Node.js/Express 5, MongoDB, Z.AI GLM-4.7-FlashX, Steam Web API, Cheerio
- **Timeline:** Ongoing — actively developed

#### What It Does

A full-stack gaming tools platform with two main modules: (1) a Kenshi character/story generator that randomizes builds and uses AI to write rich first-person origin monologues, and (2) a Project Zomboid server mod manager that imports mods from Steam Workshop, auto-extracts Mod IDs, and generates server config files.

#### Key Features

| Feature | Description |
|---------|-------------|
| **Kenshi Character Generator** | Randomizes race, weapon, armour, faction, income, and 3 quirks with compatibility validation — up to 50 retry attempts to find a valid combination |
| **AI Origin Stories** | Z.AI GLM-4.7-FlashX generates Tolkien-quality first-person backstories with inline `{{type\|text}}` markers for interactive keyword highlighting |
| **Story Annotation System** | Client-side composable parses AI markers into color-coded, tooltip-enabled keyword chips (race, weapon, faction, quirk, etc.) |
| **Community Quirk Submissions** | Users submit custom quirks; admin approval workflow with status tracking. Approved quirks enter the live generator pool |
| **Individual Rerolling** | Re-randomize any single attribute (race, weapon, quirk, etc.) while maintaining compatibility with the rest of the build |
| **PZ Mod Manager** | Import mods from Steam Workshop collections or individual URLs — auto-resolves collection contents, caches mod data in MongoDB with 7-day TTL |
| **Multi-Pass Mod ID Parser** | 5-stage pipeline: normalize HTML/BBCode → high-confidence regex → medium-confidence multi-line extraction → tokenize → validate with false-positive rejection |
| **PZ Server Config Generator** | Visual UI for all SandboxVars settings (zombie lore, world, environment, loot) with presets — exports production-ready `.ini` config files |
| **Steam Workshop Search** | Search PZ mods by name via Steam's IPublishedFileService API with throttled requests |
| **Screenshot Export** | Save generated characters as shareable images using html-to-image |
| **Admin Dashboard** | Quirk management, generation analytics, API usage tracking with per-request cost estimation |

#### Engineering Highlights

- **Compatibility validation engine** — Race/faction/weapon/income/quirk combinations validated against 5+ constraint rules (Skeleton can't have food quirks, Holy Nation rejects non-humans, etc.) with up to 50 re-roll attempts before accepting best-effort
- **Inline story annotation** — AI outputs `{{type|text}}` markers; client-side `useStoryAnnotation` composable handles nested marker flattening, bare marker recovery, incomplete marker trimming, and renders interactive keyword chips
- **Throttled Steam API integration** — `p-queue` with 1 concurrency + 200ms interval prevents rate limiting. Batches of 100 for file details. API-first with Cheerio scrape fallback for collections
- **Multi-pass mod ID parser** — Strips HTML/BBCode, runs high-confidence regex patterns (explicit "Mod ID: X" labels), then medium-confidence multi-line block extraction, with false-positive word rejection and character-set validation
- **Themed rate limiting** — 6 rate limit tiers with Kenshi/PZ-flavored error messages ("The scribe needs a moment to rest")
- **Fire-and-forget analytics** — API usage, generation stats, and reroll counts written to MongoDB without blocking the response
- **Hybrid data sourcing** — Quirks load from MongoDB (includes community submissions) with JSON file fallback if DB is unavailable

#### Full Stack Breakdown

| Layer | Tech |
|-------|------|
| **Frontend** | Vue 3 (`<script setup>`), Vite 6, Tailwind CSS 4, Vue Router 4, Axios, html-to-image |
| **Backend** | Node.js, Express 5, Mongoose 8, Cheerio, p-queue, Zod |
| **AI** | Z.AI GLM-4.7-FlashX (via OpenAI SDK compatibility layer) |
| **External APIs** | Steam Web API (GetCollectionDetails, GetPublishedFileDetails, IPublishedFileService/QueryFiles) |
| **Auth** | bcryptjs (admin), express-rate-limit (6 tiers) |
| **Database** | MongoDB Atlas — 5 models (Quirk, Generation, ApiUsage, SiteStats, WorkshopMod) |

#### Data Models

Quirk (community submissions + approval workflow), Generation (story metadata + AI backstory tracking), ApiUsage (token counts + cost estimation), SiteStats (cached generation/reroll/backstory counters), WorkshopMod (Steam data + parsed mod IDs with confidence scoring + 7-day TTL)

#### API Surface

15+ REST endpoints across story generation (generate, reroll, options, stats), quirks (submit, status), admin (login, manage quirks, analytics), PZ mods (import collection, import single, import batch, get cached, update mod IDs, search), and health checks.

---

### 4. PropPal MVP

**AI-powered aviation maintenance knowledge system — RAG-based Q&A with CFR 43.3 compliance, dual-mode querying (vector + vision), module-based purchasing, and a full admin panel.**

- **Status:** In development (MVP)
- **Tech:** Vue 3, Node.js/Express, MongoDB, Pinecone, OpenAI GPT-4, Google Gemini Pro, Stripe, Firebase Auth, Bull Queue, Redis, Google Cloud Storage
- **Timeline:** Ongoing — comprehensive BIBLE specification (12 architecture docs), feature-based codebase

#### What It Does

A safety-critical knowledge system for aviation maintenance. Pilots and shops ask questions about their aircraft — PropPal searches vectorized maintenance manuals, generates structured answers with citations, validates CFR 43.3 maintenance authority, and enforces role-based restrictions. Content is organized into purchasable aircraft-specific modules (free starter: Grumman AA-1).

#### Key Features

| Feature | Description |
|---------|-------------|
| **Dual-Mode Q&A** | Quick mode (vector search, 5-15s) and Complete mode (vector + Gemini Pro vision analysis of diagrams/schematics, 30-60s) |
| **5-Section Response Format** | Every answer structured as Situation → Briefing → Full Write-Up → CFR 43.3 Analysis → References with deep links |
| **CFR 43.3 Compliance** | Validates maintenance authority per user role — pilots restricted to preventive maintenance per 43.3(g), shops get full access |
| **Module System** | Aircraft-specific content packages with per-role pricing (pilot vs FBO/shop), Stripe Checkout integration, and entitlement tracking |
| **Async Job Queue** | Bull + Redis processes questions asynchronously — client polls for completion with progress indicators and automatic retry |
| **Chat Follow-ups** | Contextual follow-up chat linked to original Q&A with conversation history preservation (max 10 messages) |
| **Admin Panel** | Manual management (upload/reprocess), vectorization dashboard, module CRUD, user management, system health, analytics, and audit logging |
| **Vector Search** | Pinecone with text-embedding-3-large (3072 dimensions), namespace-per-manual organization, metadata filtering by aircraft/section/confidence |
| **Safety Validation** | Citation requirement on all responses, warning preservation, confidence threshold abstention (<0.7), extractive-over-generative preference |
| **Role-Based Access** | Pilot, shop, and admin roles with hierarchical admin permissions (content_manager, support_analyst, auditor) |

#### Engineering Highlights

- **Ports & Adapters pattern for AI services** — Swappable OpenAI and Gemini adapters behind a common interface. OpenAI handles embeddings + text generation, Gemini handles vision analysis. Graceful degradation if a provider is unavailable
- **Async job processing with Bull Queue** — Questions submitted to Redis-backed queue with priority (complete=5, quick=1), exponential backoff retry (3 attempts), 3-minute timeout, and event-based progress updates. Decouples request from long-running AI operations
- **Vector search with Pinecone** — 3072-dimension embeddings via text-embedding-3-large, namespace-per-manual organization, metadata filtering (aircraft, section, confidence), cross-reference expansion, and BM25 fallback
- **Safety-first answer generation** — All responses validated for citation presence, warning preservation, and confidence thresholds. CFR 43.3 compliance check determines required maintenance authority and flags restrictions
- **Feature-based vertical slices** — Server organized as auth, questions, modules, admin, health — each with controller/service/routes/model. Shared infrastructure (AI, vector, queue, storage) uses adapter pattern
- **Persistent job polling composable** — `useJobPolling` stores job state in localStorage, resumes interrupted jobs on page reload, manages chat integration, and auto-cleans on completion
- **Audit trail for regulatory compliance** — Every query logged with user, question, mode, modules, timestamp, IP. Admin actions tracked with immutable audit log (AuditLog model)
- **Graceful degradation** — Redis, Pinecone, and Firebase all optional in development mode with mock responses. Error messages guide users to resolution

#### Full Stack Breakdown

| Layer | Tech |
|-------|------|
| **Frontend** | Vue 3 (`<script setup>`), Pinia 3, Vite 7, Vue Router 4, Tailwind CSS 4, Axios, Firebase SDK, Stripe.js |
| **Backend** | Node.js, Express 4, Mongoose 8, Bull 4 (Redis queue), Winston (structured logging), Helmet, CORS, express-rate-limit |
| **AI** | OpenAI SDK (GPT-4 completions + text-embedding-3-large), Google Gemini Pro (vision analysis) |
| **Vector DB** | Pinecone (p1.x2 pod, 3072 dimensions, namespace-per-manual) |
| **Payments** | Stripe SDK — Checkout sessions, webhook-driven entitlement updates, per-role pricing |
| **Auth** | Firebase Auth (Google OAuth) + Firebase Admin SDK (server verification, custom claims, RBAC) |
| **Storage** | Google Cloud Storage (PDFs, extracted images, processed chunks), MongoDB Atlas (metadata, interactions, audit logs) |
| **Queue** | Bull + Redis — priority queues, exponential backoff, job persistence, graceful shutdown |

#### Data Models

User (Firebase UID, role: pilot/shop, custom claims), AircraftModule (moduleId, pricing per role, content stats, Stripe price ID), UserEntitlement (access type: free/purchased/trial, expiration, Stripe session), QuestionInteraction (5-section response, compliance check, confidence score, references with deep links), AuditLog (admin action tracking with user/type/timestamp/IP)

#### API Surface

20+ REST endpoints across auth (status, me, logout), questions (submit, poll job, get result, chat, history), modules (catalog, details, user modules, purchase), admin (manuals CRUD/upload/reprocess, modules CRUD, users, analytics, health), and system health checks (basic + detailed dependency status).

---

### 5. Word-2-Element
- **Description:** Quick project — converts words to periodic table elements
- **Tech:** HTML, CSS, Vanilla JavaScript
- **Live:** https://nerfsmurf13.github.io/element_namething/
- **GitHub:** https://github.com/nerfsmurf13/element_namething

### 6. Kenshi Roll (Archived — Predecessor to OriginSmith)
- **Description:** Original Kenshi character generator — simple randomizer without AI stories or community features
- **Tech:** HTML, CSS, Vanilla JavaScript
- **Live:** https://nerfsmurf13.github.io/kenshirollv2/
- **GitHub:** https://github.com/nerfsmurf13/kenshirollv2

### 7. SpaceX API Demo (Archived)
- **Description:** Multipage site demonstrating API integration, Tesla-inspired UI
- **Tech:** Vue.js
- **Status:** Running on outdated API
- **Live:** http://spacexdb.com/
- **GitHub:** https://github.com/nerfsmurf13/spacex_vue

### 8. Cost of Duty (Archived)
- **Description:** Pulls Call of Duty player data and calculates resource usage value
- **Tech:** Vue.js
- **Status:** API no longer functional
- **Live:** http://costofduty.com/
- **GitHub:** https://github.com/nerfsmurf13/cost-of-duty

### 9. Inventory & Support System (Archived)
- **Description:** Inventory management + support ticket system
- **Tech:** Vue.js, Google Firebase (NoSQL)
- **Status:** Not currently live
- **GitHub:** https://github.com/nerfsmurf13/nova-ticket

---

## Personal / Dev Tools

These are internal tools built for personal use — not client-facing or publicly deployed.

### ModelsLab API Tester

**Personal testing dashboard for ModelsLab's generative AI APIs — image generation, video synthesis, text-to-speech, lip sync, and image analysis.**

- **Status:** Internal tool (not deployed)
- **Repo:** `C:\Webdev\ModelsLab`
- **Tech:** Vue 3, Node.js/Express, SQLite (better-sqlite3), Tailwind CSS 4, Vite 7 (rolldown-vite)

#### What It Does

A local full-stack app for experimenting with ModelsLab's generative AI endpoints. Provides a unified dark-themed UI for five AI tools, with a model registry stored in SQLite so models can be swapped without code changes.

#### Tools / API Integrations

| Tool | ModelsLab API | Description |
|------|---------------|-------------|
| **Text to Image** | `v6/images/text2img` | Prompt-based image generation with auto-appended quality modifiers, plus super resolution upscaling (2x/3x/4x) |
| **Image to Video** | `v7/video-fusion/image-to-video` | Drag-and-drop/paste/URL image input → video. Model-dependent fields (resolution, FPS, frames). Uses `seedance-i2v`, `wan-2.2-i2v` |
| **Text to Speech** | `v6/voice/text_to_speech` | 6 voice options (Alloy, Echo, Fable, Onyx, Nova, Shimmer), adjustable speed (0.5x–2.0x) |
| **Lip Sync** | `v6/video/lip_sync` | Video + audio input → lip-synced video output |
| **Image to Text** | `v6/llm/image_chat` | Image analysis with optional directed question prompts |

#### Notable Patterns

- **Two-layer async polling** — Server polls ModelsLab's `fetch_result` endpoint (up to 120 attempts), then client separately polls output URLs via `useContentPolling` composable until content is actually downloadable
- **SQLite model registry** — Models stored in DB with per-model configurable fields, endpoints, schedulers, and default flags — swap models without touching code
- **Dynamic field visibility** — UI controls render conditionally based on which API fields the selected model supports (`hasField()` pattern)
- **Content persistence** — Generated images/videos/audio saved to disk with paired JSON metadata files

#### Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Vue 3 (`<script setup>`), Vue Router 4, Tailwind CSS 4, Vite 7 (rolldown-vite) |
| **Backend** | Node.js, Express 4 (ES Modules) |
| **Database** | better-sqlite3 (models + settings tables) |
| **External** | ModelsLab REST API (v6 + v7), tmpfiles.org (temp image hosting for uploads) |

---

## Branding / Design Tokens (Old Portfolio)

| Token | Value |
|-------|-------|
| Primary Red | `#bc0301` |
| Dark | `#252525` |
| Light | `#cacaca` |
| White | `#fff` |
| Font | Work Sans (Google Fonts) |

---

## Notes for New Portfolio

- Projects 7, 8, 9 marked as archived — broken/outdated APIs
- **Define Your Dollars** = flagship personal finance SaaS — full-stack with AI, payments, mobile, and admin
- **Frisco Web Designs** = flagship agency SaaS — multi-AI orchestration (4 providers), real-time generation, CRM, chatbot platform, client billing
- **OriginSmith** = gaming tools platform — demonstrates AI integration (Z.AI), Steam API integration, multi-pass parsing pipelines, compatibility validation engines, and community-driven content (quirk submissions). Evolution of the original Kenshi Roll project from vanilla JS to full-stack Vue 3 + Express + MongoDB
- **PropPal MVP** = safety-critical aviation RAG system — demonstrates vector search (Pinecone), dual-mode AI querying (OpenAI + Gemini vision), CFR 43.3 regulatory compliance, async job processing (Bull + Redis), module-based monetization (Stripe), and comprehensive admin tooling
- All four main projects demonstrate production-grade engineering: circuit breakers, structured AI output validation, external API integration, rate limiting, async job queues, vector databases, and real deployed features
- Skills section updated to reflect current stack (Claude, GPT-5, Gemini, Z.AI, Stripe, Tailwind 4, Pinia, Socket.IO, Zod, Capacitor, Steam Web API, Pinecone, Bull/Redis, Google Cloud Storage)
- Google Analytics ID (old): `UA-153393067-1` — switch to GA4 for the new site
