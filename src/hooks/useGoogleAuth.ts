import { useState, useCallback } from 'react';
import { GoogleAuthState, GoogleServices } from '../types/google';

export function useGoogleAuth() {
  const [authState, setAuthState] = useState<GoogleAuthState>({
    isAuthenticated: false,
    accessToken: null,
    user: null,
  });

  const [enabledServices, setEnabledServices] = useState<GoogleServices>({
    gmail: false,
    calendar: false,
    drive: false,
  });

  const handleLogin = useCallback(async (response: any) => {
    try {
      const { access_token } = response;
      
      // Fetch user info
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(res => res.json());

      setAuthState({
        isAuthenticated: true,
        accessToken: access_token,
        user: {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },
      });

      // Enable requested services
      setEnabledServices({
        gmail: true,
        calendar: true,
        drive: false,
      });
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    });
    setEnabledServices({
      gmail: false,
      calendar: false,
      drive: false,
    });
  }, []);

  return {
    authState,
    enabledServices,
    handleLogin,
    handleLogout,
  };
}