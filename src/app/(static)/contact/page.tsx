import React from "react";
import { Metadata } from "next";
import { getYAML } from "@/lib/file_utils";
import { Contacts } from "src/models/contact";
import StaticHeader from "@/ui/staticHeader";

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
      <StaticHeader title={"Contact"} />
      <ul>
        {contacts.contacts.map((link, i) => (
          <li key={i}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
