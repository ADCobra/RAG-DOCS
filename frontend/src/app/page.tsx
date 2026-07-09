"use client";

import Navbar from "@/components/navbar";
import UserNavbar from "@/components/userNavbar";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {user ? <UserNavbar /> : <Navbar />}
      <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                RAG-DOCS Intelligence with Memory
              </h1>
              <p className="text-xl text-gray-600">
                Ask questions across multiple documents with conversational
                memory. Get intelligent answers powered by advanced RAG
                technology.
              </p>
              <div className="flex gap-4">
                {user ? (
                  <Link href="/chat">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                      Start Chatting
                    </button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                      Get Started
                    </button>
                  </Link>
                )}
                <Link href="/learn-more">
                  <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold transition">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Chat Preview */}
            <div className="bg-white rounded-xl shadow-2xl p-6 space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                <p className="text-gray-800 text-sm">
                  What insights can you find across these documents?
                </p>
              </div>
              <div className="bg-indigo-600 text-white rounded-lg p-4 max-w-xs ml-auto">
                <p className="text-sm">
                  I can analyze patterns, extract information, and answer
                  questions while remembering our conversation history.
                </p>
              </div>
              <div className="text-gray-500 text-xs text-center">
                💬 Conversation Memory Enabled
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
