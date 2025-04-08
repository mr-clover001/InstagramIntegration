
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ProfileHeader from "@/components/ProfileHeader";
import MediaFeed from "@/components/MediaFeed";
import EmpathyLogo from "@/components/EmpathydLogo";

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <EmpathyLogo />
          
          <div className="text-sm text-gray-600">
            Instagram Integration
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">
          <ProfileHeader />
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold text-empathy-purple mb-4">Your Instagram Feed</h2>
            <MediaFeed />
          </div>
        </div>
      </main>
      
      <footer className="bg-empathy-purple text-white p-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Empathy Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
