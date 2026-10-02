# Personal Operating System

## 1. Project Purpose & Identity
- **Project ID:** personal-os
- **Repository:** happyinvestingwithsan/personal-operating-system
- **Trunk Branch:** main
- **Integration Branch:** dev
- **Active Feature Branch:** feature/mvp-dashboard

## 2. High-Level Architecture
- Atomic JSON storage + automated JSON backups
- Local Node REST API server (port 3001)
- React 18 + TypeScript + Vite + Tailwind CSS flight deck
- Local execution and verification commands:
  - `npm test`
  - `npm run build`

## 3. Important Constraints & Non-Goals
- Human/ChatGPT strategic review required before merging to `dev`.
- `main` remains untouched until complete MVP is stable.
- Strict scope control: zero unauthorized changes.

## 4. Development Conventions
- Development workflow: `main` → `dev` → `feature/*` → PR/Review → `dev`
- Feature branches named `feature/<feature-name>`.
- Automated tests and build must pass prior to merge review.
