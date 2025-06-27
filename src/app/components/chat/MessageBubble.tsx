type Props = {
  type: "sent" | "received";
  text: string;
  time: string;
};

export default function MessageBubble({ type, text, time }: Props) {
  const isSent = type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-xl p-3 max-w-xs ${
          isSent ? "bg-white text-black" : "bg-green-100 text-black"
        }`}
      >
        <p className="max-w-xs break-words">{text}</p>
        <p className="text-xs text-gray-500 text-right mt-1">{time}</p>
      </div>
    </div>
  );
}
