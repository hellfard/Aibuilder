# BuilderAI - AI-Powered Website Builder

## Overview
BuilderAI is a fully functional, production-ready website builder application that leverages artificial intelligence to help users create stunning websites quickly and easily. The platform is built with JavaScript (converted from TypeScript), integrated with Firebase/Firestore for data persistence, and powered by Gemini AI for intelligent website generation.

## Recent Changes
- **September 23, 2025**: Successfully converted entire codebase from TypeScript to JavaScript
- **September 23, 2025**: Integrated Firebase Authentication with Google, GitHub, and Discord sign-in support
- **September 23, 2025**: Implemented Firestore database for project and user data management
- **September 23, 2025**: Added comprehensive Gemini AI integration for website generation and content creation
- **September 23, 2025**: Configured deployment settings for production hosting on Replit

## Project Architecture

### Frontend (JavaScript/React)
- **Framework**: React 18 with Vite build system
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library
- **State Management**: Zustand for global state
- **Routing**: React Router for navigation

### Backend Services
- **Authentication**: Firebase Auth with OAuth providers (Google, GitHub, Discord)
- **Database**: Firestore for real-time data synchronization
- **AI Integration**: Google Gemini AI for website generation and content creation
- **Storage**: Firebase for file and asset management

### Key Features
1. **AI-Powered Website Generation**: Create complete websites from natural language descriptions
2. **User Authentication**: Secure sign-in with multiple OAuth providers
3. **Real-time Collaboration**: Firestore-powered project sharing and updates
4. **Component Library**: Pre-built components (Hero, Features, Pricing, etc.)
5. **Responsive Design**: Mobile-first design approach
6. **Dark Theme**: Modern dark UI with purple/indigo accents

### File Structure
```
src/
├── components/
│   ├── Editor/
│   │   ├── components/        # Website building blocks
│   │   ├── Canvas.jsx         # Visual editor
│   │   └── ComponentPanel.jsx # Component library
│   └── Layout/
│       ├── AppLayout.jsx      # Main app wrapper
│       ├── Sidebar.jsx        # Navigation sidebar
│       └── TopBar.jsx         # Header with user menu
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Login.jsx             # Authentication page
│   ├── Dashboard.jsx         # User dashboard
│   ├── Editor.jsx            # Website editor
│   ├── AIAssistant.jsx       # AI-powered features
│   └── [other pages]
├── services/
│   ├── auth.js               # Firebase authentication
│   └── database.js           # Firestore operations
├── stores/
│   └── useStore.js           # Zustand state management
├── firebase.js               # Firebase configuration
├── gemini.js                 # AI integration
└── App.jsx                   # Main application component
```

## User Preferences
- **Language**: JavaScript (converted from TypeScript per user request)
- **Database**: Firestore (preferred over SQLite for real-time features)
- **AI Provider**: Google Gemini for intelligent content generation
- **Styling**: Dark theme with modern UI/UX
- **Authentication**: Multiple OAuth providers for user convenience

## Environment Variables Required
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
GEMINI_API_KEY=your_gemini_api_key
```

## Deployment
- **Target**: Replit Autoscale deployment
- **Build Command**: `yarn build`
- **Start Command**: `npx serve -s dist -l 5000`
- **Port**: 5000 (configured for Replit environment)

## Getting Started
1. Sign in with Google, GitHub, or Discord
2. Create a new project from the dashboard
3. Use the AI Assistant to generate a website by describing what you want
4. Customize components using the visual editor
5. Preview and publish your website

## AI Capabilities
- **Website Generation**: Create complete layouts from descriptions
- **Content Creation**: Generate compelling copy and headlines
- **Component Enhancement**: Improve existing components with AI suggestions
- **Design Recommendations**: Get AI-powered color and layout suggestions

## Current Status
✅ TypeScript to JavaScript conversion complete
✅ Firebase Authentication integrated
✅ Firestore database configured
✅ Gemini AI integration functional
✅ UI/UX enhancements completed
✅ Deployment configuration ready
✅ All core features tested and working

## Next Steps
- Add email/password authentication option
- Implement website preview and publishing
- Add more AI-powered features
- Enhance component library
- Add collaboration features