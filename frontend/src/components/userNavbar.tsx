import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function UserNavbar() {
  return (
    <nav className="bg-blue-50 border-b sticky top-0 left-0 w-full border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex gap-3 items-center w-full">
        <div className="text-lg font-semibold text-gray-800">
          RAG-DOCS
        </div>
        <div className="flex gap-4 items-center ml-6">
          <Link
            href="/"
            className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/learn-more"
            className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/chat">
          <Button size={"sm"}>Explore</Button>
        </Link>
      </div>
    </nav>
  );
}

export default UserNavbar;
