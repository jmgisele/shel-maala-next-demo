import React from "react";
import {
  getMdFileNames,
  getRecordingFileData,
} from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { RecordingData } from "src/models/recordings";

// todo: generate metadata

export function generateStaticParams() {
  const posts: string[] = getMdFileNames("./content/recordings");
  return posts.map((post) => ({
    slug: post,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const recordingData: RecordingData = await getRecordingFileData(slug);

  return (
    <>
      <Navbar />
      <main className="container bg-eggshell p-5 prose lg:prose-xl">
        {/* <img src={ recordingData.featuredImage } /> TODO: figure me out */}
        <header className="my-3 border-b-2 border-red">
          <h1 className="font-serif my-2 lg:my-4 text-4xl lg:text-6xl">
            {recordingData.title}
          </h1>
        </header>
        {/* TODO: MAKE SURE I GET SANITIZED FIRST */}
        <div dangerouslySetInnerHTML={{ __html: recordingData.content }} />
        <div className="video-container">
          <iframe
            className="video-iframe"
            src={`https://www.youtube.com/embed/${recordingData.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write;
    encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </main>
    </>
  );
}
