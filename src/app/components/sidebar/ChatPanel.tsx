"use client";

import Image from "next/image";
import MessageBubble from "../chat/MessageBubble";
import MessageInput from "../chat/MessageInput";
import { formatDateLabel } from "@/utils/dateLabel";
import DateLabel from "../chat/DateLabel";
import { useChat } from "@/app/chat/hooks/useChat";
import ErrorMessage from "../common/ErrorMessage";
import { LoaderCircle } from "lucide-react";

type Props = {
  userId: string;
};

export default function ChatPanel({ userId }: Props) {
  const { messages, user, userStatuses, sendMessage, isReady, error, loading } =
    useChat(userId);
  let lastDateLabel = "";
  // const { status } = userStatus;
  const isOnline = userStatuses[userId];

  if (error?.error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full px-4">
          <ErrorMessage error={error.error} />
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <LoaderCircle className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-[99dvh] overflow-hidden">
        <header className="flex items-center gap-4 mb-4 ">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Image
              src={user?.avatarUrl || "/avatar.png"}
              className="border-2 border-gray-300 rounded-full"
              width={40}
              height={40}
              alt={user?.name || "User Avatar"}
            />
          )}
          <div>
            <h2 className="font-semibold dark:text-gray-400  text-lg">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {isOnline ? "Online 🟢" : "Offline 🔴"}
            </p>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
          {messages.map((msg) => {
            const label = formatDateLabel(msg.createdAt);

            const showLabel = label !== lastDateLabel;
            lastDateLabel = label;

            return (
              <div key={msg._id}>
                {showLabel && <DateLabel label={label} />}
                <MessageBubble
                  type={msg.type}
                  text={msg.text}
                  time={new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              </div>
            );
          })}
        </div>
        <div className="p-4">
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </>
  );
}
