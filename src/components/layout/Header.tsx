import React from 'react';
import { BrainCircuit, Calendar, LogOut } from 'lucide-react';
import { GoogleAuthButton } from '../google/GoogleAuthButton';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

interface HeaderProps {
  onCalendarClick: () => void;
}

export function Header({ onCalendarClick }: HeaderProps) {
  const { authState, handleLogin, handleLogout } = useGoogleAuth();

  return (
    <div className="bg-blue-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24} />
          <div>
            <h1 className="text-xl font-semibold">EDITH</h1>
            <p className="text-blue-100 text-sm">Your Intelligent Business Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {authState.isAuthenticated && (
            <button
              onClick={onCalendarClick}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Calendar size={20} />
              <span className="text-sm">Calendar</span>
            </button>
          )}

          <div className="relative group">
            <GoogleAuthButton
              onLogin={handleLogin}
              onLogout={handleLogout}
              isAuthenticated={authState.isAuthenticated}
              user={authState.user}
            />

            {authState.isAuthenticated && authState.user && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 hidden group-hover:block">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={authState.user.picture}
                    alt={authState.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{authState.user.name}</p>
                    <p className="text-sm text-gray-500">{authState.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}