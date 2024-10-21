

import MarkDown from "./getClassMd";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  let filename = slug + ".md";

  return (
    <div className="flex flex-row justify-center align-middle">
      <div className="w-1/2">
       <MarkDown filename={filename} />
       </div>
    </div>
   );
 
}
