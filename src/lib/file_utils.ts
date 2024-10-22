// from https://medium.com/@karl-thomas/favorite-open-source-cms-for-next-js-da452f1789a7
import fs from "fs";
import yaml from 'js-yaml';
import path from "path";
import matter from "gray-matter";
import { readdir } from "node:fs/promises";

export const getFolderMarkups = (
  directory: string
): matter.GrayMatterFile<string>[] | null => {
  /* Converts all files in a directory to gray-matter objects */
  try {
    const directoryPath = path.join(process.cwd(), directory);
    const files = fs.readdirSync(directoryPath);

    return files.map((filename) => {
      const filePath = path.join(directoryPath, filename);
      const data = matter.read(filePath);
      return data;
    });
  } catch (error) {
    return null;
  }
};

export const getMarkup = (
  directory: string,
  filename: string
): matter.GrayMatterFile<string> | null => {
  /* Converts specific file to a gray-matter object */
  try {
    const file = matter.read(path.join(process.cwd(), directory, filename));
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getYAML = (
  directory: string,
  filename: string
): unknown => {
  /* Converts specific file to a gray-matter object */
  try {
    let flName = path.join(process.cwd(), directory, filename)
    const file = yaml.load(fs.readFileSync(flName, 'utf8'));
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMdLinks = (directory: string): string[] => {
  // Loop through all the files in the temp directory
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

export const asyncGetMdLinks = async (directory: string): Promise<string[]> => {
  // Loop through all the files in the directory
  try {
    const files = await readdir(directory);
    return files
      .filter((file) => path.parse(file).ext == ".md")
      .map((file) => path.parse(file).name);
  } catch (err) {
    console.error("Could not get files.", err);
    return [];
  }
};
