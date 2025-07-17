"use client";

import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Terms of Service – PingIt</h1>
      <p className="text-sm mb-6">Last Updated: July 16, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Anonymous Usage</h2>
        <p>
          PingIt allows users to chat anonymously. No personal information like
          name, phone number, or email is required or collected.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. No Data Storage</h2>
        <p>
          We do not use any database. All messages are real-time and temporary.
          No chat logs, metadata, or user information is saved or tracked.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibility</h2>
        <p>
          Users are responsible for their own behavior. PingIt is not liable
          for any emotional, mental, or legal consequences resulting from
          conversations on the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. No Guarantee of Service</h2>
        <p>
          PingIt is a free tool and may experience downtime or unexpected
          behavior. We do not guarantee connection or availability.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Reporting Misuse</h2>
        <p>
          Since chats are not stored, we cannot recover any conversation or
          take action against users. If you feel unsafe, disconnect
          immediately and contact local authorities if needed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Changes to These Terms</h2>
        <p>
          These terms may be updated without notice. By continuing to use
          PingIt, you agree to the latest version of the terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
        <p>
          For general queries, you may contact us through the website. We do
          not handle chat-specific or legal issues.
        </p>
      </section>

      <p className="mt-6 font-medium">
        By using PingIt, you confirm that you understand and agree to all the
        above terms.
      </p>
    </div>
  );
}