# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered job application automation platform built with Next.js 14 (App Router), React 18, and TypeScript. It connects to multiple backend microservices for authentication, resume management, job matching, and application processing.

## Commands

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build (skips linting)
npm run build:with-lint  # Build with linting
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run check-types      # TypeScript type checking (tsc --noemit)

# Docker
npm run docker:build     # Build Docker image (tag: aihawk)
npm run docker:start     # Run container on port 3000
```

## Architecture

### API Client Pattern

Three axios instances in `/libs/api/client.ts`:
- `apiClient` - No authentication
- `apiClientJwt` - JWT Bearer token from cookies
- `apiClientMultipart` - JWT + multipart form data

Backend calls go through server actions in `/libs/api/` (auth.ts, resume.ts, matching.ts, application.ts, apply_pending.ts).

### Backend Microservices

Environment variables configure separate service URLs:
- `AUTH_API_URL` - Authentication
- `RESUMES_API_URL` - Resume management
- `MATCHING_API_URL` - Job matching
- `APPLICATION_API_URL` - Application processing
- `APPLY_PENDING_API_URL` - Pending applications

### Authentication Flow

JWT tokens stored in HTTP-only cookies. Auto-refresh triggers when token has < 10 minutes remaining. Cross-tab logout sync via localStorage events. See `/contexts/user-context.tsx` for token lifecycle.

### State Management

React Context providers composed in `/app/providers.tsx`:
- `UserContextProvider` - Auth state, token refresh
- `UserCreditsProvider` - Subscription credits/quota
- `SidenavContextProvider` - Navigation state
- `ThemeProvider` - Light/dark themes

### Stripe Integration

Pricing configuration in `/config.ts` with separate price IDs for production vs staging (determined by URL containing "pre" or "localhost"). Checkout flow via `/app/api/stripe/` routes.

### Key Directories

- `/app/api/` - Next.js API routes (auth callbacks, Stripe, webhooks)
- `/app/(auth)/` - Authentication pages (login, signup, password reset)
- `/app/dashboard/` - Main user dashboard
- `/components/ui/` - Radix UI + custom form components
- `/contexts/` - React Context providers
- `/libs/api/` - Backend API client functions
- `/libs/validations/` - Zod schemas
- `/libs/types/` - TypeScript definitions

## Tech Stack

- **Framework**: Next.js 14.2.24 with App Router
- **UI**: Tailwind CSS + DaisyUI + Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **HTTP**: Axios with JWT interceptors
- **Payments**: Stripe
- **Email**: Mailgun

## Conventions

- Use `"use client"` directive for interactive components
- Form validation schemas in `/libs/validations/`
- Backend API calls as server actions in `/libs/api/`
- Toast notifications via React Hot Toast
- Path alias: `@/*` maps to root directory
