"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function EmptyChat() {
  const { chat } = useSelector((state: RootState) => state.chat);

  if (!chat) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96 space-y-6">
      <div className="text-6xl animate-bounce">💬</div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Start a Conversation
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm">
          Send your first message to begin chatting with the AI assistant
          powered by your documents.
        </p>
      </div>
    </div>
  );
}

export default EmptyChat;
