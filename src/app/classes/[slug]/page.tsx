import {
  ClassData,
  classDateString,
  classTimeString,
  ProccessedClass,
  tab,
} from "@/lib/classes_utils";
import { asyncGetMdLinks, getFile } from "@/lib/file_utils";
import Navbar from "@/ui/navbar";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts: string[] = await asyncGetMdLinks("./content/classes");
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
  let filename = slug + ".md";

  const c = getFile("/content/classes", filename);

  // todo: make me safe!! i should not be allowed to execute code, sanitize me somehow
  // todo: i may not need this library??? may be simpler way using native jsx functionality
  // todo: i can't parse links without a [](). either fix that or make sure ppl know that
  // also < and > as in <3 lol
  const { content, frontmatter } = await compileMDX<ClassData>({
    source: c,
    options: { parseFrontmatter: true },
  });

  let processedClass: ProccessedClass = {
    ...frontmatter,
    classDateString: classDateString(frontmatter),
    classTimeString: classTimeString(frontmatter), // todo: i shouldn't consume the full file ?? this is not sensible
    tab: tab(frontmatter),
    slug: "/classes/" + slug,
    file: filename,
  };

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
            processedClass.tab != "past" && (
              <div className="text-sm text-red border-black lg:pr-1 lg:border-r lg:mr-1">
                <a href={processedClass.classRegistrationLink}>Register</a>
              </div>
            )}
          <time className="text-sm flex-grow block">
            {processedClass.classDateString}
          </time>
          <time className="text-sm block">
            {processedClass.classTimeString}
          </time>
        </div>
        {content}
      </main>
    </>
  );
}
