import { getYAML } from "@/lib/file_utils";
import NavConsumer from "./navconsumer";
import { Navigation } from "src/models/navigation";

export default function Navbar() {
    let navData = getYAML(
        "./content/_data/",
        "navigation.yaml"
      ) as Navigation;

    return (
        <NavConsumer navigation={navData}/>
    )
  }