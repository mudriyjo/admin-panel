# Admin Panel - React + TypeScript

A modern, secure, and fully-featured admin panel built with React, TypeScript, and Tailwind CSS. This project provides a robust foundation for building administrative interfaces with authentication, protected routes, and a beautiful UI.

## 🚀 Features

### Component Architecture
- ✅ **10+ Modular Components**: Fully reusable and type-safe
- ✅ **Composition Pattern**: Build complex UIs from simple pieces
- ✅ **Generic Types**: Table and other components support any data type
- ✅ **CSS Module Pattern**: Each component with dedicated CSS file
- ✅ **Smart Defaults**: Sensible defaults with full customization

### Authentication System
- ✅ **Two-Step Authentication**: Email/password login followed by OTP verification
- ✅ **JWT Token Management**: Automatic token refresh when expiring within 3 minutes
- ✅ **Protected Routes**: Middleware to guard authenticated pages
- ✅ **Persistent Sessions**: Auth state persisted in localStorage with Zustand
- ✅ **Secure Logout**: Complete state cleanup on logout

### User Interface
- ✅ **Modular Component Library**: 10+ reusable, typed components
- ✅ **Responsive Dashboard**: Collapsible sidebar with icon and expanded views
- ✅ **Modern Design**: Based on shadcn/ui with custom enhancements
- ✅ **Dark Mode Ready**: CSS variables for easy theme switching
- ✅ **Professional Layout**: Matches industry-standard admin panel designs
- ✅ **Data-Driven Tables**: Generic Table component with custom renderers
- ✅ **Loading States**: Built-in loading animations for async operations

### Form Validation
- ✅ **Client-Side Validation**: Using Zod schema validation
- ✅ **Real-time Feedback**: Instant validation as users type
- ✅ **Error Display**: Clear error messages for all form fields
- ✅ **Submit Protection**: Forms disabled until validation passes

### Security Features
- ✅ **XSS Protection**: Input sanitization and validation
- ✅ **CSRF Protection**: Axios configured with credentials
- ✅ **Token Security**: JWT tokens with automatic refresh
- ✅ **Type Safety**: Full TypeScript strict mode
- ✅ **No Vulnerabilities**: Clean npm audit

## 📦 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18 | UI library |
| **Language** | TypeScript 5 | Type safety |
| **Build Tool** | Vite 7 | Fast development & bundling |
| **Routing** | React Router v6 | Client-side routing |
| **State Management** | Zustand 4 | Lightweight state management |
| **Data Fetching** | TanStack Query v5 | Server state management |
| **HTTP Client** | Axios | API communication |
| **Validation** | Zod 3 | Schema validation |
| **UI Components** | shadcn/ui | Customizable components |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Icons** | Lucide React | Icon library |

## 🏗️ Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/              # Modular UI component library
│   │   ├── avatar.tsx           # User avatars with fallback
│   │   ├── button.tsx           # Enhanced button with loading states
│   │   ├── card.tsx             # Card container components
│   │   ├── divider.tsx          # Section dividers with text
│   │   ├── form.tsx             # Form wrapper & FormField component
│   │   ├── input.tsx            # Form input field
│   │   ├── label.tsx            # Form label
│   │   ├── link-button.tsx      # Link-styled buttons
│   │   ├── logo.tsx             # Configurable brand logo
│   │   ├── stat-card.tsx        # Dashboard statistics cards
│   │   └── table.tsx            # Data-driven table component
│   │
│   ├── layouts/         # Layout components
│   │   ├── auth-layout.tsx      # Login/OTP page layout
│   │   └── dashboard-layout.tsx # Main dashboard layout
│   │
│   ├── protected-route.tsx
│   └── public-route.tsx
│
├── pages/               # Page components
│   ├── login.tsx       # Login with email/password
│   ├── otp.tsx         # OTP verification
│   ├── dashboard.tsx   # Main dashboard
│   └── not-found.tsx   # 404 page
│
├── stores/              # State management
│   └── auth-store.ts   # Authentication state (Zustand)
│
├── lib/                 # Utilities and configs
│   ├── api-client.ts   # Axios instance with interceptors
│   ├── constants.ts    # App constants
│   ├── utils.ts        # Helper functions
│   └── validation.ts   # Zod schemas
│
├── types/               # TypeScript types
│   ├── auth.ts         # Authentication types
│   └── api.ts          # API response types
│
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔧 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd admin-panel
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your API configuration:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔐 Authentication Flow

### 1. Login Process
1. User enters email and password
2. Client validates inputs with Zod
3. POST request to `/auth/login`
4. Server sends OTP to email
5. Navigate to OTP page

### 2. OTP Verification
1. User enters 8-digit OTP
2. Client validates OTP format
3. POST request to `/auth/verify-otp`
4. Server returns JWT + refresh token
5. Tokens saved to Zustand store
6. Navigate to dashboard

### 3. Token Refresh
1. On route change, check token expiry
2. If expires in < 3 minutes, refresh
3. POST request to `/auth/refresh` with refresh token
4. Update tokens in store
5. If refresh fails, logout and redirect

