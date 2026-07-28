"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, FileText, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createChatHandler } from "@/store/slices/chatSlice";
import Loader from "../loader";

function NewChat() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.chat);

  const uploadPdfFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      if (selectedFiles.length > 2) {
        toast.error("You can upload a maximum of 2 files at a time.");
        return;
      }
      setFiles([...Array.from(selectedFiles), ...(files ?? [])].slice(0, 2));
    }
  };

  const uploadDocxFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      if (selectedFiles.length > 2) {
        toast.error("You can upload a maximum of 2 files at a time.");
        return;
      }
      setFiles([...Array.from(selectedFiles), ...(files ?? [])].slice(0, 2));
    }
  };

  const uploadTextFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      if (selectedFiles.length > 2) {
        toast.error("You can upload a maximum of 2 files at a time.");
        return;
      }
      setFiles([...Array.from(selectedFiles), ...(files ?? [])].slice(0, 2));
    }
  };

  const newChatHandler = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one document to start a chat.");
      return;
    }

    if (files.length > 2) {
      toast.error("You can upload a maximum of 2 files to start a chat.");
      return;
    }

    const formdata = new FormData();
    files.forEach((file) => {
      formdata.append("documents", file);
    });
    formdata.append("title", files[0].name);

    dispatch(createChatHandler(formdata));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border-b flex-1 flex flex-col justify-between h-screen dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2 sm:p-4">
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Start a New Conversation
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Upload documents to get started with your AI assistant
            </p>
          </div>

          {files && files.length > 0 && (
            <div className="w-full space-y-2 sm:space-y-3">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Files ({files.length}/2)
              </p>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 group"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      onClick={() => {
                        const newFiles = files.filter((_, i) => i !== index);
                        setFiles(newFiles);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-2">
            {files && files.length < 2 && (
              <DropdownMenu
                open={uploadDropdownOpen}
                onOpenChange={setUploadDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    className="gap-2 flex-1 rounded-lg sm:rounded-xl bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Upload Documents
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="rounded-lg sm:rounded-xl"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Select File Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        document.getElementById("pdf-upload")?.click()
                      }
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Upload PDFs
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        document.getElementById("txt-upload")?.click()
                      }
                    >
                      <File className="w-4 h-4 mr-2" />
                      Upload Text Files
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        document.getElementById("docx-upload")?.click()
                      }
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Upload DOCX Files
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {files.length > 0 && (
              <Button
                onClick={newChatHandler}
                size={"lg"}
                className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition-all rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Start Chat
              </Button>
            )}
          </div>

          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={uploadPdfFiles}
            id="pdf-upload"
            className="hidden"
          />
          <input
            type="file"
            accept=".txt"
            multiple
            onChange={uploadTextFiles}
            id="txt-upload"
            className="hidden"
          />
          <input
            type="file"
            accept=".docx"
            multiple
            onChange={uploadDocxFiles}
            id="docx-upload"
            className="hidden"
          />
        </div>
      </div>

      <div className="border-t dark:border-neutral-800 bg-white dark:bg-neutral-950 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
        <div className="max-w-4xl mx-auto text-sm text-gray-500 dark:text-gray-500 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg p-2 border border-amber-100 dark:border-amber-800/20 min-h-fit">
          <p className="flex items-center gap-1.5">
            <span className="text-base shrink-0">⚠️</span>
            <span className="line-clamp-1">
              AI may generate incorrect information. Verify critical details.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewChat;
