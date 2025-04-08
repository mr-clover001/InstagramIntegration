
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reply, MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";
import { InstagramComment } from "@/types/instagram";

interface CommentProps {
  comment: InstagramComment;
  onReply: (commentId: string, text: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const handleReply = async (text: string) => {
    await onReply(comment.id, text);
    setShowReplyForm(false);
  };
  
  const formattedDate = format(new Date(comment.timestamp), "MMM d, yyyy 'at' h:mm a");
  
  return (
    <div className="py-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img 
            src={comment.profilePicture || `https://ui-avatars.com/api/?name=${comment.username}&background=4A2C6D&color=fff`} 
            alt={comment.username}
            className="w-8 h-8 rounded-full bg-gray-200"
          />
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 px-3 py-2 rounded-lg">
            <div className="font-semibold text-sm">{comment.username}</div>
            <p className="text-sm">{comment.text}</p>
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <span>{formattedDate}</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
          
          {showReplyForm && (
            <div className="mt-2">
              <CommentForm 
                onSubmit={handleReply}
                placeholder="Write a reply..."
                buttonText="Reply"
                isReply
              />
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="pl-4 mt-2 border-l-2 border-gray-200">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="py-1">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0">
                      <img 
                        src={reply.profilePicture || `https://ui-avatars.com/api/?name=${reply.username}&background=4A2C6D&color=fff`} 
                        alt={reply.username}
                        className="w-6 h-6 rounded-full bg-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <div className="font-semibold text-xs">{reply.username}</div>
                        <p className="text-xs">{reply.text}</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {format(new Date(reply.timestamp), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
