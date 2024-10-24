import React from "react";
import { Metadata } from "next";
import { getYAML } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { Contacts } from "src/models/contact";

export const metadata: Metadata = {
  title: "Contact",
  openGraph: {
    title: "Contact",
  },
};

export default async function Page() {
  let contacts = getYAML(
    "./content/_data/",
    "contacts.yaml"
  ) as unknown as Contacts;

  return (
    <>
      <Navbar />
      <main className="container bg-eggshell p-5 flex-grow prose lg:prose-xl">
        <header className="border-b-2 border-red">
          <h1>Contact</h1>
        </header>
        <ul>
          {contacts.contacts.map((link) => (
            <li>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
