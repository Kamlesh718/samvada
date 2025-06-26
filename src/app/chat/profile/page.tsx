"use client";

import { useRegister } from "@/app/register/hooks/useRegister";
import Image from "next/image";
import React, { useActionState, useEffect } from "react";
import { updateProfile } from "./action";
import { LoaderCircle } from "lucide-react";

const initialState = { error: null };
export default function Profile() {
  const { handleSetAvatar, handleSetAvatarStyle, avatarStyleArr, avatarUrl } =
    useRegister();

  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col h-dvh justify-center">
      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-400 "
        >
          Firstname
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-400"
        >
          Lastname
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">
          Name your Avatar to see magic
        </label>
        <input
          onChange={handleSetAvatar}
          type="text"
          id="avatar"
          name="avatar"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
          placeholder="Create your custom avatar"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">
          Choose Avatar Style
        </label>
        <select
          onChange={handleSetAvatarStyle}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
        >
          {avatarStyleArr.map(({ value, label }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-2 flex-col items-center justify-center">
        <label className="block text-sm font-medium text-gray-400">
          Your Avatar
        </label>
        <Image
          src={avatarUrl || "/avatar.png"}
          width={56}
          height={56}
          alt="avatar"
        />
      </div>
      <div>
        <input
          value={avatarUrl}
          readOnly
          type="text"
          id="avatarurl"
          name="avatarurl"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
          placeholder="Create your custom avatar"
          hidden
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
      >
        {isPending ? (
          <span className="flex justify-center">
            <LoaderCircle className="animate-spin" />
          </span>
        ) : (
          "Update Profile"
        )}
      </button>
    </form>
  );
}
