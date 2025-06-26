"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // adjust path if needed
import ContactList from "../components/sidebar/ContactList";
import Logout from "../components/Logout";
import UserInfo from "../components/common/UserInfo";
import ThemeToggle from "../components/common/ThemeToggle";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="flex h-screen relative">
      {/* Hamburger for mobile */}
      {!mobileOpen && (
        <button
          className="absolute top-4 right-4 z-50 md:hidden bg-white p-2 rounded-full shadow"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6 text-[#2A2A72]" />
        </button>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-[300px] bg-primary bg-white text-white p-4 hidden md:block">
        <div className="flex justify-between">
          <ThemeToggle />
          <Logout />
        </div>
        <div className="flex flex-col justify-between h-[95%]">
          <ContactList />
          <UserInfo />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-primary p-4 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  className="text-white self-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <ThemeToggle />
              </div>
              <ContactList />
            </div>
            <div className="flex justify-between gap-[7px]">
              <UserInfo />
              <Logout />
            </div>
          </div>
        </div>
      )}

      {/* Chat content */}
      <section className="flex-1 p-4 flex flex-col overflow-y-auto chat-doodle-bg">
        {children}
      </section>
    </main>
  );
}
