import React from "react";
import { Metadata } from "next";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { Donation } from "src/models/donation";
import { Membership } from "src/models/membership";

export const metadata: Metadata = {
  title: "Membership",
  openGraph: {
    title: "Membership",
  },
};

export default async function Page() {
  let membership = getYAML(
    "./content/_data/",
    "membership.yaml"
  ) as unknown as Membership;
  const membershipHtml = await getstrToMd(membership.body);

  return (
    <>
      <Navbar />
      <main
        className="container bg-eggshell p-5 flex-grow prose lg:prose-xl"
        id="content-top"
      >
        <header className="border-b-2 border-red pt-8">
          <h1>{membership.title}</h1>
        </header>
        {/* TODO: sanitize me! */}
        <div dangerouslySetInnerHTML={{ __html: membershipHtml }} />
      </main>
    </>
  );
}
