import React from "react";
import {
  getMdFileNames,
  getYAML,
  getClassFileData,
  getstrToMd,
} from "@/lib/file_utils";
import Link from "next/link";
import ClassItem from "@/ui/classItem";
import { ClassData } from "@/lib/classes_utils";
import Navbar from "@/ui/navbar";
import { Settings } from "src/models/settings";
import { Contacts } from "src/models/contact";
import { Membership } from "src/models/membership";
import { Donation } from "src/models/donation";
import ImageHeader from "@/ui/imageHeader";

export default async function Page() {
  let fileNames = getMdFileNames("./content/classes");

  let classes: ClassData[] = await Promise.all(
    fileNames.map(async (fileName) => {
      let post = await getClassFileData(fileName);
      return post;
    })
  );

  // todo: sanitize me !
  // todo: pull dirs out into an env variable?? cross application
  let settingsData = getYAML("./content/_data/", "settings.yaml") as Settings;

  let contacts = getYAML("./content/_data/", "contacts.yaml") as Contacts;

  let membership = getYAML("./content/_data/", "membership.yaml") as Membership;

  let donation = getYAML("./content/_data/", "donation.yaml") as Donation;

  let donationMD = await getstrToMd(donation.text);

  return (
    <>
      <ImageHeader src={settingsData.homeImage} />
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
              .filter((c: ClassData) => ["current", "upcoming"].includes(c.tab))
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              )
              .slice(0, 2)
              .map((c, index) => (
                <React.Fragment key={index}>
                  <li key={index}>
                    <Link href={`/classes/${c.slug}`}>{c.title}</Link>
                  </li>
                  <ClassItem classData={c} />
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
                {contacts.contacts.map((link, index) => (
                  <li key={index}>
                    <a className="font-serif contact-link" href={link.url}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="p-2 mt-4 lg:pt-6 lg:mt-4">
          <h2 className="w-full font-serif mb-2 text-left text-2xl lg:text-4xl">
            Membership
          </h2>
          <p className="font-serif text-xl lg:text-2xl">
            <a href={membership.url}>{membership.linkText}</a>
          </p>
        </section>
        <section className="p-2 mt-4 lg:pt-6 lg:mt-4">
          <h2 className="w-full font-serif mb-2 text-left text-2xl lg:text-4xl">
            Donate
          </h2>
          {/* TODO: MAKE SURE I GET SANITIZED FIRST */}
          {/* TODO: links within me should be in serif not sans serif */}
          <div dangerouslySetInnerHTML={{ __html: donationMD }} />
          <p className="font-serif text-xl lg:text-2xl">
            <a href={donation.url}>{donation.linkText}</a>
          </p>
        </section>
      </main>
    </>
  );
}
