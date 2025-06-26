import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-md p-2 hover:bg-gray-800 transition"
      aria-label="Logout"
    >
      <LogOutIcon />
    </button>
  );
}
