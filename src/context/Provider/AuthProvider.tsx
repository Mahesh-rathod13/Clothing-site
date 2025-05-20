import { useState, useEffect } from "react";
import type { ReactNode } from 'react';

import AuthContext from '../AuthContext';
import api from '../../services/api';
import { endPoints } from "../../constants/urls";
import { isTokenExpired } from '../../utils/authUtils';

// Define User type based on your API response structure
interface User {
  id: string;
  name?: string;
  email?: string;
  // Add more fields as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        console.log('Loading user...');
        // const storedUserId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken) {
            // console.log('Stored User ID:', storedUserId);   // Check if user ID is stored
            console.log(isTokenExpired(accessToken));     // Check if token is expired

          if (isTokenExpired(accessToken) && refreshToken) {
            try {
              const refreshResponse = await api.post(endPoints.refresh, { refreshToken });
              if (refreshResponse.data.accessToken) {
                localStorage.setItem('accessToken', refreshResponse.data.accessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
                if (refreshResponse.data.refreshToken) {
                  localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
                }
              }
            } catch (error) {
              console.error("Token refresh failed:", error);
              logout();
              return;
            }
          } else {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          }

          try {
            console.log('Fetching user profile...');
            const res = await api.get(`${endPoints.profile}`);
            setUser(res.data);
            console.log(res.data)
          } catch (error) {
            console.error("Profile fetch failed:", error);
            logout();
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // const userRes = await api.get(endPoints.profile);
      // setUser(userRes.data);
      // console.log(userRes.data);
      // localStorage.setItem('userId', userRes.data.id);
      
    } catch (error) {
      console.error("Login failed:", error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    // window.location.href = '/auth/login';
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
