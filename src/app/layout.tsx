import React from "react";
import Script from "next/script";
import Head from "next/head";
import type { Metadata } from "next";
import { getYAML } from "@/lib/file_utils";
import { Settings } from "src/models/settings";
import { bellefair, lato } from "@/styles/fonts";
import "../styles/global.css";

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
      <Head>
        <Script rel="preconnect" src="https://fonts.googleapis.com" />
        <Script
          rel="preconnect"
          src="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <Script
          src="https://fonts.googleapis.com/css2?family=Bellefair&family=Lato&display=swap"
          rel="stylesheet"
        />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>
      <body
        className={`${lato.variable} ${bellefair.variable} relative bg-eggshell lg:text-xl min-h-screen flex-col flex`}
      >
        {/* <div className={}> */}
        {children}
        {/*  TODO: FOOTER GOES HERE */}
        {/* </div> */}
      </body>
    </html>
  );
}
