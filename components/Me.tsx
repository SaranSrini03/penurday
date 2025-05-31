"use client";

import { useState } from "react";
import { Settings, Share2, ArrowLeft, MoreHorizontal, Heart, MessageCircle, Repeat2, Send, Bookmark } from "lucide-react";
import UserDetails from "@/components/UserDetails";


export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("threads");

  const threads = [
    { 
      id: 1, 
      content: "Just witnessed a meteor shower — truly humbling to see the universe in motion. 🌠", 
      timestamp: "2h",
      likes: 142,
      replies: 23,
      reposts: 8,
      isLiked: false
    },
    { 
      id: 2, 
      content: "Excited about the upcoming SpaceX launch next week! The Starship test flight could be a game-changer for Mars exploration. What are your thoughts? 🚀", 
      timestamp: "1d",
      likes: 89,
      replies: 45,
      reposts: 12,
      isLiked: true
    },
    { 
      id: 3, 
      content: "The cosmos never fails to amaze me. Every star we see is a sun, potentially with its own planetary system. #stargazing #astronomy", 
      timestamp: "3d",
      likes: 256,
      replies: 67,
      reposts: 34,
      isLiked: false
    },
  ];

  const replies = [
    { 
      id: 1, 
      content: "Totally agree! The night sky is breathtaking tonight. I managed to capture some amazing shots with my telescope.", 
      timestamp: "1h", 
      repliedTo: "astro_photographer",
      likes: 12,
      replies: 3,
      reposts: 1,
      isLiked: false
    },
    { 
      id: 2, 
      content: "Thanks for sharing your thoughts on black holes! Your explanation really helped me understand Hawking radiation better.", 
      timestamp: "2d", 
      repliedTo: "cosmic_wanderer",
      likes: 28,
      replies: 8,
      reposts: 2,
      isLiked: true
    },
  ];

  interface Post {
    id: number;
    content: string;
    timestamp: string;
    likes: number;
    replies: number;
    reposts: number;
    isLiked: boolean;
    repliedTo?: string;
  }

  const PostCard = ({ post, isReply = false }: { post: Post; isReply?: boolean }) => (
    <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          <UserDetails detail="username" format="initial" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-gray-500 dark:text-gray-400 text-sm">@<UserDetails detail="username"/></span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{post.timestamp}</span>
            {isReply && (
              <>
                <span className="text-gray-500 dark:text-gray-400 text-sm">·</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Replying to @{post.repliedTo}</span>
              </>
            )}
          </div>
          <p className="text-gray-900 dark:text-white text-sm leading-5 mb-3">{post.content}</p>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between max-w-md">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                <MessageCircle size={16} />
              </div>
              <span className="text-sm">{post.replies}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                <Repeat2 size={16} />
              </div>
              <span className="text-sm">{post.reposts}</span>
            </button>
            
            <button className={`flex items-center gap-2 transition-colors group ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
              <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
              </div>
              <span className="text-sm">{post.likes}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                <Send size={16} />
              </div>
            </button>
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white max-w-xl mx-auto border-x border-gray-200 dark:border-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center px-4 py-3">
        <button
          onClick={() => window.history.back()}
          aria-label="Go Back"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-xl text-gray-900 dark:text-white"><UserDetails detail="username"/></h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">42 threads</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Share Profile"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={() => alert("Settings clicked!")}
            aria-label="Settings"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="px-6 pt-8 pb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
              <UserDetails detail="username" format="initial" />
            </div>
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white mb-1"><UserDetails detail="username"/></h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4"><UserDetails detail="name"/></p>
          </div>
          <button className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Edit Profile
          </button>
        </div>
        
        <p className="text-gray-200  mb-6 leading-6">
          Add a bio to let people know more about you. You can include links, hashtags, and mentions.
        </p>

        <div className="flex gap-6 mb-6">
          <div className="text-gray-900 dark:text-white">
            <span className="font-bold">420</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">followers</span>
          </div>
          <div className="text-gray-900 dark:text-white">
            <span className="font-bold">180</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">following</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="flex border-b border-gray-200 dark:border-gray-800 sticky top-[73px] bg-white dark:bg-black z-20">
        <button
          onClick={() => setActiveTab("threads")}
          className={`flex-1 py-4 text-center font-semibold transition-colors relative ${
            activeTab === "threads"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          Threads
          {activeTab === "threads" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("replies")}
          className={`flex-1 py-4 text-center font-semibold transition-colors relative ${
            activeTab === "replies"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          Replies
          {activeTab === "replies" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />
          )}
        </button>
      </nav>

      {/* Content */}
      <main>
        {activeTab === "threads" && threads.map((thread) => (
          <PostCard key={thread.id} post={thread} />
        ))}
        
        {activeTab === "replies" && replies.map((reply) => (
          <PostCard key={reply.id} post={reply} isReply={true} />
        ))}

        {activeTab === "replies" && replies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No replies yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">When you reply to someone, it'll show up here.</p>
          </div>
        )}
      </main>
    </div>
  );
}