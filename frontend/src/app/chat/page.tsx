"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "@/components/chat/chatSidebar";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearChatError, clearChatSuccess } from "@/store/slices/chatSlice";
import ChatView from "@/components/chat/chatView";
import NewChat from "@/components/chat/newChat";
import Loader from "@/components/loader";

function Page() {
  const [slidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );

  const dispatch = useDispatch<AppDispatch>();
  const { chat, error, chatCreated, message } = useSelector(
    (state: RootState) => state.chat
  );
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearChatError());
      return;
    }
    if (chatCreated && message) {
      toast.success(message);
      dispatch(clearChatSuccess());
      return;
    }
  }, [error, chatCreated, message, dispatch]);

  if (!user || loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex h-screen w-full bg-white md:ml-0 ml-16 dark:bg-neutral-950">
        <ChatSidebar
          open={slidebarOpen}
          onToggle={() => setSidebarOpen(!slidebarOpen)}
        />
        {chat ? <ChatView /> : <NewChat />}
      </div>
    </>
  );
}

export default Page;
