
export interface InstagramUser {
  id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  bio?: string;
  website?: string;
  followers?: number;
  following?: number;
  postsCount?: number;
}

export interface InstagramMedia {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  comments: InstagramComment[];
  likeCount: number;
}

export interface InstagramComment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  profilePicture?: string;
  replies?: InstagramComment[];
}
