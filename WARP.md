# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Development server (runs on port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database
npm run db:seed
```

### Testing Commands
```bash
# Test TipTap editor functionality
# Navigate to: http://localhost:3001/test-editor
```

## High-Level Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth with custom middleware
- **UI Components**: Radix UI + Custom components
- **Rich Text Editor**: TipTap with extensive customizations
- **Styling**: Tailwind CSS + Custom CSS variables
- **Type Safety**: TypeScript with strict configuration

### Key Architecture Patterns

#### Authentication & Authorization
- **Supabase Integration**: Three client types for different use cases:
  - `@/lib/supabase/client.ts` - Browser client for client components
  - `@/lib/supabase/server.ts` - Server client for server components
  - `@/lib/supabase/admin.ts` - Admin client with service role key
- **Middleware Protection**: `/src/middleware.ts` protects admin routes with email-based authorization
- **Route Protection**: Admin routes require `NEXT_PUBLIC_ADMIN_EMAIL` environment variable match

#### Content Management Architecture
- **Dual Content Types**: 
  - `Egitim` (Education/Courses) - Has pricing, instructor, level fields
  - `BlogPost` - Has author, excerpt, category fields
- **JSON Content Storage**: All rich content stored as JSON in PostgreSQL using TipTap format
- **Content Rendering**: 
  - Edit mode: Uses `TipTapEditor` component
  - View mode: Uses `TipTapWrapper` component for SSR-safe rendering

#### TipTap Rich Text Editor System
- **Comprehensive Extensions**: Tables, images, videos, code blocks, task lists, mentions
- **Image Handling**: Resizable images with upload API endpoint (`/api/upload`)
- **Custom Styling**: Extensive CSS for editor appearance and content rendering
- **Content Format**: JSON structure for rich content, HTML fallback for simple text

#### Database Schema Patterns
- **UUID Primary Keys**: All models use `gen_random_uuid()` for IDs
- **Audit Fields**: `created_at` and `updated_at` with proper timezone handling
- **Relationship Modeling**: 
  - Users can have cart items and desired education preferences
  - Education items can be in multiple carts and desired by multiple users
  - Contact messages for inquiry management

#### API Route Organization
```
/api/
├── admin/stats/          # Admin dashboard statistics
├── auth/register/        # User registration with profile creation
├── blog/                 # Blog CRUD operations
├── cart/                 # Shopping cart management
├── contact/              # Contact form submissions
├── courses/egitimler/    # Education/course management
├── hero/                 # Homepage slider management
├── upload/               # File upload handling
└── user/profile/         # User profile management
```

#### Component Architecture
- **Page-Level Components**: Each major section (blog, courses, contact) has dedicated components
- **Admin Components**: Separate component tree for admin functionality
- **Common Components**: Shared UI components in `/src/components/common/`
- **Dynamic Loading**: Heavy components (TipTap editor) use Next.js dynamic imports for performance

### Environment Configuration
- **Development Port**: 3001 (to avoid conflicts)
- **Image Optimization**: WebP/AVIF support with remote pattern allowlist
- **Webpack Optimizations**: Custom chunk splitting for TipTap, Radix UI, and other heavy libraries

### Key Files and Their Purposes
- `/src/app/conditionalLayout.tsx` - Handles different layouts for admin vs public pages
- `/src/middleware.ts` - Authentication and route protection
- `/src/components/admin/TipTapEditor.tsx` - Main rich text editor component
- `/src/components/common/TipTapWrapper.tsx` - Read-only content renderer
- `/prisma/schema.prisma` - Database schema with all models and relationships

### Development Best Practices
- **Path Aliases**: Use `@/*` imports for src directory
- **Component Organization**: Feature-based folder structure
- **Type Safety**: All API responses and form data properly typed
- **SSR Compatibility**: Dynamic imports for client-only components
- **Performance**: Code splitting configured for optimal bundle sizes

### Content Management Workflow
1. **Admin Login**: Email-based authentication through Supabase
2. **Content Creation**: Rich text editor with full formatting capabilities
3. **Media Upload**: Images uploaded through `/api/upload` endpoint
4. **Content Storage**: JSON format in PostgreSQL for flexibility
5. **Public Rendering**: SSR-compatible content display with proper styling

### Testing and Debugging
- **Editor Testing**: Use `/test-editor` route for TipTap functionality testing
- **Content Export**: Test editor allows JSON export for debugging
- **Database Seeding**: Use `npm run db:seed` for development data

This architecture supports a full-featured content management system with rich text editing, user management, and e-commerce functionality for educational content.