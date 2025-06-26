"use client";

import Image from "next/image";
import LogoHeader from "../common/LogoHeader";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import useFetchContacts from "@/app/chat/hooks/useFetchContact";

export default function ContactList() {
  const { setSearch, filteredContacts, contactsLoading } = useFetchContacts();

  return (
    <>
      <section className="space-y-2">
        <LogoHeader />
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded bg-[#1e1e5a] text-white placeholder-gray-400 mb-4"
        />
        {contactsLoading ? (
          <div className="flex justify-center items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <Link
              href={`/chat/${contact?.id}`}
              key={contact?.id}
              className="flex items-center gap-2 p-2 hover:bg-[#1e1e5a] rounded cursor-pointer"
            >
              <Image
                src={contact?.avatarUrl}
                alt={contact?.name || "Contact Name"}
                className="w-10 h-10 rounded-full"
                width={0}
                height={0}
              />
              <div>
                <p className="font-semibold">{contact?.name}</p>
                <p className="text-sm text-gray-300">{contact?.email}</p>
              </div>
            </Link>
          ))
        )}
      </section>
      {/* <div className="flex flex-col justify-end">
        <span>logged In user</span>
      </div> */}
    </>
  );
}
