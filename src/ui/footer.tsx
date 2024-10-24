import { getYAML } from "@/lib/file_utils";
import { Settings } from "src/models/settings";

export default function Footer() {
  let settings = getYAML("./content/_data/", "settings.yaml") as Settings;
// todo: discuss whether we all actually want our names on here lol
// as well as how masha feels about us removing that
  return (
    <footer className="bg-ecru bottom-0 text-center w-full">
      <small className="text-black font-serif">
        Copyright ©{settings.name}. Website made with
        <span className="text-red"> ❤ </span>by Masha Trius, James Gisele, Ella
        Heron
      </small>
    </footer>
  );
}
