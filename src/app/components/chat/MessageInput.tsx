import { Send } from "lucide-react";
import { useRef, useState } from "react";

export default function MessageInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [value, setValue] = useState("");
  const enterKeyRef = useRef(null);

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 border-[#9595b9]  border-t pt-2">
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded-full px-4 py-2 border border-[#9595b9] bg-white shadow-sm"
        ref={enterKeyRef}
        onKeyDown={handleKeyDown}
      />

      <button
        className="bg-[#2A2A72] text-white rounded-full px-3 py-3"
        onClick={handleSend}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
