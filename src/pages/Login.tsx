
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoginButton from "@/components/LoginButton";
import EmpathyLogo from "@/components/EmpathydLogo";

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="triangle-pattern flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <div className="mb-8 flex justify-center">
            <EmpathyLogo />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-empathy-purple mb-2">Instagram Integration</h1>
            <p className="text-gray-600">Connect with your Instagram account to display your profile, posts, and manage comments.</p>
          </div>
          
          <div className="flex justify-center">
            <LoginButton />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By logging in, you agree to the terms and conditions for using the Instagram API.</p>
          </div>
        </div>
      </div>
      
      <footer className="bg-empathy-purple text-white p-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Empathy Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
