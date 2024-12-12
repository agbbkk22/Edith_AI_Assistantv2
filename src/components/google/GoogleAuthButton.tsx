import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Calendar, LogIn } from 'lucide-react';

interface GoogleAuthButtonProps {
  onLogin: (response: any) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  user: { name: string; picture: string; email: string } | null;
}

export function GoogleAuthButton({
  onLogin,
  onLogout,
  isAuthenticated,
  user,
}: GoogleAuthButtonProps) {
  const login = useGoogleLogin({
    onSuccess: onLogin,
    scope: 'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar',
  });

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-white"
        />
        <span className="text-sm font-medium text-white">{user.name}</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <div className="flex gap-1">
        <Mail size={16} className="text-red-500" />
        <Calendar size={16} className="text-blue-500" />
      </div>
      <span className="font-medium">Sign in with Google</span>
      <LogIn size={16} />
    </button>
  );
}