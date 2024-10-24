import React from "react";
import { getMdLinks, getMarkup } from "@/lib/file_utils";
import Link from "next/link";
import Head from "next/head";
import { Metadata } from "next";

interface ClassInfo {
  slug: string;
  classInfo: any;
}
export const metadata: Metadata = {
  title: 'Class Schedule',
  openGraph: {
    title: 'Class Schedule'
  }
}

export default function Page() {
 
  let fileNames = getMdLinks("./content/classes");

  let classes: ClassInfo[] = fileNames.map((fileName) => {
    let file = fileName + ".md";
    return {
      slug: fileName,
      classInfo: getMarkup("./content/classes", file)
    }
  })

  return (
   <>
   <Head>    
        {/* todo: make me dynamic, put me in metadata */}
    <meta property="og:title" content="Classes" />
    <meta property="title" content="Classes" />
   </Head>
    <h1>Here are all the classes:</h1>
    <ul>
      {classes.map(c => (
          <li key={c.slug}>
            <Link href={`/classes/${c.slug}`}>{c.classInfo.data.title}</Link>
          </li>
        ))
        }
    </ul>
    </>
  );
}
