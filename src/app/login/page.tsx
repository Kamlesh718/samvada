"use client";

import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const {
    state,
    formAction,
    isPending,
    showPassword,
    handlePasswordVisibility,
  } = useLogin();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            color: "#2a2a72",
            background: "#fff",
          },
        }}
      />
      <main className={"min-h-screen grid md:grid-cols-2"}>
        {/* Left: Logo and Slogan */}
        <div className="bg-primary dark:bg-[#12132e] text-white flex flex-col items-center justify-center p-8">
          <Image src="/samvada_logo.png" alt="Logo" width={120} height={120} />
          <h1 className="text-4xl font-bold mt-6">Welcome to संवाद</h1>
          <p className="mt-4 text-lg opacity-80 text-center max-w-md">
            A modern space for meaningful conversations. Join and start
            chatting!
          </p>
        </div>

        {/* Right: Login Form */}
        <div className="flex flex-col items-center justify-center px-8 py-12 relative bg-white dark:bg-[#181818] transition-colors">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Login to your account
            </h2>
            <form action={formAction} className="space-y-6">
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
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition text-center"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex justify-center">
                    <LoaderCircle className="animate-spin" />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {state?.error && (
              <p className="text-sm text-red-500 mt-4 text-center">
                {state.error}
              </p>
            )}
            <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
