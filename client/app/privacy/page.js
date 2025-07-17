"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy – PingIt</h1>
      <p className="text-sm mb-6">Last Updated: July 16, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. No Personal Data Collection</h2>
        <p>
          PingIt does not collect, store, or request any personal information.
          You can use our service without providing your name, email, phone number,
          or any identifiable data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Anonymous Communication</h2>
        <p>
          All chats on PingIt are anonymous and temporary. We do not log chat
          messages or record session details. As soon as the chat ends, all
          data is cleared from memory.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. No Cookies or Trackers</h2>
        <p>
          PingIt does not use cookies, local storage, or any third-party analytics
          or advertising tools that track your behavior across sessions or websites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Security Disclaimer</h2>
        <p>
          While we aim to provide a safe and private platform, 100% security cannot
          be guaranteed. We recommend not sharing any sensitive information
          during chats.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Children’s Privacy</h2>
        <p>
          PingIt is not designed for children under the age of 13. We do not knowingly
          collect any data from minors.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Data Sharing</h2>
        <p>
          Since we don’t collect or store any user data, there is nothing to share,
          sell, or leak. We do not partner with advertisers or third-party services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Policy Updates</h2>
        <p>
          We may revise this policy from time to time. Any changes will be reflected
          on this page. Continued use of PingIt means you accept the updated policy.
        </p>
      </section>

      <p className="mt-6 font-medium">
        By using PingIt, you agree to this privacy policy and understand that no
        data is collected or stored.
      </p>
    </div>
  );
}