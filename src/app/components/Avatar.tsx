import Image from "next/image";
import { useState } from "react";

export default function Avatar() {
  const [avatar, setAvatar] = useState<string>("");
  const [avatarStyle, setAvatarStyle] = useState("");

  const handleSetAvatar = (e) => {
    const avatarSeed = e.target.value;
    setAvatar(avatarSeed.trim());
  };

  const handleAvatarStyle = (e) => {};
  return (
    <div>
      <input
        onC
        type="text"
        id="avatar"
        name="avatar"
        required
        className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
        placeholder="Create your custom avatar"
      />
      <Image src="/avatar.png" width={8} height={8} alt="avatar" />
    </div>
  );
}
