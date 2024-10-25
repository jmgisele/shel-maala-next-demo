import React from "react";
import { Metadata } from "next";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import { Donation } from "src/models/donation";
import StaticHeader from "@/ui/staticHeader";

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
      <StaticHeader title={"Donate"} />
      {/* TODO: sanitize me! */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <p className="font-serif text-xl lg:text-2xl">
        <a href={donation.url}>{donation.linkText}</a>
      </p>
    </>
  );
}
