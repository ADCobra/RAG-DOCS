"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Ellipsis, Home, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  changeChatNameHandler,
  clearChatState,
  deleteChatHandler,
  fetchAllChatsHandler,
  fetchChatByIdHandler,
} from "@/store/slices/chatSlice";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { chat } from "@/store/types/chatTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

function ChatSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const [dialogChat, setDialogChat] = useState<chat | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [nameChange, setNameChange] = useState(false);
  const [chatName, setChatName] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useSelector((state: RootState) => state.chat);

  const deleteChatDialog = (chat: chat) => {
    setDialogChat(chat);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteChat = () => {
    if (dialogChat) {
      dispatch(deleteChatHandler(dialogChat._id));
      setDeleteDialogOpen(false);
      setDialogChat(null);
    }
  };

  const nameChangeHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatName.trim() || !dialogChat) {
      toast.error("Chat name cannot be empty.");
      setDialogChat(null);
      setNameChange(false);
      return;
    }

    if (chatName === dialogChat.title) {
      toast.error("New chat name must be different from the current name.");
      setDialogChat(null);
      setNameChange(false);
      return;
    }

    dispatch(
      changeChatNameHandler({ chatId: dialogChat._id, newName: chatName })
    );
    setDialogChat(null);
    setNameChange(false);
    setChatName("");
  };

  useEffect(() => {
    dispatch(fetchAllChatsHandler());
  }, [dispatch]);

  return (
    <aside
      className={`flex flex-col md:static z-10 fixed top-0 left-0 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-r border-slate-700 transition-all duration-300 ${
        open ? "w-64" : "xs:w-16 w-12"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between xs:p-4 p-1 border-b border-slate-700">
        <div
          className={`flex items-center gap-2 ${
            !open && "justify-center w-full"
          }`}
        >
          {open && <span className="text-lg font-bold">💬 Chat</span>}
        </div>
        <div className="flex gap-2 items-center">
          {open && (
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full p-2 justify-center text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={onToggle}
            className="p-2 justify-center text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* New Chat Button */}
      {open && (
        <div className="p-4 pb-3">
          <Button
            onClick={() => dispatch(clearChatState()) && onToggle()}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all rounded-lg py-2 font-semibold shadow-lg text-sm"
          >
            ✨ New Chat
          </Button>
        </div>
      )}

      {/* Chat History */}
      {open && (
        <nav
          className="flex-1 overflow-y-auto px-3 py-4 space-y-5"
          style={{
            scrollbarColor: "#3B82F6 #3341554D",
            scrollbarWidth: "thin",
          }}
        >
          <div>
            {/* <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">
                {section.title}
              </h3> */}
            <ul className="space-y-1.5">
              {chats.map((chat) => (
                <li
                  key={chat._id}
                  onClick={() => {
                    dispatch(fetchChatByIdHandler(chat._id));
                    onToggle();
                  }}
                >
                  <div className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 truncate group relative">
                    <div className="group-hover:pr-4 flex-1 truncate cursor-pointer">
                      {chat.title}
                    </div>
                    <div
                      className="absolute right-2 opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full"
                          >
                            <Ellipsis className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel
                              onClick={() => {
                                setNameChange(true);
                                setDialogChat(chat);
                                setChatName(chat.title);
                              }}
                              className="text-xs"
                            >
                              Change Name
                            </DropdownMenuLabel>
                            <DropdownMenuLabel
                              onClick={() => deleteChatDialog(chat)}
                              className="text-xs"
                            >
                              Delete Chat
                            </DropdownMenuLabel>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </li>
              ))}
              {chats.length === 0 && (
                <li>
                  <p className="text-xs text-slate-400 italic px-2">
                    No chats available. Start a new chat!
                  </p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}

      {deleteDialogOpen && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {`This action cannot be undone. This will permanently delete the chat "${dialogChat?.title}" and remove its data from our servers.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteChat}>
                Delete Chat
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {nameChange && (
        <Dialog open={nameChange} onOpenChange={setNameChange}>
          <DialogContent className="sm:max-w-md bg-slate-800 border border-slate-700">
            <form onSubmit={nameChangeHandler}>
              <DialogHeader>
                <DialogTitle className="text-white">Rename Chat</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Enter a new name for your chat. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="chat-name" className="text-slate-300">
                    Chat Name
                  </Label>
                  <Input
                    id="chat-name"
                    name="chatName"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    placeholder="Enter new chat name"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-400 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <div
        className={`border-t border-slate-700 ${
          open ? "p-4 space-y-2" : "p-3 space-y-3"
        }`}
      >
        {open ? (
          <>
            <Button
              variant="ghost"
              className="w-full justify-start text-xs text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="w-full p-2 justify-center text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full p-2 justify-center text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;
