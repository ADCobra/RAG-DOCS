"use client";

import Navbar from "@/components/navbar";
import UserNavbar from "@/components/userNavbar";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

function LearnPage() {
  const { user } = useSelector((state: RootState) => state.user);

  const tutorials = [
    {
      id: 1,
      title: "Getting Started",
      icon: "🚀",
      steps: [
        "Create an account with your email and password",
        "Complete your profile (optional)",
        "You're ready to start uploading documents!",
      ],
    },
    {
      id: 2,
      title: "Uploading Documents",
      icon: "📄",
      steps: [
        "Navigate to the Chat section",
        "Click 'Upload Document' or drag & drop files",
        "Supported formats: PDF, TXT, DOCX, and more",
        "Wait for processing to complete",
        "Your document is now searchable via AI",
      ],
    },
    {
      id: 3,
      title: "Asking Questions",
      icon: "❓",
      steps: [
        "Select a document or chat containing documents",
        "Type your question in the chat input box",
        "Press Enter or click Send",
        "AI will search your documents and provide answers",
        "Questions are based on document content only",
      ],
    },
    {
      id: 4,
      title: "Managing Chats",
      icon: "💬",
      steps: [
        "Create new chats for different document sets",
        "Name your chats for easy organization",
        "Delete old conversations when no longer needed",
        "View chat history in the sidebar",
        "Switch between chats instantly",
      ],
    },
    {
      id: 5,
      title: "Best Practices",
      icon: "⭐",
      steps: [
        "Use clear, specific questions for better results",
        "Upload related documents together in one chat",
        "Break down complex questions into smaller parts",
        "Review AI answers and verify against source",
        "Keep document quality high (clear text, good formatting)",
      ],
    },
  ];

  const features = [
    {
      name: "Multi-Document Search",
      description:
        "Ask questions across multiple documents simultaneously. The AI searches all documents in your chat and provides comprehensive answers.",
      tips: [
        "Upload related documents together",
        "Ask broad questions for overview",
        "Use specific questions for details",
      ],
    },
    {
      name: "Semantic Understanding",
      description:
        "Our AI understands the meaning of your questions, not just keywords. It can find relevant information even with different phrasing.",
      tips: [
        "Natural language questions work best",
        "Don't worry about perfect grammar",
        "Be specific about what you need",
      ],
    },
    {
      name: "Chat History",
      description:
        "All your conversations are saved automatically. Return to previous chats to continue discussions or ask follow-up questions.",
      tips: [
        "Organize chats by topic",
        "Name chats descriptively",
        "Archive old chats to reduce clutter",
      ],
    },
    {
      name: "Document Management",
      description:
        "Easily upload, organize, and manage your documents. Each document is indexed and searchable within seconds.",
      tips: [
        "Use clear file names",
        "Group related documents",
        "Remove duplicates to save space",
      ],
    },
  ];

  const faqs = [
    {
      question: "What file formats are supported?",
      answer:
        "We support PDF, TXT, DOCX, PPT, and other common document formats. File size limit is typically 50MB per document.",
    },
    {
      question: "How long does document processing take?",
      answer:
        "Most documents are processed within seconds to a few minutes depending on size and complexity. You'll be notified when processing is complete.",
    },
    {
      question: "Can I delete a document?",
      answer:
        "Yes, you can delete documents from your chat. However, questions based on deleted documents will no longer provide that content.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes, your data is encrypted and private. Only you can access your documents and chats. See our Privacy Policy for more details.",
    },
    {
      question: "Can I export my chat history?",
      answer:
        "Currently, chats are stored in your account. You can copy text from conversations, and export features may be added in future updates.",
    },
    {
      question: "What if the AI gives incorrect information?",
      answer:
        "Always verify AI responses by reviewing the source documents. The AI bases answers only on document content, so checking the source is important.",
    },
    {
      question: "Can I share documents with others?",
      answer:
        "Currently, documents are private to your account. Team sharing features may be available in future updates.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Use the 'Forgot Password' link on the login page. Check your email for reset instructions. You'll have 24 hours to reset your password.",
    },
  ];

  return (
    <>
      {user ? <UserNavbar /> : <Navbar />}
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Learn How to Use
            </h1>
            <p className="text-xl text-muted-foreground">
              Master RAG Docs with these guides and tutorials
            </p>
          </div>

          {/* Quick Start Tutorials */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Quick Start Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{tutorial.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {tutorial.title}
                  </h3>
                  <ol className="space-y-3">
                    {tutorial.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-muted-foreground"
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3 bg-primary text-primary-foreground rounded-full text-xs font-semibold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          {/* Features Deep Dive */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Feature Guides
            </h2>
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-8"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      💡 Tips:
                    </p>
                    <ul className="space-y-2">
                      {feature.tips.map((tip, tipIdx) => (
                        <li
                          key={tipIdx}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="mr-3">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Pro Tips & Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  🎯 Asking Better Questions
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Be specific about what you&apos;re looking for</li>
                  <li>✓ Use keywords from your documents</li>
                  <li>✓ Ask follow-up questions for clarification</li>
                  <li>✓ Break complex queries into parts</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  📚 Document Organization
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Group related documents in single chats</li>
                  <li>✓ Use descriptive names for easy retrieval</li>
                  <li>✓ Keep documents updated and current</li>
                  <li>✓ Remove duplicates regularly</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ⚡ Productivity Hacks
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Use keyboard shortcuts for faster navigation</li>
                  <li>✓ Pin frequently used chats</li>
                  <li>✓ Create templates for common questions</li>
                  <li>✓ Regular cleanup of old conversations</li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  🔍 Verification & Accuracy
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Always verify AI answers against source</li>
                  <li>✓ Check document quality before uploading</li>
                  <li>✓ Report inaccurate results to improve AI</li>
                  <li>✓ Use multiple documents for confirmation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <summary className="font-semibold text-foreground flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-primary">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Troubleshooting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ❌ Document Not Processing
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check file format is supported</li>
                  <li>• Verify file size is under 50MB</li>
                  <li>• Ensure document is not corrupted</li>
                  <li>• Try re-uploading the document</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ❌ Login Issues
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check email and password are correct</li>
                  <li>• Use &apos;Forgot Password&apos; to reset</li>
                  <li>• Clear browser cache and try again</li>
                  <li>• Ensure browser cookies are enabled</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ❌ Slow Performance
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check internet connection</li>
                  <li>• Close other browser tabs</li>
                  <li>• Refresh the page</li>
                  <li>• Try different browser if issue persists</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  ❌ No Results Found
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rephrase your question</li>
                  <li>• Use simpler language</li>
                  <li>• Check if documents are uploaded</li>
                  <li>• Verify documents contain relevant info</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Help */}
          <section className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Need More Help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Reach out to our
              support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:bondlicensedtokillqueen@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                📧 Email Support
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
              >
                💬 Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LearnPage;
