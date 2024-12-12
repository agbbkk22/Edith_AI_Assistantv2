import { GoogleAuthConfig } from '../types/google';

export const googleConfig: GoogleAuthConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  clientSecret: '',
  redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || '',
  scopes: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar'
  ]
};