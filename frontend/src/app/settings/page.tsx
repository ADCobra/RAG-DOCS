"use client";

import AuthProvider from "@/components/authProvider";
import { Button } from "@/components/ui/button";
import UserNavbar from "@/components/userNavbar";
import { deleteAllChatHandler } from "@/store/slices/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message, chats } = useSelector(
    (state: RootState) => state.chat,
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, message, error]);

  return (
    <AuthProvider>
      <UserNavbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences here.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="">Actions</h3>
          <Button
            variant="destructive"
            className="mt-4"
            disabled={loading || chats.length === 0}
            onClick={() => dispatch(deleteAllChatHandler())}
          >
            Delete All Chats
          </Button>
        </div>
      </div>
    </AuthProvider>
  );
}

export default Page;
