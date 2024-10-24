import React from "react";
import { getMdFileNames, getMarkup, getPostData } from "@/lib/file_utils";
import Link from "next/link";
import { Metadata } from "next";
import { ClassData, FullClassInfo, ParsedClass } from "@/lib/classes_utils";
import Navbar from "@/ui/navbar";
import ClassItem from "@/ui/classItem";

export const metadata: Metadata = {
  title: "Class Schedule",
  openGraph: {
    title: "Class Schedule",
  },
};

export default async function Page() {
  let fileNames = getMdFileNames("./content/classes");

  let baseClasses: FullClassInfo[] = await Promise.all(
    fileNames.map(async (fileName) => {
      let post = await getPostData("./content/classes", fileName);
      return { parsed: post, data: new ClassData(post) };
    })
  );

  let classes = baseClasses.sort(
    (a, b) =>
      new Date(b.data.startDate).getTime() -
      new Date(a.data.startDate).getTime()
  )

  let tab = (tab: string) => {
    let mapped = {
      past: classes.filter((c: FullClassInfo) => c.data.tab() == "past"),
      upcoming: classes.filter(
        (c: FullClassInfo) => c.data.tab() == "upcoming"
      ),
      current: classes.filter((c: FullClassInfo) => c.data.tab() == "current"),
    };
    console.log(tab);
    return (
      <div className="p-2 my-2">
        <h2 className="text-2xl lg:text-4xl lg:mb-2 font-serif w-full text-left">
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </h2>
        {mapped[tab].length == 0 ? (
          <p className="italic">No {tab} classes at the moment</p>
        ) : (
          <ul className="flex flex-col">
            {mapped[tab].map((c: FullClassInfo) => (
              <ClassItem parsedClassData={c.parsed} />
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main
        className="
    bg-eggshell
    p-5
    container
    max-w-6xl
    flex flex-col
    flex-grow
  "
      >
        <header className="mb-3 border-b-2 border-red">
          <h1 className="font-serif text-4xl lg:text-8xl">Class Schedule</h1>
        </header>
        {["upcoming", "current", "past"].map((t) => tab(t))}
      </main>
    </>
  );
}
