import React from "react";
import { Metadata } from "next";
import { Settings } from "src/models/settings";
import { getstrToMd, getYAML } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";

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
      <Navbar />
      <main className="container bg-eggshell p-5 flex-grow prose lg:prose-xl">
        <header className="border-b-2 border-red">
          <h1>{"About Us"}</h1>
        </header>
        {/* TODO: sanitize me! */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </main>
    </>
  );
}
