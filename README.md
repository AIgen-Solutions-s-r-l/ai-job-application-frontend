<div align="center">

# AI Job Application Platform

### Intelligent Automation for Your Career

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

<br />

**Stop applying manually. Start getting interviews.**

[Getting Started](#-quick-start) · [Architecture](#-architecture) · [Tech Stack](#-tech-stack) · [Deployment](#-deployment)

</div>

---

## Overview

A next-generation job application platform that leverages AI to automate the entire job hunting process. From intelligent job matching to tailored resume generation and automated application submission — all in one seamless experience.

```
Upload Resume → AI Matching → Tailored Applications → Auto-Submit → Get Interviews
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Matching** | Smart algorithms match your profile with relevant opportunities from 100K+ sources |
| **Resume Tailoring** | Automatically customizes your resume for each application |
| **Cover Letter Generation** | AI-crafted cover letters that speak to each role |
| **One-Click Apply** | Submit hundreds of applications with a single click |
| **Application Tracking** | Real-time dashboard to monitor all your applications |
| **Interview Prep** | Built-in tools to prepare for upcoming interviews |

---

## 🏗 Architecture

```mermaid
flowchart TB
    subgraph Client["Frontend (Next.js)"]
        UI[React Components]
        CTX[Context Providers]
        API[API Client Layer]
    end

    subgraph Services["Backend Microservices"]
        AUTH[Auth Service]
        RESUME[Resume Service]
        MATCH[Matching Service]
        APP[Application Service]
        PENDING[Pending Queue]
    end

    subgraph External["External Services"]
        STRIPE[Stripe Payments]
        MAIL[Mailgun Email]
        GOOGLE[Google OAuth]
        S3[AWS S3/CDN]
    end

    UI --> CTX
    CTX --> API
    API --> AUTH
    API --> RESUME
    API --> MATCH
    API --> APP
    API --> PENDING

    AUTH --> GOOGLE
    UI --> STRIPE
    AUTH --> MAIL
    RESUME --> S3
```

### Application Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant R as Resume Service
    participant M as Matching Service
    participant AP as Application Service

    U->>F: Upload Resume
    F->>R: Parse & Extract Data
    R-->>F: Structured Profile

    U->>F: Search Jobs
    F->>M: Query with Profile
    M-->>F: Matched Opportunities

    U->>F: Select & Apply
    F->>AP: Submit Applications
    AP-->>F: Confirmation
    F-->>U: Success Dashboard
```

---

## 🛠 Tech Stack

<table>
<tr>
<td valign="top" width="33%">

### Frontend
![Next.js](https://img.shields.io/badge/-Next.js-000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

</td>
<td valign="top" width="33%">

### UI Components
![Radix UI](https://img.shields.io/badge/-Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white)
![DaisyUI](https://img.shields.io/badge/-DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![Motion](https://img.shields.io/badge/-Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Lucide](https://img.shields.io/badge/-Lucide-F56565?style=flat-square)

</td>
<td valign="top" width="33%">

### Integrations
![Stripe](https://img.shields.io/badge/-Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Mailgun](https://img.shields.io/badge/-Mailgun-F06B66?style=flat-square&logo=mailgun&logoColor=white)
![AWS](https://img.shields.io/badge/-AWS_S3-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![Google](https://img.shields.io/badge/-Google_OAuth-4285F4?style=flat-square&logo=google&logoColor=white)

</td>
</tr>
</table>

### Core Dependencies

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router), React 18, TypeScript 5.4 |
| **Styling** | Tailwind CSS 3.4, DaisyUI 4.10, CSS Variables |
| **State** | React Context API, React Hook Form, Zod Validation |
| **UI** | Radix UI Primitives, Headless UI, Motion (Framer) |
| **Data** | Axios, TanStack Table, JWT Authentication |
| **Payments** | Stripe (Checkout, Subscriptions, Webhooks) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- npm or yarn
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/AIgen-Solutions-s-r-l/ai-job-application-frontend.git
cd ai-job-application-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run check-types` | TypeScript type checking |
| `npm run docker:build` | Build Docker image |
| `npm run docker:start` | Run in Docker container |

---

## ⚙️ Configuration

### Environment Variables

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_DESCRIPTION="Your app description"
SITE_URL="https://yourdomain.com"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# Backend Services
AUTH_API_URL="https://api.yourdomain.com/auth"
RESUMES_API_URL="https://api.yourdomain.com/resumes"
MATCHING_API_URL="https://api.yourdomain.com/matching"
APPLICATION_API_URL="https://api.yourdomain.com/applications"

# Email (Mailgun)
MAILGUN_API_KEY="your-mailgun-key"
MAILGUN_DOMAIN="mg.yourdomain.com"

# AWS
AWS_S3_BUCKET="your-bucket"
AWS_CDN_URL="https://cdn.yourdomain.com"
```

---

## 🐳 Deployment

### Docker

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:start
```

### Production Build

```bash
# Build with linting
npm run build:with-lint

# Or build without lint (faster)
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── landing/           # Landing page sections
│   └── ...                # Feature components
├── contexts/              # React Context providers
├── libs/
│   ├── api/               # API client functions
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript definitions
│   └── validations/       # Zod schemas
├── public/                # Static assets
└── config.ts              # App configuration
```

---

## 🔐 Authentication Flow

```mermaid
stateDiagram-v2
    [*] --> Guest
    Guest --> Login: Credentials
    Guest --> OAuth: Google Sign-In
    Login --> Authenticated: Valid Token
    OAuth --> Authenticated: Valid Token
    Authenticated --> TokenRefresh: Token Expiring
    TokenRefresh --> Authenticated: New Token
    Authenticated --> Guest: Logout
    TokenRefresh --> Guest: Refresh Failed
```

---

## 📄 License

Proprietary - All Rights Reserved

---

<div align="center">

**Built with precision. Designed for results.**

</div>
