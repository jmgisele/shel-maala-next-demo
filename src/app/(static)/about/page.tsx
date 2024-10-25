import React from "react";
import { Metadata } from "next";
import { Settings } from "src/models/settings";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import StaticHeader from "@/ui/staticHeader";

export const metadata: Metadata = {
  title: "About Us",
  openGraph: {
    title: "About Us",
  },
};

export default async function Page() {
  let settings = getYAML(
    "./content/_data/",
    "settings.yaml"
  ) as unknown as Settings;
  const contentHtml = await getstrToMd(settings.aboutText);

  return (
    <>
      <StaticHeader title={"About Us"} />
      {/* TODO: sanitize me! */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </>
  );
}
