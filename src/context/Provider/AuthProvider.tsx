import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { endPoints } from "../../constants/urls";
import api from "../../services/api";
import { isTokenExpired } from "../../utils/authUtils";
import AuthContext from "../AuthContext";

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
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (storedUser && accessToken) {
        if (isTokenExpired(accessToken)) {
          console.log("Access token expired. Refreshing...");
          await api.post(endPoints.refresh, {
            refreshToken: localStorage.getItem("refreshToken"),
          });
          await api.get(endPoints.profile);
          setUser(JSON.parse(storedUser));
        } else {
          await api.get(endPoints.profile, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(JSON.parse(storedUser));
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    // window.location.href = "/auth/login";
    Navigate("/auth/login");
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
