import React from "react";
import {
  getMdFileNames,
  getRecordingFileData,
  getYAML,
} from "@/lib/file_utils";
import { Metadata } from "next";
import Navbar from "@/ui/navbar";
import { Pages } from "src/models/pages";

export const metadata: Metadata = {
  title: "Recordings",
  openGraph: {
    title: "Recordings",
  },
};

export default async function Page() {
  let pages = getYAML("./content/_data/", "pages.yaml") as Pages;

  let fileNames = getMdFileNames("./content/recordings");

  let recordings: any[] = await Promise.all(
    fileNames.map(async (fileName) => {
      let post = await getRecordingFileData(fileName);
      return post;
    })
  );
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
          <h1 className="font-serif text-4xl lg:text-8xl">Recordings</h1>
        </header>
        <p className="prose">{pages.recordingsDescription}</p>
        <ul className="flex flex-col mt-5">
          {recordings.map((rec, id) => (
            <li className="p-2 sm:bg-ecru flex flex-col mt-2 first:mt-0 sm:flex-row sm:items-stretch" key={id}>
              <a
                className="border-2 mx-auto border-ecru p-4 sm:p-0 sm:border-0 sm:video-thumbnail"
                href={rec.url}
              >
                <img
                  className="f-full"
                  src={`https://img.youtube.com/vi/${rec.id}/mqdefault.jpg`}
                />
              </a>
              <div className="sm:ml-2 p-2 bg-eggshell flex-grow">
                <p className="font-bold text-lg">
                  <a href={rec.url}>{rec.title}</a>
                </p>
                <p>{rec.shortDescription}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}