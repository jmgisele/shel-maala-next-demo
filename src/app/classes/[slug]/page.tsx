import {
  ClassData,
} from "@/lib/classes_utils";
import { getMdFileNames, getClassFileData } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";

// todo: generate metadata


export function generateStaticParams() {
  const posts: string[] = getMdFileNames("./content/classes");
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

  const postData: ClassData = await getClassFileData(slug);

  return (
    <>
      <Navbar />
      <main className="container bg-eggshell p-5 prose lg:prose-xl">
        <img src={postData.featuredImage} />
        <header className="my-3 border-b-2 border-red">
          <h1 className="font-serif my-2 lg:my-4 text-4xl lg:text-6xl">
            {postData.title}
          </h1>
        </header>
        <div className="flex flex-col lg:flex-row justify-between">
          {postData.classRegistrationLink &&
            postData.tab != "past" && (
              <div className="text-sm text-red border-black lg:pr-1 lg:border-r lg:mr-1">
                <a href={postData.classRegistrationLink}>Register</a>
              </div>
            )}
          <time className="text-sm flex-grow block">
            {postData.classDateString}
          </time>
          <time className="text-sm block">
            {postData.classTimeString}
          </time>
        </div>
        {/* TODO: MAKE SURE I GET SANITIZED FIRST */}
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </main>
    </>
  );
}
