
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserMedia } from "@/services/instagramService";
import { useAuth } from "@/contexts/AuthContext";
import MediaCard from "./MediaCard";
import { InstagramMedia } from "@/types/instagram";
import { Skeleton } from "@/components/ui/skeleton";

const MediaFeed: React.FC = () => {
  const { user } = useAuth();
  const [mediaList, setMediaList] = useState<InstagramMedia[]>([]);
  
  const { isLoading, data } = useQuery({
    queryKey: ["userMedia"],
    queryFn: fetchUserMedia,
    enabled: !!user,
  });
  
  // Use useEffect to handle data updates
  useEffect(() => {
    if (data) {
      setMediaList(data);
    }
  }, [data]);
  
  const updateMedia = (mediaId: string, updatedMedia: InstagramMedia) => {
    setMediaList(prev => prev.map(item => 
      item.id === mediaId ? updatedMedia : item
    ));
  };
  
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2].map((i) => (
          <div key={i} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="w-full aspect-square" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (mediaList.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No media found in feed.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {mediaList.map((media) => (
        <MediaCard 
          key={media.id} 
          media={media} 
          updateMedia={updateMedia}
        />
      ))}
    </div>
  );
};

export default MediaFeed;
