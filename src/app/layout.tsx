import React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import { getYAML } from "@/lib/file_utils";
import { Settings } from "src/models/settings";
import { bellefair, lato } from "@/styles/fonts";
import "../styles/global.css";
import Footer from "@/ui/footer";

// TODO: override meta tags for local routes!!
export async function generateMetadata(): Promise<Metadata> {
  let settings = getYAML(
    "./content/_data/",
    "settings.yaml"
  ) as unknown as Settings;
  return {
    title: settings.name,
    description: settings.aboutSummary,
    openGraph: {
      title: settings.name,
      description: settings.aboutSummary,
      url: settings.url,
      images: [settings.homeImage],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <body
        className={`${lato.variable} ${bellefair.variable} relative bg-eggshell lg:text-xl min-h-screen flex-col flex`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
