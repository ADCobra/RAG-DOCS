"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageT } from "@/store/types/chatTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Input } from "../ui/input";
import Loader from "../loader";
import { toast } from "sonner";
import axios from "@/store/axios";
import { addMessageToChat } from "@/store/slices/chatSlice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";

function ChatView() {
  const [input, setInput] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { chat, chatMessages } = useSelector((state: RootState) => state.chat);

  const handleSend = async () => {
    if (!chat) return;

    if (!input.trim()) return;

    const userMessage: messageT = {
      _id: Date.now().toString(),
      content: input,
      role: "user" as const,
      chatId: chat?._id || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addMessageToChat(userMessage));
    setMessageLoading(true);
    try {
      const { data } = await axios.post("/message/ask", {
        chatId: chat._id,
        question: input,
      });
      dispatch(addMessageToChat(data.aiMessage));
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again.");
    }
    setMessageLoading(false);
    setInput("");
  };

  if (!chat) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col relative h-screen w-full bg-linear-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900 border-b dark:border-neutral-800">
      {/* Documents Section */}
      {chat.documents && chat.documents.length > 0 && (
        <div className="border-b dark:border-neutral-800 px-4 py-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-wrap gap-1.5">
            {chat.documents.map((doc) => (
              <span
                key={doc._id}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50"
              >
                {doc.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea
        className="flex-1 overflow-hidden"
        ref={(node) => {
          if (node) {
            const scrollElement = node.querySelector(
              "[data-radix-scroll-area-viewport]"
            );
            if (scrollElement) {
              scrollElement.scrollTop = scrollElement.scrollHeight;
            }
          }
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          {chatMessages && chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-96 space-y-6">
              <div className="text-6xl animate-bounce">💬</div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Start a Conversation
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm">
                  Send your first message to begin chatting with the AI
                  assistant powered by your documents.
                </p>
              </div>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2`}
              >
                <Card
                  className={`max-w-[80%] lg:max-w-[70%] px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-linear-to-r from-blue-600 to-blue-700 shadow-sm text-white rounded-br-sm"
                      : "bg-transparent"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p
                            className="text-sm leading-relaxed mb-2 last:mb-0"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-outside ml-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-outside ml-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-sm" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="block bg-gray-900 dark:bg-black text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-3 border-gray-400 dark:border-neutral-500 pl-3 italic text-sm mb-2 opacity-75"
                            {...props}
                          />
                        ),
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-base font-bold mb-2 mt-3"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-sm font-bold mb-2 mt-2"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-xs font-bold mb-1 mt-1"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </Card>
              </div>
            ))
          )}
          {messageLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
              <Card className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-bl-sm border border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span
                      className="inline-block w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <span
                      className="inline-block w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="inline-block w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Section */}
      <div className="shrink-0 border-t dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md p-4 space-y-3">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-2xl border-gray-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="max-w-4xl mx-auto text-xs text-gray-500 dark:text-gray-500 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg p-2 border border-amber-100 dark:border-amber-800/20 min-h-fit">
          <p className="flex items-center gap-1.5">
            <span className="text-sm shrink-0">⚠️</span>
            <span className="line-clamp-1">
              AI may generate incorrect information. Verify critical details.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
