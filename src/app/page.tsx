import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-dvh text-center bg-primary dark:bg-[#12132e]">
      <div className="text-white flex flex-col items-center justify-center p-8">
        <Image src="/samvada_logo.png" alt="Logo" width={120} height={120} />
        <h1 className="text-4xl font-bold mt-6">Welcome to संवाद</h1>
        <p className="mt-4 text-lg opacity-80 text-center max-w-md">
          <span className="italic">Samvāda</span> (संवाद) is a Sanskrit word
          that means “dialogue” or “meaningful conversation.”
          <br className="block" />
          <br />
          Dive into a space designed for thoughtful, human connections — where
          every message matters.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block bg-white text-gray-500 font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
