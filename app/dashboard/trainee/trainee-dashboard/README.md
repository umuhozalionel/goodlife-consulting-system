# Trainee App - Next.js 15.2.4

A complete full-stack Next.js application for trainee management with Firebase authentication, magic links, QR check-ins, and comprehensive dashboard features.

## Features

- 🔐 **Authentication**: Magic link + OAuth (Google) authentication via Firebase
- 📧 **Email Integration**: MailerSend for magic link delivery
- 📱 **QR Check-in**: HTML5 QR code scanning for session check-ins
- 📊 **Progress Tracking**: Comprehensive fitness progress charts and analytics
- 📅 **Calendar**: Training session scheduling and management
- 👤 **Profile Management**: Editable user profiles with goals and preferences
- 🎯 **Goals System**: Set and track fitness goals with progress indicators
- 📈 **Dashboard**: Real-time stats, recommendations, and activity tracking

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Authentication**: Firebase Auth (Client + Admin SDK)
- **Email**: MailerSend API
- **Styling**: Tailwind CSS v4 + Headless UI
- **QR Scanning**: html5-qrcode
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- Firebase project with Authentication enabled
- MailerSend account and API key
- Vercel CLI installed globally

### Setup Instructions

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo-url>
   cd trainee-app-nextjs
   npm install
   \`\`\`

2. **Link to Vercel**
   \`\`\`bash
   vercel link
   \`\`\`

3. **Environment Variables**
   
   Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   **Required Environment Variables:**

   **Firebase Configuration:**
   - Get these from Firebase Console → Project Settings → General → Your apps
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

   **Firebase Admin SDK:**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key" and download the JSON file
   - Base64 encode the entire JSON file content:
     \`\`\`bash
     base64 -i path/to/serviceAccountKey.json
     \`\`\`
   - Set `FIREBASE_SERVICE_ACCOUNT_B64` to the base64 string

   **MailerSend:**
   - Sign up at [MailerSend](https://www.mailersend.com/)
   - Get API key from Dashboard → API Tokens
   - Set `MAILERSEND_API_KEY`

   **App URL:**
   - Development: `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - Production: Set to your Vercel domain

4. **Pull Environment Variables from Vercel**
   \`\`\`bash
   vercel env pull .env.local
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   vercel dev
   \`\`\`

6. **Deploy to Production**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`
   
   Auto-deployment will trigger on Vercel.

## Project Structure

\`\`\`
app/
├── api/
│   ├── send-magic-link/route.ts    # Magic link email API
│   └── auth/verify/route.ts        # Auth verification endpoint
├── auth/verify/page.tsx            # Magic link verification page
├── signup/trainee/
│   ├── page.tsx                    # Trainee signup/login
│   └── dashboard/
│       ├── page.tsx                # Main dashboard
│       ├── progress/page.tsx       # Progress tracking
│       └── calendar/page.tsx       # Training calendar
├── layout.tsx                      # Root layout with auth provider
└── page.tsx                        # Home page (redirects to signup)

components/
├── auth-guard.tsx                  # Route protection
├── auth-context.tsx                # Auth state management
├── dashboard-header.tsx            # Dashboard navigation
├── qr-check-in.tsx                 # QR scanner modal
├── magic-link-form.tsx             # Magic link request form
├── google-auth-button.tsx          # Google OAuth button
├── progress-chart.tsx              # Progress visualization
├── training-calendar.tsx           # Calendar component
├── profile-edit-modal.tsx          # Profile editing
└── ui/                             # Shadcn/ui components

lib/
├── firebase.ts                     # Firebase client config
├── firebase-admin.ts               # Firebase admin config
└── mailersend.ts                   # Email utilities
\`\`\`

## Authentication Flow

1. **Magic Link**: User enters email → API generates custom token → MailerSend delivers email → User clicks link → Auto sign-in
2. **Google OAuth**: Direct Google sign-in with popup → Redirect to dashboard
3. **Auth Guards**: Protected routes automatically redirect unauthenticated users

## Key Features Explained

### QR Check-in System
- Uses `html5-qrcode` library for camera access
- Validates QR codes for gym/session check-ins
- Records attendance automatically

### Progress Tracking
- Workout frequency charts
- Strength progression tracking
- Body composition monitoring
- Goal achievement metrics

### Training Calendar
- Monthly view with session scheduling
- Session details and management
- Trainer assignments and booking

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | App base URL | `https://trainee-app.vercel.app` |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client config | From Firebase console |
| `FIREBASE_SERVICE_ACCOUNT_B64` | Base64 encoded service account | `eyJ0eXBlIjoi...` |
| `MAILERSEND_API_KEY` | MailerSend API key | `mlsn.abc123...` |

## Deployment Notes

- **Vercel Functions**: All API routes are configured as serverless functions
- **Environment Variables**: Set in Vercel dashboard or via CLI
- **Domain Configuration**: Update `NEXT_PUBLIC_APP_URL` for production
- **Firebase Security**: Ensure Firestore security rules are properly configured

## Development Commands

\`\`\`bash
npm run dev          # Start development server with Vercel
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
\`\`\`

## Troubleshooting

### Common Issues

1. **Magic Links Not Working**
   - Check `MAILERSEND_API_KEY` is valid
   - Verify `NEXT_PUBLIC_APP_URL` matches your domain
   - Ensure Firebase custom tokens are enabled

2. **QR Scanner Not Loading**
   - Check camera permissions in browser
   - Ensure HTTPS in production (required for camera access)

3. **Firebase Auth Errors**
   - Verify all Firebase config variables are set
   - Check Firebase project has Authentication enabled
   - Ensure service account has proper permissions

4. **Build Errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Check all environment variables are properly set

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Firebase and MailerSend documentation
3. Open an issue in the repository

## License

MIT License - see LICENSE file for details.
