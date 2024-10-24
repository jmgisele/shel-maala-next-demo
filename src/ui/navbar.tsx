import { getYAML } from "@/lib/file_utils";
import NavConsumer from "./navconsumer";

export default async function Navbar() {
    let navData = getYAML(
        "./content/_data/",
        "navigation.yaml"
      ) as unknown as any; // todo: type me

    return (
        <NavConsumer navigation={navData}/>
    )
  }