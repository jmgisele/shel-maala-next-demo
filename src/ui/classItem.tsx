"use client";

import { useState } from "react";
import clsx from "clsx";
import { ClassData, ParsedClass } from "@/lib/classes_utils";

interface ClassItemProps {
  parsedClassData: ParsedClass; //type me
}

export default function ClassItem({ parsedClassData }: ClassItemProps) {
  let [showDescription, setShowDescription] = useState(false);

  let classData = new ClassData(parsedClassData);
  // todo: make my anims work again
  return (
    <>
      <li
        x-data="{showDescription: false}"
        className={clsx(
          "m-0 last:mb-0 lg:flex mt-2 first:mt-0 bg-ecru",
          showDescription && "open"
        )}
        key={classData.slug}
      >
        <div className="w-full lg:w-1/3">
          <a href={classData.slug}>
            <img
              className="w-full h-full object-center object-cover"
              src={classData.featuredImage}
            />
          </a>
        </div>
        <div className="p-2 lg:flex-grow lg:flex lg:flex-col lg:w-2/3">
          <div className="flex">
            <h3 className="flex-grow font-serif text-2xl lg:text-4xl lg:mb-1">
              <a className="hidden lg:inline" href={classData.slug}>
                {classData.title}
              </a>

              <button
                className="lg:hidden"
                onClick={() => setShowDescription(!showDescription)}
              >
                {classData.title}
              </button>
            </h3>
            <button
              className="lg:hidden"
              onClick={() => setShowDescription(!showDescription)}
            >
              <svg
                x-show={(!showDescription).toString()}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                strokeWidth="2.5"
                stroke="#000000"
                fill="none"
                className="duration-300 transform transition-all"
                width={18}
                height={18}
              >
                <path d="M6.53 18.86l26.63 25.26 24.26-25.26"></path>
              </svg>
              <svg
                x-show={showDescription.toString()}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                strokeWidth="2.5"
                stroke="#000000"
                fill="none"
                className="duration-300 transform transition-all"
                width={18}
                height={18}
                style={{
                  width: showDescription ? "fit-content" : "0",
                }}
              >
                <path d="M57.47 45.15L30.84 19.88 6.58 45.15"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            {classData.classRegistrationLink && classData.tab() !== "past" && (
              <div className="text-sm text-red border-black lg:pr-1 lg:border-r lg:mr-1">
                <a href={classData.classRegistrationLink}>Register</a>
              </div>
            )}
            <time className="text-sm flex-grow block">
              {classData.classDateString()}
            </time>
            <time className="text-sm block">{classData.classTimeString()}</time>
          </div>
          <div
            className={clsx(
              "bg-eggshell overflow-hidden transition-all duration-700 mt-4 lg:max-h-override  lg:flex-grow lg:flex lg:flex-col",
              showDescription && "mb-4"
            )}
            x-ref="${key}"
            style={{
              maxHeight: showDescription ? "fit-content" : "0",
            }}
          >
            <div className="m-2 flex-grow">{classData.description}</div>
            <div className="m-2 text-right font-serif">
              <a href={classData.slug} className="">
                More Info
              </a>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
