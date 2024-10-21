import { ClassDateObj } from "@/lib/classes_utils";
import { getMarkup } from "@/lib/file_utils";
import Image from "next/image";

interface MarkdownProps {
  filename: string;
}

export default async function MarkDown({ filename }: MarkdownProps) {
  const c = getMarkup("/content/classes", filename);

  if (!c) {
    return <></>;
  }

  const {
    title,
    description,
    featuredImage,
    startDate,
    endDate,
    startTime,
    endTime,
    singleSession,
    weekdays,
  } = c.data;

  let { content } = c;

  return (
    <main className="container bg-eggshell p-5 prose lg:prose-xl">
      {/* todo: check for alt text */}
      <Image alt="" src={featuredImage} width={704} height={396} />
      <header className="my-3 border-b-2 border-red">
        <h1 className="font-serif my-2 lg:my-4 text-4xl lg:text-6xl">
          { title }
        </h1>
      </header>

      <article>
        <header>
          <h1>{title}</h1>
        </header>

        <h1>{title}</h1>
        <h1>{description}</h1>
        {/* <h1>{startDate}</h1> */}
        {/* <h1>{endDate}</h1> */}
        {/* <h1>{startTime}</h1> */}
        {/* <h1>{endTime}</h1> */}
        <h1>{singleSession}</h1>
        <h1>{weekdays}</h1>
        <p>{content}</p>
      </article>
    </main>
  );
}
