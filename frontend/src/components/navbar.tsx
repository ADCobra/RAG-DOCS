import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-50 border-b sticky top-0 left-0 w-full border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="w-full max-w-6xl xl:container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20 flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">
          RAG Docs
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
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
        <div className="flex items-center gap-2 ml-4">
          <Link href="/register" className="md:block hidden">
            <Button size="sm">Register</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <div className="gap-3 flex">
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
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
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="w-full"
                      >
                        <Button size="sm" className="w-full">
                          Register
                        </Button>
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

export default Navbar;
