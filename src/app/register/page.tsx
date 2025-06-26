"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useRegister } from "./hooks/useRegister";

export default function Register() {
  const {
    state,
    formAction,
    isPending,
    showPassword,
    handlePasswordVisibility,
    handleSetAvatar,
    handleSetAvatarStyle,
    avatarStyleArr,
    avatarUrl,
  } = useRegister();

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left: Logo and Slogan */}
      <div className="bg-primary dark:bg-[#12132e] text-white flex flex-col items-center justify-center p-8">
        <Image src="/samvada_logo.png" alt="Logo" width={120} height={120} />
        <h1 className="text-4xl font-bold mt-6">Join संवाद Today</h1>
        <p className="mt-4 text-lg opacity-80 text-center max-w-md">
          Connect. Converse. Collaborate. Be part of the next-gen chat
          experience.
        </p>
      </div>

      {/* Right: Register Form */}
      <div className="flex flex-col items-center justify-center px-8 py-12 relative bg-white dark:bg-[#181818] transition-colors">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Create your account
          </h2>
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
              />
              <span className="flex mt-1 items-center ">
                {showPassword ? (
                  <Eye
                    className="text-white "
                    onClick={handlePasswordVisibility}
                  />
                ) : (
                  <EyeClosed
                    className="text-white "
                    onClick={handlePasswordVisibility}
                  />
                )}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name your Avatar to see magic
              </label>
              <input
                onChange={handleSetAvatar}
                type="text"
                id="avatar"
                name="avatar"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
                placeholder="Create your custom avatar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

            {/* <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:border-gray-600 dark:text-white"
              />
            </div> */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
            >
              {isPending ? (
                <span className="flex justify-center">
                  <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          {state?.error && (
            <p className="text-sm text-red-500 mt-4 text-center">
              {state.error}
            </p>
          )}
          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
