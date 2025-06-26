import { useEffect, useState } from "react";

type Contacts = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
};

export default function useFetchContacts() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const filteredContacts = search
    ? contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(search.toLowerCase());
      })
    : [
        ...recentIds
          .map((id) => contacts.find((c) => c.id === id))
          .filter(Boolean),
        ...contacts.filter((c) => !recentIds.includes(c.id)),
      ];

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentContacts") || "[]");
    setRecentIds(recent);
  }, []);

  useEffect(() => {
    const fetchedContacts = async () => {
      try {
        setContactsLoading(true);
        const res = await fetch("/api/contacts");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setContactsLoading(false);
      }
    };
    fetchedContacts();
  }, []);

  return { setSearch, filteredContacts, contactsLoading };
}
