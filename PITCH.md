# 🌟 SRM Events 2K26 - Comprehensive Technical Pitch & Architecture Overview

## 🚀 The Elevator Pitch
**SRM Events 2K26** is a premium, full-stack event management platform designed specifically for the SRM University ecosystem. It bridges the gap between event organizers, student clubs, and the student body by offering a seamless, highly optimized, and engaging digital experience. 

Whether it is discovering the latest technical hackathons, exploring cultural fests, or browsing a directory of 22+ student clubs, SRM Events 2K26 provides a centralized hub with instant, frictionless registration capabilities.

---

## 🏗️ System Architecture

The application is built adopting a modern **Client-Server Architecture** utilizing a decoupled RESTful paradigm.

### High-Level Data Flow
1. **Client Tier (Frontend):** A Single Page Application (SPA) built using React. It handles the entire UI rendering, client-side routing, form validation, and state management natively in the browser.
2. **API Tier (Backend):** A robust Node.js and Express server that exposes decoupled REST APIs. It handles business logic, registration processing, and user authorization mapping.
3. **Data Tier (Persistence):** Currently leverages asynchronous JSON-based persistent file storage (mimicking a NoSQL Document Store). It is intentionally abstracted so that an ORM/ODM (like Mongoose for MongoDB) can be dropped in seamlessly for V2.

### Security & Authentication Flow
- The application uses **Stateless JWT Authentication**.
- When a user registers, their raw password is run through salt and hashing algorithms via `bcryptjs` before being persisted.
- Upon successful login, the backend signs a JSON Web Token (JWT) with a secret key.
- The React client stores this token (in memory/local storage) and attaches it as a Bearer Token in the `Authorization` header for all subsequent protected API requests (like registering for an event).

---

## 💻 Comprehensive Technical Details

We have spared no effort in choosing the most cutting-edge, reliable, and performant technologies available in the Javascript ecosystem today.

### 🎨 Frontend Details & Technologies

Built for maximum responsiveness, type-safety, and visual excellence.

- **Core Framework & Runtime:**
  - **React (v19.2.0):** The latest version of the industry-leading component-based library, utilizing Hooks, concurrent features, and streamlined state management.
  - **TypeScript (v5.9.3):** Brings strict, static typing to both components and API consumption, ensuring zero runtime type errors.
  - **Vite (v7.2.4):** Next-generation frontend tooling providing lightning-fast Hot Module Replacement (HMR) and optimized, minified production builds via Rollup & esbuild.
  - **React Router DOM (v7.13.0):** Powerful client-side routing, enabling instant page transitions without full browser reloads.

- **Design System & Styling:**
  - **TailwindCSS (v3.4):** A utility-first CSS framework allowing for rapid, constrained UI development.
  - **shadcn/ui & Radix Primitives:** Unstyled, accessible UI components building blocks (`@radix-ui/react-*`). This includes highly complex components like Dropdown Menus, Dialogs, Selects, Accordions, Tabs, and context menus.
  - **Next Themes:** Supplying seamless Light/Dark mode toggling.
  - **tw-animate-css & tailwind-animate:** For smooth, buttery micro-interactions, entrance animations, and keyframes.

- **Forms & Data Handling:**
  - **React Hook Form (v7.70):** Highly performant and flexible form state management minimizing unnecessary re-renders.
  - **Zod (v4.3):** Schema declaration and data validation—working hand-in-hand with `@hookform/resolvers` to strictly validate inputs on the client before sending network requests.

- **User Experience Enhancements:**
  - **Lucide React:** Providing sharp, highly scalable SVG iconography.
  - **Sonner:** A highly opinionated toast notification system giving users instant feedback regarding their actions (like successful registration or login errors).
  - **Recharts:** Used for embedding responsive, composable analytics charts.
  - **Embla Carousel React:** Extremely fluid component for looping through event showcases and featured lists.
  - **Date-fns & React Day Picker:** Robust manipulation and visual selection of dates and deadlines.

---

### ⚙️ Backend Details & Technologies

A lightweight, asynchronous, and scalable event-driven backend meant to serve tens of thousands of concurrent generic requests.

- **Core Runtime & Server:**
  - **Node.js:** The fast V8 javascript runtime allowing us to execute Javascript outside the browser.
  - **Express.js (v4.18.2):** A minimalistic, scalable, unopinionated routing framework handling middleware chains, request parsing, and response serialization.

- **Security & Authorization:**
  - **JSON Web Tokens (jsonwebtoken):** Encrypting payloads to verify student identity securely across domain origins.
  - **Bcryptjs:** Salting and hashing passwords to defend against rainbow-table attacks and compromised data.
  - **CORS:** Middleware configuring Cross-Origin Resource Sharing, strictly permitting only our front-end Vite server to interface with the protected endpoints.

- **Identifiers:**
  - **UUID (v9.0.0):** Generating mathematically unique and unguessable identifiers for users, clubs, events, and registration receipts.

---

## 🎯 The Problem & Proposed Value Proposition

### The Problem
Historically, SRM students must scrape through overloaded WhatsApp groups, disparate Instagram pages, and physical notice boards to discover upcoming events and hackathons. Not only do they frequently miss deadlines, but clubs also struggle to analyze registration traction and seamlessly collect detailed data.

### The Solution: A Unified Digital Hub
**SRM Events 2K26** creates a highly beautiful, intuitive environment solving this.
- **Unified Discovery:** A consolidated directory categorized into Technical, Cultural, and Sports.
- **Frictionsless One-Click Registration:** Verified users simply tap once to confirm their event seat. 
- **Centralized Club Footprint:** 22+ active clubs get their dedicated profiles displaying past achievements and upcoming calendars.
- **Top-Tier DX & UX:** A beautiful dark mode interface, responsive across desktops, tablets, and phones alike.

---

## 🔮 Future Architecture Roadmap (V2.0)

While the current MVP architecture uses an in-memory/file system fallback to validate product-market fit rapidly, the codebase is structurally prepared for major expansions:

1. **Database Migration:** Swapping the JSON adapter for MongoDB via Mongoose Models to handle relational data linking between Event References and User References dynamically.
2. **Payment Gateway Integration:** Securely routing paid event ticketing via Razorpay/Stripe, utilizing server-side webhooks for instant fulfillment.
3. **Real-time Notifications:** WebSockets (Socket.io) or Server-Sent Events (SSE) to push instant "Event Starting Soon" notifications and broadcast announcements globally.
4. **Cloud Deployment (AWS):** Containerizing both modules using Docker, deploying to ECS, and routing static assets through S3/CloudFront.

---

**SRM Events 2K26** represents more than an assignment or project; it is the definitive, architecturally robust blueprint for modern campus engagement.
