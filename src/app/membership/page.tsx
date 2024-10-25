import React from "react";
import { Metadata } from "next";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { Membership } from "src/models/membership";
import StaticHeader from "@/ui/staticHeader";
import ImageHeader from "@/ui/imageHeader";

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
      <ImageHeader src={membership.featuredImage} />
      <Navbar />
      <main
        className="container bg-eggshell p-5 flex-grow prose lg:prose-xl"
        id="content-top"
      >
        <StaticHeader addClasses="pt-8" title={membership.title} />
        {/* TODO: sanitize me! */}
        <div dangerouslySetInnerHTML={{ __html: membershipHtml }} />
      </main>
    </>
  );
}