## 🔒 Security Features

### 1. **Input Validation**
- All user inputs validated with Zod schemas
- Email format validation
- Password minimum length enforcement
- OTP numeric and length validation

### 2. **Token Management**
- JWT tokens stored in Zustand with localStorage persistence
- Automatic token refresh before expiration
- Tokens included in all authenticated requests via Axios interceptors
- Clean logout removes all auth data

### 3. **Route Protection**
- `ProtectedRoute` component wraps authenticated pages
- Automatic redirect to login for unauthenticated users
- Token refresh check on every route change
- Previous location saved for post-login redirect

### 4. **API Security**
- Axios configured with `withCredentials: true` for CSRF protection
- Request timeout of 30 seconds
- Automatic error handling in response interceptor
- 401 responses trigger automatic logout

### 5. **XSS Prevention**
- React's built-in XSS protection (auto-escaping)
- No `dangerouslySetInnerHTML` used
- Input sanitization through Zod validation

## 🎨 Component Library

This project features a **highly modular and reusable component architecture** designed for maximum flexibility and maintainability.

### Core UI Components

#### **Form Components** (`form.tsx`)
Unified form system with built-in error handling:
```tsx
<Form onSubmit={handleSubmit} error={apiError}>
  <FormField
    label="Email"
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    error={errors.email}
    labelAction={<LinkButton>Forgot password?</LinkButton>}
  />
  <Button type="submit" isLoading={isLoading}>Submit</Button>
</Form>
```

**Features:**
- Form-level error display (API errors)
- Field-level validation errors
- Optional helper text
- Label actions (links, buttons)
- Fully accessible with proper IDs

#### **Button** (`button.tsx`)
Enhanced button with loading states:
```tsx
<Button
  variant="default"
  size="lg"
  isLoading={isLoading}
  loadingText="Please wait..."
>
  Submit
</Button>
```

**Props:**
- `variant`: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- `size`: `default`, `sm`, `lg`, `icon`
- `isLoading`: Show spinner and disable
- `loadingText`: Optional loading text

#### **Avatar** (`avatar.tsx`)
User profile pictures with smart fallback:
```tsx
<Avatar
  src="/path/to/image.jpg"
  alt="User Name"
  fallback="JD"
  size="md"
/>
```

**Features:**
- Auto-fallback on image error
- Sizes: `sm` (2rem), `md` (2.5rem), `lg` (3rem)
- Uppercase fallback text
- Circular design

#### **StatCard** (`stat-card.tsx`)
Dashboard statistics with icons and trends:
```tsx
<StatCard
  title="Total Users"
  value="2,345"
  description="+20.1% from last month"
  trend="up"
  icon={<Users />}
/>
```

**Props:**
- `trend`: `up` (green), `down` (red), `neutral` (gray)
- Hover animation
- Customizable icon

#### **Table** (`table.tsx`)
Data-driven table with type safety:
```tsx
interface User {
  email: string
  role: string
}

const columns: TableColumn<User>[] = [
  { header: 'Email', accessor: 'email' },
  { header: 'Role', accessor: 'role', className: 'table-cell-muted' },
  { header: 'Actions', accessor: (row) => <Button>Edit</Button> }
]

<Table
  columns={columns}
  data={users}
  emptyMessage="No users found"
  onRowClick={(user) => console.log(user)}
/>
```

**Features:**
- Fully typed with generics
- Function accessors for custom rendering
- Per-column custom classes
- Built-in empty state
- Optional row click handler
- Responsive with horizontal scroll

#### **Logo** (`logo.tsx`)
Configurable brand logo:
```tsx
<Logo
  brandName="Acme Inc."
  size="md"
  showBrand={true}
/>
```

**Sizes:** `sm`, `md`, `lg`

#### **Divider** (`divider.tsx`)
Section separator with optional text:
```tsx
<Divider text="Or continue with" />
<Divider /> {/* Simple line */}
```

#### **LinkButton** (`link-button.tsx`)
Text links styled as buttons:
```tsx
<LinkButton variant="primary" onClick={handleClick}>
  Forgot password?
</LinkButton>
```

**Variants:** `primary`, `muted`

### Layout Components

#### **AuthLayout** (`auth-layout.tsx`)
Unified layout for authentication pages:
```tsx
<AuthLayout
  title="Login to your account"
  description="Enter your credentials"
  brandName="Acme Inc."
>
  {/* Form content */}
</AuthLayout>
```

**Features:**
- Centered card layout
- Logo and branding
- Responsive design
- Consistent styling

#### **DashboardLayout** (`dashboard-layout.tsx`)
Main application layout:
- Collapsible sidebar (icon ↔ full view)
- Navigation with active state
- User profile display with Avatar
- Breadcrumb navigation
- Header actions
- Logout functionality

### Base Components (shadcn/ui)
- `Card` - Container with Header, Content, Footer
- `Input` - Form input field
- `Label` - Form label

## 🧩 Component Patterns

