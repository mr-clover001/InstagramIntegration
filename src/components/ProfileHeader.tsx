
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/instagramService";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Link, Users } from "lucide-react";

const ProfileHeader: React.FC = () => {
  const { user, logout } = useAuth();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="w-full p-4 rounded-lg bg-white shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-64" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="w-full p-6 rounded-lg bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img 
            src={profile.profilePicture} 
            alt={profile.username}
            className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-empathy-purple object-cover" 
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-2xl font-bold">{profile.fullName}</h1>
            <span className="text-gray-500">@{profile.username}</span>
          </div>
          
          {profile.bio && (
            <p className="text-gray-700">{profile.bio}</p>
          )}
          
          {profile.website && (
            <a 
              href={profile.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-empathy-purple hover:underline"
            >
              <Link className="h-4 w-4 mr-1" />
              {profile.website}
            </a>
          )}
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="text-center">
              <span className="text-lg font-bold">{profile.postsCount}</span>
              <p className="text-gray-500 text-sm">Posts</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">{profile.followers?.toLocaleString()}</span>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">{profile.following?.toLocaleString()}</span>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="text-empathy-purple border-empathy-purple hover:bg-empathy-purple hover:text-white"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
