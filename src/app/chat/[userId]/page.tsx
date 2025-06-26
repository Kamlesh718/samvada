import { LoaderCircle } from "lucide-react";
import React, { Suspense } from "react";
import ChatPanel from "../../components/sidebar/ChatPanel";

export default function Chat({ params }: { params: { userId: string } }) {
  const { userId } = params;
  if (!userId || typeof userId !== "string") return null;

  const Loader = () => {
    return (
      <div className="h-dvh flex justify-center items-center">
        <LoaderCircle className="animate-spin h-10 w-10" />
      </div>
    );
  };
  return (
    <Suspense fallback={<Loader />}>
      <ChatPanel userId={userId} />
    </Suspense>
  );
}
