
import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InstagramMedia, InstagramComment } from "@/types/instagram";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { postComment, postReply } from "@/services/instagramService";

interface MediaCardProps {
  media: InstagramMedia;
  updateMedia: (mediaId: string, updatedMedia: InstagramMedia) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, updateMedia }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formattedDate = format(new Date(media.timestamp), "MMMM d, yyyy");
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    const updatedMedia = {
      ...media,
      likeCount: isLiked ? media.likeCount - 1 : media.likeCount + 1
    };
    updateMedia(media.id, updatedMedia);
    
    if (!isLiked) {
      toast.success("Post liked!");
    }
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success("Post saved to collection");
    } else {
      toast.success("Post removed from collection");
    }
  };
  
  const handleShare = () => {
    toast.success("Share dialog opened");
    // In a real app, this would open a share dialog
  };
  
  const handleAddComment = async (text: string) => {
    setIsSubmitting(true);
    try {
      const newComment = await postComment(media.id, text);
      const updatedMedia = {
        ...media,
        comments: [...media.comments, newComment]
      };
      updateMedia(media.id, updatedMedia);
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddReply = async (commentId: string, text: string) => {
    try {
      const newReply = await postReply(media.id, commentId, text);
      
      const updatedComments = media.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      });
      
      const updatedMedia = {
        ...media,
        comments: updatedComments
      };
      
      updateMedia(media.id, updatedMedia);
      toast.success("Reply added successfully");
    } catch (error) {
      console.error("Failed to add reply:", error);
      toast.error("Failed to add reply. Please try again.");
    }
  };
  
  const displayedComments = showAllComments 
    ? media.comments 
    : media.comments.slice(0, 2);
  
  return (
    <Card className="w-full overflow-hidden shadow-md mb-6">
      <CardHeader className="p-4 bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* This would use the post author's profile picture in a real app */}
          <img 
            src={`https://ui-avatars.com/api/?name=instagram_user&background=4A2C6D&color=fff`}
            alt="Post author"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">instagram_user</h3>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <img 
          src={media.mediaUrl} 
          alt={media.caption || "Instagram post"} 
          className="w-full aspect-square object-cover"
        />
      </CardContent>
      
      <CardFooter className="flex flex-col p-4">
        <div className="w-full flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 hover:bg-transparent"
              onClick={handleLike}
            >
              <Heart 
                className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 hover:bg-transparent"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 hover:bg-transparent"
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 hover:bg-transparent"
            onClick={handleSave}
          >
            <Bookmark 
              className={`h-6 w-6 ${isSaved ? 'fill-empathy-purple text-empathy-purple' : ''}`} 
            />
          </Button>
        </div>
        
        <p className="text-sm font-medium mb-1">{media.likeCount} likes</p>
        
        {media.caption && (
          <p className="text-sm mb-3">
            <span className="font-medium">instagram_user</span> {media.caption}
          </p>
        )}
        
        {media.comments.length > 0 && (
          <div className="w-full">
            {media.comments.length > 2 && !showAllComments && (
              <button 
                onClick={() => setShowAllComments(true)}
                className="text-sm text-gray-500 mb-2"
              >
                View all {media.comments.length} comments
              </button>
            )}
            
            <div className="space-y-1">
              {displayedComments.map((comment) => (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  onReply={handleAddReply}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 w-full">
          <CommentForm onSubmit={handleAddComment} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MediaCard;
