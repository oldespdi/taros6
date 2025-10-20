# ReveLove.IA - Mystical Love Reading Application

## Overview

ReveLove.IA is a mystical love reading web application that uses AI to generate personalized romantic profiles. The application guides users through a multi-step journey including personal information collection, photo upload, tarot card selection, questionnaire, and culminates in a personalized love reading with an AI-generated profile. The experience includes a payment gateway (PIX) integration for unlocking final results.

The application creates an intimate, spiritually-themed user experience with a dark mystical aesthetic, featuring particle effects, romantic gradients, and progressive disclosure to build anticipation throughout the user journey.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- TanStack Query (React Query) for server state management
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom mystical theme

**Design System:**
- Dark mode-first approach with mystical purple/pink color palette
- Custom CSS variables for theming (defined in index.css)
- Google Fonts integration: Playfair Display (serif headings), Poppins (body), Montserrat (CTAs)
- Responsive design with mobile-first breakpoints
- Particle effect backgrounds with animated hearts and sparkles

**State Management Strategy:**
- Session-based flow managed through local component state in App.tsx
- Step-based navigation system with distinct screens: landing → user-form → photo-upload → card-selection → questionnaire → final-results → payment
- API communication handled through centralized queryClient with custom error handling
- Session data persisted through backend API calls at each step

**Component Architecture:**
- Page components for each step of the user journey
- Shared UI components from Shadcn/ui library
- Reusable components: MysticalBackground, LoadingScreen, ProgressIndicator
- Form handling with React Hook Form and Zod validation

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for type-safe server code
- ESM (ES Modules) throughout the codebase
- Custom Vite integration for SSR in development

**API Design:**
- RESTful endpoints for session management
- Multipart form data handling with Multer for photo uploads
- File storage in `attached_assets/uploads/` directory
- Session creation, update, and retrieval endpoints
- Payment status update endpoints

**Business Logic:**
- Profile generation algorithm based on user inputs (name, age, gender, zodiac sign, card selections, questionnaire answers)
- Multiple pre-defined profile templates with randomized selection
- Trait assignment based on user characteristics
- Image association logic for gender-specific profile images

**Storage Strategy:**
- In-memory storage implementation (MemStorage class) as default
- Interface-based storage abstraction (IStorage) allowing for easy database integration
- Session data structure includes: user info, selected cards, questionnaire answers, generated profile, payment status
- UUID-based session identification

### Data Storage Solutions

**Current Implementation:**
- In-memory Map-based storage for rapid prototyping and development
- Session data stored with full typing through TypeScript interfaces

**Database Schema (Prepared for PostgreSQL via Drizzle ORM):**
- `reading_sessions` table with columns:
  - id (UUID primary key)
  - name, age, gender, zodiacSign (user information)
  - photoUrl (uploaded photo reference)
  - selectedCards (JSON array of card IDs)
  - questionnaireAnswers (JSON object of Q&A pairs)
  - generatedProfile (JSON object with title, description, traits, imageUrl)
  - isPaid, paymentId (payment tracking)
  - createdAt (timestamp)

**Migration Strategy:**
- Drizzle Kit configured for PostgreSQL migrations
- Schema defined in `shared/schema.ts` with Zod validation schemas
- Environment variable DATABASE_URL required for production database
- Can easily swap MemStorage for Drizzle-based implementation

### External Dependencies

**Payment Integration:**
- PushInPay API for PIX payment processing
- API endpoint: `https://api.pushinpay.com.br/api`
- Environment variable: `PUSHINPAY_TOKEN`
- Payment flow: Create PIX charge → Display QR code → Poll for payment confirmation
- Test mode available when token not configured

**UI Component Library:**
- Shadcn/ui components (30+ components installed)
- Radix UI primitives for accessible, unstyled components
- Components configured with custom theme tokens
- Alias-based imports via tsconfig paths

**Image Assets:**
- Static assets stored in `attached_assets/` directory
- Gender-specific profile images (women1-3.png, men1-3.png)
- Logo and branding assets
- Served via Express static middleware

**Third-Party Services:**
- Google Fonts CDN for typography
- No external analytics or tracking services mentioned
- No authentication/authorization system (anonymous sessions)

**Development Tools:**
- Replit-specific plugins for development environment
- Runtime error modal overlay
- Dev banner and cartographer for Replit integration
- Hot module replacement via Vite

**Form Validation:**
- Zod for runtime type validation
- React Hook Form with Zod resolver integration
- Validation schemas derived from Drizzle schema definitions

**Utility Libraries:**
- clsx and tailwind-merge for conditional className composition
- date-fns for date manipulation
- nanoid for unique ID generation
- class-variance-authority for variant-based component styling