### Composition Over Configuration
Components are designed to work together seamlessly:
```tsx
// Login page in ~30 lines
<AuthLayout title="Login" description="Welcome back">
  <Form onSubmit={handleSubmit} error={apiError}>
    <FormField label="Email" {...emailProps} />
    <FormField label="Password" {...passwordProps} />
    <Button isLoading={isLoading}>Login</Button>
    <Divider text="Or continue with" />
    <Button variant="outline">GitHub</Button>
  </Form>
</AuthLayout>
```

### Type Safety
All components are fully typed with TypeScript:
- Props interfaces exported
- Generic types for data-driven components (Table)
- Strict null checking
- IntelliSense support

### Customization
Every component accepts:
- `className` for custom styles
- Standard HTML props via spread
- `ref` forwarding (React.forwardRef)
- CSS variable theming

## 🔌 API Integration

### Expected API Endpoints

#### 1. Login
```typescript
POST /auth/login
Request: { email: string, password: string }
Response: { data: { requiresOTP: boolean }, message?: string }
```

#### 2. Verify OTP
```typescript
POST /auth/verify-otp
Request: { email: string, otp: string }
Response: {
  data: {
    user: { id: string, email: string, name?: string },
    tokens: { accessToken: string, refreshToken: string }
  }
}
```

#### 3. Refresh Token
```typescript
POST /auth/refresh
Request: { refreshToken: string }
Response: {
  data: {
    tokens: { accessToken: string, refreshToken: string }
  }
}
```

### JWT Token Format
The access token should be a JWT with the following payload:
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "exp": 1234567890,
  "iat": 1234567890
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Environment Variables
Make sure to set `VITE_API_BASE_URL` in your production environment.

### Production Checklist
- [ ] Set production API URL
- [ ] Enable HTTPS
- [ ] Configure CORS on backend
- [ ] Set up error monitoring
- [ ] Enable gzip compression
- [ ] Add CSP headers

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API Connection Issues**
- Check `VITE_API_BASE_URL` in `.env`
- Verify backend is running
- Check CORS configuration on backend

**TypeScript Errors**
```bash
# Run TypeScript compiler check
npm run build
```

## 📝 Code Style Guide

### TypeScript
- Use strict mode (enabled in tsconfig.json)
- Define interfaces for all props and types
- Avoid `any` type
- Use type inference where possible
- Export prop interfaces for reusability

### React
- Use functional components with `React.forwardRef`
- Use hooks for state and effects
- Keep components small and focused
- Extract reusable logic into custom hooks
- Prefer composition over prop drilling

### Component Architecture
- **Separation of Concerns**: Data, logic, and presentation separated
- **Single Responsibility**: Each component does one thing well
- **Reusability**: Build once, use everywhere
- **Type Safety**: Fully typed props and generics where needed
- **Accessibility**: Proper ARIA labels and semantic HTML

### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardLayout`, `FormField`)
- **Files**: kebab-case (e.g., `dashboard-layout.tsx`, `stat-card.tsx`)
- **Functions**: camelCase (e.g., `handleSubmit`, `getCellValue`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **CSS Classes**: kebab-case (e.g., `form-field`, `stat-card-icon`)

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🔖 Quick Reference

### Component Cheat Sheet

| Component | Import | Primary Use |
|-----------|--------|-------------|
| `Form` | `@/components/ui/form` | Form wrapper with error handling |
| `FormField` | `@/components/ui/form` | Input field with label and validation |
| `Button` | `@/components/ui/button` | Buttons with loading states |
| `Avatar` | `@/components/ui/avatar` | User profile pictures |
| `StatCard` | `@/components/ui/stat-card` | Dashboard metrics display |
| `Table` | `@/components/ui/table` | Data tables with type safety |
| `Logo` | `@/components/ui/logo` | Brand logo component |
| `Divider` | `@/components/ui/divider` | Section separators |
| `LinkButton` | `@/components/ui/link-button` | Link-styled buttons |
| `AuthLayout` | `@/components/layouts/auth-layout` | Login/OTP page wrapper |
| `DashboardLayout` | `@/components/layouts/dashboard-layout` | Main app layout |

### Common Patterns

**Form with validation:**
```tsx
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

<Form onSubmit={handleSubmit} error={apiError}>
  <FormField label="Name" name="name" value={value} onChange={onChange} error={error} />
  <Button isLoading={isLoading}>Submit</Button>
</Form>
```

**Data table:**
```tsx
import { Table, type TableColumn } from '@/components/ui/table'

const columns: TableColumn<DataType>[] = [
  { header: 'Name', accessor: 'name' },
  { header: 'Actions', accessor: (row) => <Button>Edit</Button> }
]

<Table columns={columns} data={data} />
```

**Dashboard stats:**
```tsx
import { StatCard } from '@/components/ui/stat-card'
import { Users } from 'lucide-react'

<StatCard
  title="Total Users"
  value="1,234"
  description="+12% from last month"
  trend="up"
  icon={<Users />}
/>
```

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**
