import Image from "next/image";

export default function LogoHeader() {
  return (
    <div className="flex justify-center gap-5 items-center mb-4">
      <Image
        src="/samvada_icon_logo.png"
        alt="Samvāda Logo"
        width={40} // adjust width/height as needed
        height={80}
        className="rounded-full bg-transparent shadow-sm aspect-square"
      />
      <h1 className="text-2xl font-bold mt-2 text-yellow-400 tracking-wide">
        Samvāda
      </h1>
    </div>
  );
}
