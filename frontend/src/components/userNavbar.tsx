"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

function UserNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-blue-50 border-b sticky top-0 left-0 w-full border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="container mx-auto lg:px-20 flex items-center justify-between">
        <div className="flex gap-3 items-center flex-1">
          <div className="text-lg font-semibold text-gray-800">
            RAG Docs
          </div>
          <div className="hidden md:flex gap-4 items-center ml-6">
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
          <Link href="/chat" className="hidden md:block">
            <Button size={"sm"}>Explore</Button>
          </Link>
          <div className="md:hidden flex">
            <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link href="/" onClick={() => setOpen(false)}>
                      Home
                    </Link>
                    <Link href="/learn-more" onClick={() => setOpen(false)}>
                      Learn More
                    </Link>
                    <Link href="/privacy" onClick={() => setOpen(false)}>
                      Privacy Policy
                    </Link>
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Link href="/chat" className="hidden md:block">
                        <Button size={"sm"}>Explore</Button>
                      </Link>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
