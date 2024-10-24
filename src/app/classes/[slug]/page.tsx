import {
  ClassData,
  ParsedClass,
} from "@/lib/classes_utils";
import { getMdFileNames, getClassFileData } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";

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

  const postData: ParsedClass = await getClassFileData(slug);

  let processedClass = new ClassData(postData);

  return (
    <>
      <Navbar />
      <main className="container bg-eggshell p-5 prose lg:prose-xl">
        <img src={processedClass.featuredImage} />
        <header className="my-3 border-b-2 border-red">
          <h1 className="font-serif my-2 lg:my-4 text-4xl lg:text-6xl">
            {processedClass.title}
          </h1>
        </header>
        <div className="flex flex-col lg:flex-row justify-between">
          {processedClass.classRegistrationLink &&
            processedClass.tab() != "past" && (
              <div className="text-sm text-red border-black lg:pr-1 lg:border-r lg:mr-1">
                <a href={processedClass.classRegistrationLink}>Register</a>
              </div>
            )}
          <time className="text-sm flex-grow block">
            {processedClass.classDateString()}
          </time>
          <time className="text-sm block">
            {processedClass.classTimeString()}
          </time>
        </div>
        {/* TODO: MAKE SURE I GET SANITIZED FIRST */}
        <div dangerouslySetInnerHTML={{ __html: processedClass.content }} />
      </main>
    </>
  );
}
