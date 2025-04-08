
import { InstagramUser, InstagramMedia, InstagramComment } from "@/types/instagram";

// Mock data for development
const MOCK_PROFILE: InstagramUser = {
  id: "123456789",
  username: "instagram_user",
  fullName: "Instagram Test User",
  profilePicture: "https://ui-avatars.com/api/?name=Instagram+User&background=4A2C6D&color=fff",
  bio: "This is a mock Instagram profile for development purposes.",
  website: "https://example.com",
  followers: 1250,
  following: 450,
  postsCount: 3
};

const createMockComment = (id: string, text: string): InstagramComment => ({
  id,
  text,
  username: `user_${Math.floor(Math.random() * 1000)}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
  profilePicture: `https://ui-avatars.com/api/?name=User+${id}&background=9575CD&color=fff`,
  replies: []
});

const MOCK_MEDIA: InstagramMedia[] = [
  {
    id: "media_1",
    mediaType: "IMAGE",
    mediaUrl: "https://source.unsplash.com/random/800x800?nature",
    permalink: "https://instagram.com/p/mock1",
    caption: "Enjoying the beautiful nature! #nature #outdoors",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    comments: [
      createMockComment("comment_1_1", "Beautiful view!"),
      createMockComment("comment_1_2", "Where is this place?")
    ],
    likeCount: 145
  },
  {
    id: "media_2",
    mediaType: "IMAGE",
    mediaUrl: "https://source.unsplash.com/random/800x800?food",
    permalink: "https://instagram.com/p/mock2",
    caption: "Delicious lunch today! #foodie #yummy",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    comments: [
      createMockComment("comment_2_1", "Looks so tasty!")
    ],
    likeCount: 89
  },
  {
    id: "media_3",
    mediaType: "IMAGE",
    mediaUrl: "https://source.unsplash.com/random/800x800?travel",
    permalink: "https://instagram.com/p/mock3",
    caption: "Exploring new places! #travel #adventure",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    comments: [
      createMockComment("comment_3_1", "I've always wanted to visit there!"),
      createMockComment("comment_3_2", "Take me with you next time!"),
      createMockComment("comment_3_3", "Great photo!")
    ],
    likeCount: 212
  }
];

// Mock service functions
export const fetchUserProfile = async (): Promise<InstagramUser> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_PROFILE;
};

export const fetchUserMedia = async (): Promise<InstagramMedia[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  return MOCK_MEDIA;
};

export const postComment = async (mediaId: string, text: string): Promise<InstagramComment> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newComment: InstagramComment = {
    id: `comment_new_${Date.now()}`,
    text,
    username: "instagram_user", // Current user
    timestamp: new Date().toISOString(),
    profilePicture: MOCK_PROFILE.profilePicture,
    replies: []
  };
  
  // In a real app, this would send the comment to the API
  // Here we just return the new comment object
  return newComment;
};

export const postReply = async (mediaId: string, commentId: string, text: string): Promise<InstagramComment> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newReply: InstagramComment = {
    id: `reply_new_${Date.now()}`,
    text,
    username: "instagram_user", // Current user
    timestamp: new Date().toISOString(),
    profilePicture: MOCK_PROFILE.profilePicture
  };
  
  // In a real app, this would send the reply to the API
  return newReply;
};
