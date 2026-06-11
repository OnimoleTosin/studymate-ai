# StudyMate AI

An AI-powered study assistant built with Next.js, Firebase, and Gemini AI.

## Features (MVP)
- Email/password authentication (Firebase Auth)
- Create and manage study notes (Firestore)
- AI-generated summaries (Gemini)
- AI-generated quizzes (Gemini)
- "Teach Me" — explain notes at beginner, high school, or university level
- Study history dashboard

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Auth & Database**: Firebase Authentication + Firestore
- **AI**: Google Gemini 1.5 Flash

---

## Getting Started

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/studymate-ai.git
cd studymate-ai
npm install
```

### 2. Set up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Create a **Firestore database** (start in test mode)
5. Go to Project Settings → Your Apps → Add Web App
6. Copy the config values

### 3. Get your Gemini API key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key (free tier is generous)

### 4. Add environment variables
```bash
cp .env.example .env.local
```
Fill in `.env.local` with your Firebase config and Gemini key.

### 5. Add Firestore indexes
In Firebase Console → Firestore → Indexes, add composite indexes for:
- Collection `notes`: `userId` (ASC) + `createdAt` (DESC)
- Collection `summaries`: `userId` (ASC) + `createdAt` (DESC)  
- Collection `quizzes`: `userId` (ASC) + `createdAt` (DESC)

Or just run the app — Firebase will show error links in the console that create the indexes automatically.

### 6. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add your environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

---

## Project Structure
```
studymate-ai/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login
│   ├── register/page.tsx     # Register
│   ├── dashboard/page.tsx    # Dashboard
│   └── notes/
│       ├── new/page.tsx      # Create note
│       └── [id]/page.tsx     # View note + AI features
├── components/
│   └── AuthProvider.tsx      # Firebase auth context
├── lib/
│   ├── firebase.ts           # Firebase init
│   ├── firestore.ts          # Firestore helpers
│   ├── gemini.ts             # Gemini AI helpers
│   └── utils.ts              # cn() utility
└── types/index.ts            # TypeScript types
```

## Roadmap (Version 2)
- [ ] PDF upload with text extraction (pdf.js)
- [ ] Flashcard generator
- [ ] Study streaks
- [ ] Progress tracking
- [ ] Dark/light mode toggle
