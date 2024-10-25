import React from "react";
import { getMdFileNames, getClassFileData } from "@/lib/file_utils";
import { Metadata } from "next";
import { ClassData } from "@/lib/classes_utils";
import Navbar from "@/ui/navbar";
import ClassItem from "@/ui/classItem";
import LargeHeaderWrapper from "@/ui/largeHeaderWrapper";

export const metadata: Metadata = {
  title: "Class Schedule",
  openGraph: {
    title: "Class Schedule",
  },
};

export default async function Page() {
  let fileNames = getMdFileNames("./content/classes");

  let baseClasses: ClassData[] = await Promise.all(
    fileNames.map(async (fileName) => {
      let post = await getClassFileData(fileName);
      return post;
    })
  );

  let classes = baseClasses.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  let tab = (tab: string) => {
    let mapped = {
      past: classes.filter((c: ClassData) => c.tab == "past"),
      upcoming: classes.filter((c: ClassData) => c.tab == "upcoming"),
      current: classes.filter((c: ClassData) => c.tab == "current"),
    };

    return (
      <div className="p-2 my-2">
        <h2 className="text-2xl lg:text-4xl lg:mb-2 font-serif w-full text-left">
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </h2>
        {mapped[tab].length == 0 ? (
          <p className="italic">No {tab} classes at the moment</p>
        ) : (
          <ul className="flex flex-col">
            {mapped[tab].map((c: ClassData) => (
              <ClassItem classData={c} />
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <LargeHeaderWrapper title={"Class Schedule"}>
        {["upcoming", "current", "past"].map((t) => tab(t))}
      </LargeHeaderWrapper>
    </>
  );
}
