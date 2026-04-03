# Sales Management Frontend

A modern, role-based sales management system built with **Next.js**, **TypeScript**, and **React**. This frontend application provides comprehensive tools for both **Sellers** and **Admins** to manage customers, products, sales, and performance metrics.

---

## 📋 Overview

**Sales Management** is a dual-role study project that streamlines sales operations:

- **For Sellers**: Register customers, create sales, track personal performance, and manage customer relationships
- **For Admins**: Oversee all sales, manage sellers and products, generate reports, and track business metrics

The application implements role-based access control (RBAC) with separate dashboards and workflows for each user type.

---

## 🏗️ Project Structure

```
sales-management-front/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Public auth routes
│   │   ├── login/page.tsx
│   │   └── registrar/page.tsx
│   ├── admin/                    # Admin dashboard & management
│   │   ├── dashboard/page.tsx
│   │   ├── produtos/page.tsx
│   │   ├── vendas/page.tsx
│   │   ├── vendedores/page.tsx
│   │   └── relatorios/page.tsx
│   ├── vendedor/                 # Seller dashboard & workflows
│   │   ├── dashboard/page.tsx
│   │   ├── clientes/page.tsx
│   │   ├── vendas/page.tsx
│   │   ├── desempenho/page.tsx
│   │   └── perfil/page.tsx
│   ├── api/                      # Next.js API routes (proxy to backend)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── seller/                   # Seller-specific components
│   ├── landing/                  # Landing page components
│   ├── auth/                     # Auth components
│   └── ui/                       # Shadcn/ui components
├── contexts/                     # React Context (Auth context)
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts
│   ├── use-sales.ts
│   ├── use-customers.ts
│   ├── use-products.ts
│   ├── use-users.ts
│   ├── use-dashboard.ts
│   └── ...
├── services/                     # API service layer
│   ├── auth.service.ts
│   ├── sales.service.ts
│   ├── customers.service.ts
│   ├── products.service.ts
│   ├── users.service.ts
│   └── dashboard.service.ts
├── types/                        # TypeScript type definitions
├── lib/                          # Utilities
│   ├── constants.ts
│   ├── utils.ts
│   ├── api-client.ts
│   └── service-utils.ts
├── middleware.ts                 # Next.js middleware (auth guards)
└── tailwind.config.ts
```

---

## 🎯 What's Implemented

### ✅ Core Features

#### Authentication & Authorization

- [x] User registration (sellers only)
- [x] User login with role-based redirects
- [x] JWT-based authentication with cookies
- [x] Role-based route protection (ADMIN vs SELLER)
- [x] Automatic logout on token expiration
- [x] Redirect to appropriate dashboard by role

#### Dashboard & Analytics

- [x] **Admin Dashboard**: Real-time stats (total sales, revenue, customer count, seller count, product count)
- [x] **Seller Dashboard**: Personal metrics and recent sales
- [x] Performance metrics page (seller) with period selection
- [x] Sales trend charts
- [x] Payment method distribution
- [x] Top products insights
- [x] Pending payments list

#### Sales Management

- [x] **Create Sales**: Full workflow with customer search, product selection, quantity management
- [x] **Sales List**: View, filter by status, search by customer/ID
- [x] **Sales Details**: View complete sale receipt with items breakdown
- [x] **Sales Status Updates**: Change status (PENDING/CONFIRMED/CANCELLED)
- [x] **Payment Status Tracking**: Mark as paid/pending
- [x] **Discount Support**: Apply discounts to sales
- [x] **Payment Methods**: Support for PIX, Cash, Debit Card, Credit Card

#### Customer Management

- [x] **Create Customers**: Add new customers with optional contact info
- [x] **Customer Search**: Real-time search functionality
- [x] **Customer Details**: View customer info and access sales history
- [x] **Sales History**: Fetch customer statement for past 12 months
- [x] **Customer Contact Tracking**: Phone and address support

#### Product Management (Admin)

- [x] Product list with search
- [x] Create/Edit/Delete products
- [x] Stock tracking
- [x] Price management
- [x] Product categorization
- [x] Active/Inactive status

#### Seller Management (Admin)

- [x] View all sellers (filtered by SELLER role)
- [x] Search sellers by name/email
- [x] Create new sellers
- [x] Edit seller information
- [x] Deactivate/Reactivate sellers

#### User Profile Management

- [x] View profile information (read-only)
- [x] Change password form (UI ready, backend endpoint pending)
- [x] Account actions (deactivate/delete account)
- [x] Profile statistics

#### Reports (Admin)

- [x] Sales statistics
- [x] Charts and visualizations
- [x] Revenue tracking
- [x] Payment status breakdown

### 📦 Technical Implementation

#### UI Components

