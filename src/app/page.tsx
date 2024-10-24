import React from "react";
import { getMdLinks, getMarkup, getYAML } from "@/lib/file_utils";
import Link from "next/link";
import ClassItem from "@/ui/classItem";
import {
  ClassData,
  classDateString,
  classTimeString,
  ProccessedClass,
  tab,
} from "@/lib/classes_utils";
import Navbar from "@/ui/navbar";
import { Settings } from "src/models/settings";

export default function Page() {
  let fileNames = getMdLinks("./content/classes");

  let classes: ProccessedClass[] = fileNames.map((fileName) => {
    let file = fileName + ".md";

    let data = getMarkup("./content/classes", file)
      .data as unknown as ClassData;

    let classInfo: ProccessedClass = {
      ...data,
      classDateString: classDateString(data),
      classTimeString: classTimeString(data),
      tab: tab(data),
      slug: "/classes/" + fileName,
      file: file,
    };
    return classInfo;
  });

  let settingsData = getYAML(
    "./content/_data/",
    "settings.yaml"
  ) as unknown as Settings;

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-2 lg:top-4 lg:right-6 text-white">
          בס״ד
        </div>
        <img
          className="flex-grow object-cover h-full w-full"
          src={settingsData.homeImage}
        />
      </div>
      <Navbar />
      <main
        id="content-top"
        className="bg-eggshell
                      p-5
                      container
                      max-w-6xl
                      flex flex-col
                      flex-grow"
      >
        <header className="mb-3 mt-6 lg:mt-10 border-b-2 border-red">
          <h1 className="text-4xl lg:text-8xl font-serif">
            {settingsData.name}
          </h1>
          <p className="text-2xl lg:text-5xl font-serif">
            {settingsData.byline}
          </p>
        </header>
        <section className="px-2">
          <h2 className="w-full text-left font-serif mt-4 lg:mt-6 mb-2 text-2xl lg:text-4xl">
            Upcoming/Current Classes
          </h2>
          <ul className="flex flex-col">
            {classes
              .filter((c) => ["current", "upcoming"].includes(c.tab))
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .slice(0, 2)
              .map((c, index) => (
                <React.Fragment key={index}>
                  <li key={index}>
                    <Link href={`/classes/${c.slug}`}>{c.title}</Link>
                  </li>
                  <ClassItem classDataJson={c} />
                </React.Fragment>
              ))}
          </ul>
          <p className="text-right font-serif text-xl m-3">
            <a href="/classes">See More Classes...</a>
          </p>
        </section>
        <section className="p-2 mt-4 lg:mt-6">
          <h2 className="w-full font-serif mb-2 text-left text-2xl lg:text-4xl">
            About Us
          </h2>
          <p>{settingsData.aboutSummary}</p>
          <p className="text-right font-serif text-xl m-3">
            <a href="/about">Read more...</a>
          </p>
        </section>
        <section className="p-4 pt-3 bg-eggshell">
          <div>
            <div>
              <h2 className="w-full text-left font-serif text-2xl lg:text-4xl">
                Contact Us
              </h2>
              <ul className="flex-grow list-disc ml-8">
                {/* {% for link in contacts.contacts %}
          <li>
            <a className="font-serif contact-link" href="{{ link.url }}"
              >{{link.title}}</a
            >
          </li>
          {% endfor %} */}
              </ul>
            </div>
          </div>
        </section>
        <section className="p-2 mt-4 lg:pt-6 lg:mt-4">
          <h2 className="w-full font-serif mb-2 text-left text-2xl lg:text-4xl">
            Membership
          </h2>
          {/* {{ membership.text | markdownIt | safe }} */}
          <p className="font-serif text-xl lg:text-2xl">
            {/* <a href="{{ membership.url}}">{{ membership.linkText }}</a> */}
          </p>
        </section>
        <section className="p-2 mt-4 lg:pt-6 lg:mt-4">
          <h2 className="w-full font-serif mb-2 text-left text-2xl lg:text-4xl">
            Donate
          </h2>
          {/* {{ donation.text | markdownIt | safe }} */}
          <p className="font-serif text-xl lg:text-2xl">
            {/* <a href="{{ donation.url}}">{{ donation.linkText }}</a> */}
          </p>
        </section>
      </main>
    </>
  );
}
