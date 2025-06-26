import { useActionState, useState } from "react";
import { registerUser } from "../action";

const initialState = { error: null };

export function useRegister() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState<string>("");
  const avatarStyleArr = [
    { value: "adventurer", label: "Adventurer" },
    { value: "adventurer-neutral", label: "Adventurer Neutral" },
    { value: "big-smile", label: "Big Smile" },
    { value: "croodles", label: "Croodles" },
    { value: "open-peeps", label: "Open Peeps" },
    { value: "thumbs", label: "Thumbs" },
  ];
  const [avatarStyle, setAvatarStyle] = useState<string>(
    avatarStyleArr[0]?.value
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(
    `https://api.dicebear.com/9.x/${avatarStyle}/png?seed=${avatarSeed}`
  );

  console.log(avatarStyle);

  const handleSetAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeed = e.target.value.trim();
    setAvatarSeed(newSeed);
    setAvatarUrl(
      `https://api.dicebear.com/9.x/${avatarStyle}/png?seed=${newSeed}`
    );
  };

  // Update avatar when style changes
  const handleSetAvatarStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.target.value;
    setAvatarStyle(newStyle);
    setAvatarUrl(
      `https://api.dicebear.com/9.x/${newStyle}/png?seed=${avatarSeed}`
    );
  };

  const handlePasswordVisibility = () => {
    setShowPassword((pass) => !pass);
  };

  return {
    state,
    formAction,
    isPending,
    showPassword,
    handlePasswordVisibility,
    handleSetAvatar,
    handleSetAvatarStyle,
    avatarStyleArr,
    avatarUrl,
  };
}