- [x] Shadcn/ui component library (30+ components)
- [x] Responsive design with Tailwind CSS
- [x] Dark mode support
- [x] Toast notifications
- [x] Modal dialogs
- [x] Data tables
- [x] Charts (Recharts integration)
- [x] Form validation with react-hook-form

#### State Management

- [x] React Context for authentication
- [x] Custom hooks for data fetching (use-sales, use-customers, etc.)
- [x] Optimistic UI updates
- [x] Loading states with spinners
- [x] Error handling with user-friendly messages

#### API Integration

- [x] Service layer abstraction
- [x] Centralized error handling
- [x] Pagination support
- [x] Search/Filter utilities
- [x] Response normalization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8080/api` , for testing add this on .env
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
pnpm start
```

Visit `http://localhost:3000`

- Follow E2E_TESTING.md to test everything

## 🔗 Backend Integration

**Backend Repository**: https://github.com/otaviotemoteo/sales-management-back.git

**API Endpoints**: `http://localhost:8080/api`

**Key Endpoints Used:**

- `/auth/*` - Authentication
- `/sales/*` - Sales CRUD & statements
- `/customers/*` - Customer management
- `/products/*` - Product catalog
- `/users/*` - User management
- `/dashboard/*` - Analytics & metrics

---

## 📊 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Fetch API with custom wrapper
- **Date Handling**: date-fns

---

## 🎯 Known Gaps & Areas for Improvement

### Backend Integration Needed

| Feature                      | Current Status                              | Solution                                                     |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| **Change Password**          | UI ready, disabled                          | Implement backend endpoint: `PATCH /api/users/{id}/password` |
| **User Profile Fields**      | Phone, CPF, city, state stored UI-side only | Add fields to API: `UserResponse` should include these       |
| **User Ratings**             | Always shows 0                              | Implement rating system in backend                           |
| **Seller Performance Stats** | Shows all zeros                             | Add endpoint: `GET /api/dashboard/seller/{id}`               |
| **Product Growth %**         | Always 0%                                   | Add `growth` metric to product dashboard data                |
| **Export Reports**           | Button disabled                             | Implement: `GET /api/reports/sales/export?format=csv`        |
| **Per-Seller Dashboard**     | Not available                               | Add stats filtering by seller in dashboard endpoints         |

### Frontend Improvements

- [ ] Add email verification on registration
- [ ] Implement password reset flow
- [ ] Add bulk operations (multi-select sales/products)
- [ ] Implement advanced search with filters
- [ ] Add data export (CSV/PDF)
- [ ] Add real-time notifications
- [ ] Implement infinite scroll for large lists
- [ ] Add customer segmentation/tags
- [ ] Implement sales pipeline visualization
- [ ] Add inventory alerts for low stock
- [ ] Implement commission tracking for sellers
- [ ] Add activity audit logs
- [ ] Implement two-factor authentication (2FA)
- [ ] Add customer lifetime value (CLV) calculation
- [ ] Implement A/B testing for sales strategies

### Code Quality & Testing

- [ ] Add comprehensive unit tests (Jest)
- [ ] Add integration tests (Playwright/Cypress)
- [ ] Improve E2E test coverage
- [ ] Add visual regression testing
- [ ] Implement error boundary components
- [ ] Add request cancellation for cleanup
- [ ] Add performance monitoring (web vitals)
- [ ] Implement stale-while-revalidate caching strategy

### Performance & UX

- [ ] Implement pagination lazy loading instead of fixed size
- [ ] Add request debouncing for search
- [ ] Add loading skeletons for better UX
- [ ] Implement undo/redo functionality for actions
- [ ] Add keyboard shortcuts

## 🔐 Security Features

- ✅ Role-based access control (RBAC)
- ✅ Authentication via JWT (stored in secure cookies)
- ✅ Protected routes with middleware
- ✅ Input validation on forms
- ✅ CSRF protection via cookies
- ✅ XSS protection via React sanitization
- ✅ Secure token parsing in middleware

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layouts
- ✅ Touch-friendly interactions
- ✅ Collapsible sidebars for mobile

---

## 🎨 UI/UX Features

- ✅ Dark/Light mode toggle
- ✅ Consistent design system
- ✅ Loading states & skeletons
- ✅ Toast notifications for feedback
- ✅ Modal dialogs for confirmations
- ✅ Real-time form validation
- ✅ Accessible components (WCAG)
- ✅ Keyboard navigation support

---

## 📦 Environment Variables

Create `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Optional: Analytics, feature flags, etc.
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make your changes
3. Commit with conventional commits: `git commit -m "feat: description"`
4. Push to branch: `git push origin feat/feature-name`
5. Create a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:

- send an email to otaviotemoteo@gmail.com

---

## 🚦 Project Status

- **Current Version**: 0.1.0
- **Status**: Active Development
- **Last Updated**: April 3, 2026

> **Note**: This is an MVP with core features implemented. See "Known Gaps" section for pending improvements and backend integrations needed.
