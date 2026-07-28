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
      <main className="bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="h-[calc(100dvh-150px)] max-h-200 min-h-fit w-full max-w-6xl xl:container flex justify-center mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:flex lg:flex-col lg:justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-start leading-tight">
                Multi-Document Intelligence with Memory
              </h1>
              <p className="text-base sm:text-lg lg:text-xl lg:text-start text-center text-gray-600">
                Ask questions across multiple documents with conversational
                memory. Get intelligent answers powered by advanced RAG
                technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {user ? (
                  <Link href="/chat">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-center">
                      Start Chatting
                    </button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-center">
                      Get Started
                    </button>
                  </Link>
                )}
                <Link href="/learn-more">
                  <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 sm:px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto text-center">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Chat Preview */}
            <div className="bg-white rounded-xl max-w-2xl w-full mx-auto shadow-2xl p-4 sm:p-6 space-y-4">
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
