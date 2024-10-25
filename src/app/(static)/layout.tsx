import Navbar from "@/ui/navbar";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main
        className="container bg-eggshell p-5 flex-grow prose lg:prose-xl"
        id="content-top"
      >
        {children}
      </main>
    </>
  );
}
