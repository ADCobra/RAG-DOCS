"use client";

import AuthProvider from "@/components/authProvider";
import UserNavbar from "@/components/userNavbar";
import React from "react";

function Page() {
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
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Delete All Chats</li>
          </ul>
        </div>
      </div>
    </AuthProvider>
  );
}

export default Page;
