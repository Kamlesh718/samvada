import { getSocket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";

type Message = {
  _id: string;
  text: string;
  createdAt?: Date;
  type: "sent" | "received";
  senderId: string;
  receiverId: string;
};

type Error = {
  error: string;
};

type User = {
  name: string;
  avatarUrl: string;
};

export function useChat(userId: string) {
  const [user, setUser] = useState<User>({} as User);
  const [currentUserId, setCurrentUserId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({} as Error);
  const [userStatuses, setUserStatuses] = useState<
    Record<string, "online" | "offline">
  >({});
  const generateTempId = () =>
    `temp-${Math.random().toString(36).substring(2, 15)}`;

  const socketRef = useRef(getSocket());
  const [isReady, setIsReady] = useState(false);

  const fetchIndividualContacts = async () => {
    const res = await fetch(`/api/contacts/${userId}`);
    const user = await res.json();
    if (user?.error) setError(user);
    setUser(user);
  };

  const fetchToken = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    const { userId } = data.user;
    setCurrentUserId(userId);
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${userId}`);
      const data = await res.json();

      const formatted = data.map((msg: Message) => ({
        ...msg,
        type: msg.senderId === currentUserId ? "sent" : "received",
      }));
      if (data?.error) setError(data.error);

      setMessages(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("recentContacts") || "[]");
    const updated = [userId, ...visited.filter((cid) => cid !== userId)].slice(
      0,
      20
    );
    localStorage.setItem("recentContacts", JSON.stringify(updated));
  }, [userId]);

  useEffect(() => {
    if (!userId || !currentUserId) return;
    fetchMessages();
  }, [userId, currentUserId]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchIndividualContacts();
      await fetchToken(); // this sets currentUserId
    };
    init();
  }, [userId]);

  useEffect(() => {
    if (!userId || !currentUserId) return;
    const socket = socketRef.current;
    const room = [currentUserId, userId].sort().join("_");
    socket.emit("join_room", room);

    socket.on("receive_message", (msg: Message) => {
      if (msg.senderId === currentUserId) return; // 🔒 Ignore self
      setMessages((prev) => [...prev, { ...msg, type: "received" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUserId, userId]);

  useEffect(() => {
    if (!currentUserId) return;
    const socket = socketRef.current;

    socket.emit("user_online", currentUserId);

    socket.on("initial_user_statuses", (statuses) => {
      const parsed = Object.keys(statuses).reduce((acc, id) => {
        acc[id] = "online";
        return acc;
      }, {} as Record<string, "online">);

      setUserStatuses(parsed);
    });

    socket.on("update_user_status", ({ userId: updatedUserId, status }) => {
      console.log("🔄 Incoming status update:", updatedUserId, status);
      console.log("Before update:", userStatuses);

      if (updatedUserId) {
        setUserStatuses((prev) => {
          const updated = { ...prev, [updatedUserId]: status };
          console.log("After update:", updated);
          return updated;
        });
      }
    });

    return () => {
      socket.off("initial_user_statuses");
      socket.off("update_user_status");
    };
  }, [currentUserId]);

  const sendMessage = (text: string) => {
    const msg = {
      text,
      senderId: currentUserId,
      receiverId: userId,
      createdAt: new Date(),
    };

    // Show your message immediately as 'sent'
    setMessages((prev) => [
      ...prev,
      { ...msg, type: "sent", _id: generateTempId() },
    ]);

    // Send to socket server
    if (currentUserId && userId && text) {
      socketRef.current.emit("send_message", msg);
    }
  };

  return {
    user,
    userStatuses,
    messages,
    sendMessage,
    loading,
    isReady,
    error,
    currentUserId,
  };
}
