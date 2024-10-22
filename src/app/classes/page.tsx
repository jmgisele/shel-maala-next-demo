import React from "react";
import { getMdLinks, getMarkup } from "@/lib/file_utils";
import Link from "next/link";

interface ClassInfo {
  slug: string;
  classInfo: any;
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
