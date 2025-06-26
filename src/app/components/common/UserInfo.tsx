import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserInfo = {
  fullName: string;
  email: string;
  avatar?: string;
};

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const fetchCurrentUserInfo = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    const user = data.user;
    setUserInfo({
      fullName: user.name,
      email: user.email,
      avatar: user.avatarUrl,
    });
  };

  useEffect(() => {
    fetchCurrentUserInfo();
  }, []);

  return (
    <Link className="flex items-center gap-2" href="/chat/profile">
      {userInfo?.avatar && (
        <Image
          src={userInfo?.avatar}
          alt={`Avatar of ${userInfo.fullName}`}
          className="w-8 h-8 md:w-12 md:h-12  rounded-full"
          width={8}
          height={8}
        />
      )}
      <div>
        <span className="text-white">{userInfo?.fullName}</span>
        <p className="text-sm text-gray-300">{userInfo.email}</p>
      </div>
    </Link>
  );
}
