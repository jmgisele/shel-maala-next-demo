import React from "react";
import { Metadata } from "next";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { Donation } from "src/models/donation";

export const metadata: Metadata = {
  title: "Donate",
  openGraph: {
    title: "Donate",
  },
};

export default async function Page() {
  let donation = getYAML(
    "./content/_data/",
    "donation.yaml"
  ) as unknown as Donation;
  const contentHtml = await getstrToMd(donation.text);

  return (
    <>
      <Navbar />
      <main className="container bg-eggshell p-5 flex-grow prose lg:prose-xl">
        <header className="border-b-2 border-red">
          <h1>Donate</h1>
        </header>
        {/* TODO: sanitize me! */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p className="font-serif text-xl lg:text-2xl">
          <a href={donation.url}>{donation.linkText}</a>
        </p>
      </main>
    </>
  );
}
