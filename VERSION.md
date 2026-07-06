# FLN-Assessment — Version Changelog & Roadmap

> **This file is the source of truth for the project.** Every version below is one atomic commit on the `app_making` branch. Read this file to know what to build, what was built, and what's planned. If a version breaks the app, `git revert <commit-hash>` to roll back.

---

## How to contribute

1. Read this file top to bottom.
2. Pick the next **📋 Planned** version you want to implement.
3. Create a branch: `git checkout -b v0.X.0`
4. Implement the version (one feature, working code, tests).
5. Update this file: move the version from "📋 Planned" → "✅ Stable" with the commit hash.
6. Commit: `git commit -m "v0.X.0: <short description>"`
7. Open a Pull Request into `app_making`.

**Rules**:
- One version = one commit (or a small series of clearly labeled commits).
- Each version must compile and run (`npm run build` + `npm run dev`).
- Update this file as part of your version's commit.
- Never break the `app_making` branch.

---

## Current state

**Branch**: `app_making`
**Latest version**: v0.1.0 (Initial — just this file)
**Status**: 🟡 Planning complete, building starts now

---

## v0.1.0 — Initial: VERSION.md (this commit)
**Date**: 2026-07-06
**Status**: ✅ Stable
**Commit**: (initial)

### What's in this version
- This file: `VERSION.md` (the project roadmap)
- `.gitignore`
- `README.md` (project intro)

**No source code yet.** Building starts from v0.1.1.

---

## v0.1.1 — Monorepo Skeleton
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Create the MERN monorepo with npm workspaces.

### Adds
- `apps/web` (React + Vite + TS + Tailwind)
- `apps/api` (Node + Express + TS)
- `packages/shared` (TS types, enums, constants)
- Root `package.json` with workspaces config
- TypeScript configs, Vite config, Tailwind config

### Files Added
- `package.json`
- `apps/web/{package.json, vite.config.ts, tailwind.config.js, tsconfig.json, index.html}`
- `apps/api/{package.json, tsconfig.json}`
- `packages/shared/{package.json, tsconfig.json, src/index.ts}`

---

## v0.2.0 — Backend Foundation + Auth
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Backend skeleton + 7-role RBAC + JWT auth.

### Adds
- Express server with security middleware (helmet, cors, rate limit)
- MongoDB connection via Mongoose
- `User` model (7 roles)
- `Geography` models: State, District, Block, School, Class, Student
- JWT auth (access + refresh tokens)
- Auth endpoints: register, login, refresh, /me
- Auth middleware + RBAC middleware
- Zod validation + global error handler
- Performance: `.lean()`, bcrypt 8 rounds, JWT-only /me, indexes

### Files Added
- `apps/api/src/server.ts`
- `apps/api/src/config/{env,db,constants}.ts`
- `apps/api/src/models/{User,Geography}.ts`
- `apps/api/src/middlewares/{auth,rbac,errorHandler}.ts`
- `apps/api/src/controllers/authController.ts`
- `apps/api/src/routes/authRoutes.ts`
- `apps/api/src/utils/{ApiError,asyncHandler}.ts`

---

## v0.3.0 — Frontend Foundation + Login
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Frontend skeleton + login + dashboard.

### Adds
- React + Vite + Tailwind + Zustand
- API client (axios with interceptors)
- Auth store (zustand + persist)
- Login page
- Protected routes
- Simple Dashboard
- Lazy loading for code splitting

### Files Added
- `apps/web/src/main.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/index.css`
- `apps/web/src/components/ProtectedRoute.tsx`
- `apps/web/src/pages/{Login,Dashboard,NotFound}.tsx`
- `apps/web/src/lib/{api,utils}.ts`
- `apps/web/src/stores/authStore.ts`

---

## v0.4.0 — Comprehensive Demo Data
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Realistic data so the app feels real at any school.

### Adds
- `Curriculum` models: Level + Question
- `Assessment` models: StudentProfile + Assessment
- `SyllabusConfig` model
- Comprehensive seed:
  - 3 states, 6 districts, 12 blocks, 12 schools, 36 classes
  - 540 students + profiles (15 per class)
  - 36 FLN Levels (NIPUN Bharat syllabus)
  - 180 questions (5 per level)
  - 30 sample completed assessments
- Hierarchy indexes for fast filtering

### Files Added
- `apps/api/src/models/{Curriculum,Assessment,SyllabusConfig}.ts`
- Comprehensive rewrite of `apps/api/src/scripts/seed.ts`

---

## v0.5.0 — Print/Scan Backend
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Generate PDF papers, scan sheets, OCR, evaluate.

