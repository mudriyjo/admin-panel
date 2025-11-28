# Admin Panel - React + TypeScript

A modern, secure, and fully-featured admin panel built with React, TypeScript, and Tailwind CSS. This project provides a robust foundation for building administrative interfaces with authentication, protected routes, and a beautiful UI.

## 🚀 Features

### Authentication System
- ✅ **Two-Step Authentication**: Email/password login followed by OTP verification
- ✅ **JWT Token Management**: Automatic token refresh when expiring within 3 minutes
- ✅ **Protected Routes**: Middleware to guard authenticated pages
- ✅ **Persistent Sessions**: Auth state persisted in localStorage with Zustand
- ✅ **Secure Logout**: Complete state cleanup on logout

### User Interface
- ✅ **Responsive Dashboard**: Collapsible sidebar with icon and expanded views
- ✅ **Modern Design**: Based on shadcn/ui components with Tailwind CSS
- ✅ **Dark Mode Ready**: CSS variables for easy theme switching
- ✅ **Professional Layout**: Matches industry-standard admin panel designs

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
│   ├── ui/              # shadcn/ui components (Button, Input, Card, etc.)
│   ├── layouts/         # Layout components
│   │   └── dashboard-layout.tsx
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

## 🎨 UI Components

### Available shadcn/ui Components
- `Button` - Multiple variants (default, outline, ghost, etc.)
- `Input` - Form input with validation support
- `Label` - Form labels
- `Card` - Card container with header, content, footer

### Layout Components
- `DashboardLayout` - Main layout with collapsible sidebar
  - Hamburger menu to toggle sidebar
  - Navigation with icons and labels
  - User profile display
  - Logout button

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

### React
- Use functional components
- Use hooks for state and effects
- Keep components small and focused
- Extract reusable logic into custom hooks

### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardLayout`)
- **Files**: kebab-case (e.g., `dashboard-layout.tsx`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**
