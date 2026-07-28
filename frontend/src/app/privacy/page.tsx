"use client";

import Navbar from "@/components/navbar";
import UserNavbar from "@/components/userNavbar";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

function PrivacyPolicy() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      {user ? <UserNavbar /> : <Navbar />}
      <div className="min-h-screen bg-background py-12 px-2 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-3 md:p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 5, 2026
          </p>

          <div className="space-y-8 text-foreground">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to RAG Docs
                (&quot;Service&quot;). We are committed to protecting your
                privacy and ensuring you have a positive experience on our
                platform. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree
                with our policies and practices, please do not use our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                2.1 Account Information
              </h3>
              <p className="mb-4">When you create an account, we collect:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>Email address</li>
                <li>Password (encrypted)</li>
                <li>Username or display name</li>
                <li>Profile information (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                2.2 Document and Chat Data
              </h3>
              <p className="mb-4">
                When you use our Service, we collect and store:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>Documents you upload</li>
                <li>Questions you ask about your documents</li>
                <li>Chat conversation history</li>
                <li>
                  Metadata associated with your documents (file names, upload
                  dates, size)
                </li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing and improving the Service</li>
                <li>User authentication and account management</li>
                <li>
                  Processing documents and generating AI-powered responses
                </li>
                <li>Maintaining chat history and user preferences</li>
                <li>
                  Communicating with you about your account and Service updates
                </li>
                <li>Analyzing usage patterns to improve Service quality</li>
                <li>Detecting and preventing fraud or security issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Data Storage and Security
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                4.1 Storage Location
              </h3>
              <p className="mb-4">
                Your data is stored in secure databases including MongoDB and
                Pinecone vector databases. Document embeddings are processed and
                stored to enable semantic search functionality.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                4.2 Security Measures
              </h3>
              <p className="mb-4">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Password hashing and encryption at rest</li>
                <li>Access controls and authentication tokens</li>
                <li>Regular security audits and updates</li>
                <li>Firewalls and intrusion detection systems</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                4.3 Data Retention
              </h3>
              <p>
                We retain your data for as long as your account is active. Upon
                account deletion, personal data will be removed within 30 days,
                though aggregated and anonymized data may be retained for
                analytics purposes.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Third-Party Services
              </h2>
              <p className="mb-4">
                Our Service utilizes the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>
                  <strong>Pinecone:</strong> Vector database for document
                  embeddings and semantic search
                </li>
                <li>
                  <strong>MongoDB:</strong> Database for storing user accounts,
                  chats, and messages
                </li>
                <li>
                  <strong>LangChain:</strong> Framework for document processing
                  and LLM integration
                </li>
              </ul>
              <p>
                These third-party providers have their own privacy policies. We
                encourage you to review their privacy practices. We are not
                responsible for their data handling practices.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Your Rights and Choices
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                6.1 Access and Portability
              </h3>
              <p className="mb-4">
                You have the right to access your personal data and request a
                copy of the information we hold about you.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">
                6.2 Correction and Deletion
              </h3>
              <p className="mb-4">
                You may update or delete your account information at any time
                through your account settings. You can also request complete
                deletion of your account and associated data.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">6.3 Opt-Out</h3>
              <p>
                You can opt-out of non-essential communications through your
                account preferences.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your
                experience. Cookies help us:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>Remember your login information</li>
                <li>Understand how you use the Service</li>
                <li>Improve Service functionality</li>
                <li>Personalize your experience</li>
              </ul>
              <p>
                You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Data Sharing and Disclosure
              </h2>
              <p className="mb-4">
                We do not sell or rent your personal information. We may share
                data:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>
                  With third-party service providers who assist in operating the
                  Service
                </li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>
                  In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our Service is not intended for users under 13 years of age. We
                do not knowingly collect personal information from children. If
                we learn we have collected data from a child, we will take steps
                to delete such information immediately.
              </p>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our practices or applicable laws. We will notify you
                of material changes by posting the updated policy on our website
                and updating the &ldquo;Last updated&quot; date. Your continued
                use of the Service after changes become effective constitutes
                your acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="mb-2">
                  <strong>Email:</strong> bondlicensedtokillqueen@gmail.com
                </p>
                <p>
                  <strong>Note:</strong> This is a learning and trial project.
                  For questions or feedback, please reach out via email.
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                By using our Service, you acknowledge that you have read,
                understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
