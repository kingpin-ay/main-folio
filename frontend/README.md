# Product Requirements Document (PRD)

## Project: Dynamic Portfolio Maker

### Overview

A web application that allows users to create, customize, and share personal portfolios. Users can upload their data (bio, projects, blogs, social links, etc.), and the application generates a unique URL where their portfolio is displayed dynamically.

---

## Goals

- Enable users to easily create and update their personal portfolio.
- Allow users to upload their data (profile, projects, blogs, etc.).
- Generate a unique, shareable URL for each user’s portfolio.
- Display the user’s portfolio dynamically at the generated URL.

---

## Features

### 1. User Data Upload

- **Form-based UI** for users to input/upload:
  - Personal information (name, bio, profile image, etc.)
  - Social links (GitHub, LinkedIn, etc.)
  - Projects (title, description, links, images)
  - Blogs (title, content, links)
  - Tech stack/groups
- **Validation** for required fields and correct formats.
- **API endpoint** to receive and store user data.

### 2. Dynamic Portfolio Generation

- **Unique URL** for each user, e.g., `/user/[username]`.
- **Server-side rendering** of portfolio pages using uploaded data.
- **Components** for:
  - Landing section (bio, name, social links)
  - Projects section
  - Blogs section
  - About section (description, tech stack)
  - Footer (contact/social links)
- **Tabs** for tech stack, with default selection.

### 3. Data Retrieval & Display

- **API endpoint** to fetch user data by username.
- **Dynamic routing** to render portfolio at `/user/[username]`.
- **Error handling** for non-existent users (e.g., “User not found”).

### 4. User Experience

- **Responsive design** for mobile and desktop.
- **Modern UI** with cards, tabs, and navigation.
- **Loading and error states** for data fetching.

---

## User Stories

1. **As a user,** I can fill out a form to upload my portfolio data.
2. **As a user,** I receive a unique URL to view and share my portfolio.
3. **As a visitor,** I can view a user’s portfolio by visiting their unique URL.
4. **As a user,** I can update my portfolio data and see changes reflected at my URL.

---

## Technical Requirements

- **Frontend:** React (Next.js), TypeScript, modern UI library (e.g., shadcn/ui).
- **Backend:** API endpoints for data upload and retrieval.
- **Database:** Store user profiles, projects, blogs, etc.
- **Routing:** Dynamic routes for user portfolios.
- **Validation:** Both client-side and server-side.
- **Deployment:** Should be easily deployable (e.g., Vercel, Netlify).

---

## Out of Scope

- User authentication (unless specified).
- Advanced analytics or admin dashboards.
- Payment or monetization features.

---

## Success Metrics

- Users can successfully create and update portfolios.
- Portfolios are accessible via unique URLs.
- No major UI/UX bugs on mobile or desktop.
- Fast load times for portfolio pages.

---

Let me know if you want this in a specific format (Markdown, .txt, etc.) or if you want to add/remove any features!