### Adds
- A4 PDF generation (school/student/class header, questions, answer boxes)
- File upload (local storage + Cloudinary-ready)
- OCR service (mock + Google Cloud Vision REST ready)
- Answer extraction (regex-based)
- Evaluation engine (compares with correct answers)
- Full assessment flow: generate → print → scan → review → confirm
- Auto-update StudentProfile on completion
- E2E test script

### Files Added
- `apps/api/src/services/{pdfGenerator,storage,ocr,evaluator}.ts`
- `apps/api/src/controllers/assessmentController.ts`
- `apps/api/src/routes/{assessmentRoutes,studentRoutes}.ts`
- `apps/api/src/scripts/e2eTest.ts`

### Files Modified
- `apps/api/src/server.ts` (mount new routes + `/uploads` static)

---

## v0.6.0 — Print/Scan Frontend
**Date**: TBD
**Status**: 📋 Planned
**Scope**: UI for the print/scan workflow.

### Adds
- Teacher "My Class" page (roster + Generate/PDF/Scan/Review buttons)
- Review page (teacher confirms/corrects OCR results)
- Role-based dashboard shortcuts
- Lazy-loaded routes (smaller initial bundle)

### Files Added
- `apps/web/src/pages/TeacherClass.tsx`
- `apps/web/src/pages/ReviewAssessment.tsx`

### Files Modified
- `apps/web/src/pages/Dashboard.tsx`
- `apps/web/src/App.tsx`
- `apps/api/src/routes/assessmentRoutes.ts` (add `/detail/:id`)

---

## v0.7.0 — Admin Pages (RBAC UI)
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Each admin role can create admins/entities below them in the hierarchy.

### Adds
- Super Admin: create State Admins
- State Admin: create District Admins, view all schools in state
- District Admin: create Block Admins
- Block Admin: create Schools (Principals) + Volunteers
- Principal: manage Teachers + Classes + Students

### Files Added
- Admin pages for each role
- Generic admin CRUD controllers
- Permission middleware helpers

---

## v0.8.0 — Student Management UI
**Date**: TBD
**Status**: 📋 Planned
**Scope**: CRUD for students + bulk import.

### Adds
- Add/edit/delete students
- Assign to class
- Bulk import via CSV
- View student profile (level history, assessment results)

---

## v0.9.0 — Question Bank UI
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Manage questions from the UI.

### Adds
- Add/edit/delete questions per level
- Bulk question import via CSV/JSON
- Preview questions in student-paper format
- Filter by level, subLevel, difficulty, type

---

## v0.10.0 — Analytics Dashboards
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Per-role dashboards with charts.

### Adds
- Class-level: student progress, pass/fail rates
- School-level: teacher performance, class rankings
- District/State level: aggregated reports
- Charts (recharts)

---

## v1.0.0 — Production-Ready Release
**Date**: TBD
**Status**: 📋 Planned
**Scope**: Final polish for production.

### Checklist
- All features above stable
- Tests (unit + e2e)
- CI/CD pipeline
- Production deploy guide (Vercel + Render + MongoDB Atlas)
- Security audit (OWASP top 10)
- Performance: <100ms p95 for most endpoints
- Load tested at 10k concurrent users
- Documentation site
- Multi-language support (Hindi UI)

---

## FLN Syllabus (Reference)

36 FLN Levels based on **NIPUN Bharat** (Grade 1–3 numeracy):

- **Grade 1** (Levels 1–11): Pre-number → Numbers 1-99 → Add/Sub → [REVIEW]
- **Grade 2** (Levels 12–23): Numbers 100-500 → Place Value → 2-digit Add/Sub → Tables 2/5/10 → Measurement → Time → [REVIEW]
- **Grade 3** (Levels 24–36): Numbers 500-1000 → 3-digit Add/Sub → Tables 1-10 → Division → Money → Fractions → [FINAL]

---

## Project Structure (Target)

```
FLN-Assessment/
├── apps/
│   ├── web/         # React + Vite + TS + Tailwind
│   └── api/         # Node + Express + TS
├── packages/
│   └── shared/      # Shared TS types, enums, constants
├── VERSION.md       # This file (source of truth)
├── README.md        # Project intro
└── package.json     # npm workspaces config
```

---

## Login Credentials (after running seed)

| Role | Email | Password |
|---|---|---|
| Super Admin | `super@fln.gov.in` | `Test@123` |
| State Admin | `state@fln.gov.in` | `Test@123` |
| District Admin | `district@fln.gov.in` | `Test@123` |
| Block Admin | `block@fln.gov.in` | `Test@123` |
| Principal | `principal@fln.gov.in` | `Test@123` |
| Teacher | `teacher@fln.gov.in` | `Test@123` |
| Volunteer | `volunteer@fln.gov.in` | `Test@123` |

---

**Last updated**: 2026-07-06 — v0.1.0 (planning only)