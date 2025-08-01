# Equilibria Dashboard

A personal dashboard application built with React, TypeScript, and Firebase.

## Features

- 🔐 Firebase Authentication (Email/Password & Google Sign-in)
- 📝 Journal Entries with mood tracking
- 💰 Expense tracking and analytics
- 🎯 Goal setting and progress tracking
- 📚 Academic performance tracking
- 🌙 Dark/Light theme support
- 📱 Responsive design

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google Sign-in)
3. Create a Firestore database
4. Get your Firebase configuration

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id-here
```

### 5. Firestore Security Rules

Set up your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.firebaseUid;
    }
    
    match /journalEntries/{entryId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /goals/{goalId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /academicRecords/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 6. Run the application
```bash
npm run dev
```

## Usage

1. Visit the application in your browser
2. Sign up with email/password or Google
3. Start using the dashboard features:
   - Write journal entries
   - Track expenses
   - Set and monitor goals
   - Record academic performance

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **UI Components**: Framer Motion, Lucide React
- **Charts**: Recharts

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── lib/               # Utility libraries and API
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

## Troubleshooting

### Loading Screen Issue
If the app gets stuck on the loading screen:
1. Check your Firebase configuration in `.env`
2. Ensure Firestore is enabled in your Firebase project
3. Check browser console for errors
4. Verify authentication is enabled in Firebase Console

### Authentication Issues
- Make sure Email/Password authentication is enabled
- For Google Sign-in, ensure Google provider is configured
- Check that your domain is authorized in Firebase Console #   n e w - l a t e s t - e q u i  
 #   e q u l i b r i a - f i n a l - l a s t  
 #   n e w - e q u i l i  
 