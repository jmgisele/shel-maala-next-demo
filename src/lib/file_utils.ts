// from https://medium.com/@karl-thomas/favorite-open-source-cms-for-next-js-da452f1789a7
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { ClassDataDef, ParsedClass } from "./classes_utils";
import { RecordingData, RecordingDataDef } from "../models/recordings";

export async function getstrToMd(str: string) {
  const processedContent = await remark().use(html).process(str);
  return processedContent.toString();
}

export async function getClassFileData(
  id: string
): Promise<ParsedClass> {
  const fullPath = path.join("./content/classes", `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  let frontmatter = matterResult.data as ClassDataDef;

  const contentHtml = await getstrToMd(matterResult.content);

  return {
    file: `${id}.md`,
    content: contentHtml,
    ...frontmatter,
    slug: "/classes/" + id,
  };
}


export async function getRecordingFileData(
  id: string
): Promise<RecordingData> {
  const fullPath = path.join("./content/recordings", `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  let frontmatter = matterResult.data as RecordingDataDef;

  const contentHtml = await getstrToMd(matterResult.content);

  return {
    content: contentHtml,
    ...frontmatter,
    slug: "/recordings/" + id,
  };
}

export const getYAML = (directory: string, filename: string): unknown => {
  try {
    let flName = path.join(process.cwd(), directory, filename);
    const file = yaml.load(fs.readFileSync(flName, "utf8"));
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMdFileNames = (directory: string): string[] => {
  try {
    const files = fs.readdirSync(directory);
    return files
      .filter((file) => path.parse(file).ext == ".md")
      .map((file) => path.parse(file).name);
  } catch (err) {
    console.error("Could not get files.", err);
    return [];
  }
};


// GRAVEYARD OF CURRENTLY UNNEEDED FILE UTILS BELOW

// ~~~~ ooo spooky ~~~

// export const asyncGetMdLinks = async (directory: string): Promise<string[]> => {
//   try {
//     const files = await readdir(directory);
//     return files
//       .filter((file) => path.parse(file).ext == ".md")
//       .map((file) => path.parse(file).name);
//   } catch (err) {
//     console.error("Could not get files.", err);
//     return [];
//   }
// };

// export const getFolderMarkups = (
//   directory: string
// ): matter.GrayMatterFile<string>[] | null => {
//   try {
//     const directoryPath = path.join(process.cwd(), directory);
//     const files = fs.readdirSync(directoryPath);

//     return files.map((filename) => {
//       const filePath = path.join(directoryPath, filename);
//       const data = matter.read(filePath);
//       return data;
//     });
//   } catch (error) {
//     return null;
//   }
// };

// export const getFile = (directory: string, filename: string): string | null => {
//   /* Converts specific file to a gray-matter object */
//   try {
//     const file = fs.readFileSync(
//       path.join(process.cwd(), directory, filename),
//       "utf8"
//     );

//     return file;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const getMarkup = ( // todo: i shouldn't be needed
//   directory: string,
//   filename: string
// ): matter.GrayMatterFile<string> | null => {
//   /* Converts specific file to a gray-matter object */
//   try {
//     const file = matter.read(path.join(process.cwd(), directory, filename));
//     return file;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };