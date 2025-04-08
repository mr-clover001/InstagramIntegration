import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Types for our user and auth context
interface User {
  id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Instagram API response for development
const MOCK_USER: User = {
  id: "123456789",
  username: "instagram_user",
  fullName: "Instagram Test User",
  profilePicture: "https://ui-avatars.com/api/?name=Instagram+User&background=4A2C6D&color=fff",
  accessToken: "mock-access-token-123"
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("instagram_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("instagram_user");
      }
    }
  }, []);

  // Mock login function
  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // This simulates the Instagram OAuth flow
      // In a real app, this would redirect to Instagram authorization
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // In development, we use mock data
      setUser(MOCK_USER);
      localStorage.setItem("instagram_user", JSON.stringify(MOCK_USER));
      toast.success("Successfully logged in with Instagram");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login with Instagram. Please try again.");
      toast.error("Failed to login with Instagram");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("instagram_user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
