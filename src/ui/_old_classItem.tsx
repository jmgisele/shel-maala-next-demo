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

  return (
    <li
      x-data={(!showDescription).toString()}
      key={classData.slug}
      className={clsx(
        "m-0 last:mb-0 lg:flex mt-2 first:mt-0 bg-ecru",
        showDescription && "open"
      )}
    >
      <div className="w-full lg:w-1/3">
        <a href={classData.slug}>
          <img
            className="w-full h-full object-center object-cover"
            src={ classData.featuredImage }
          />
        </a>
      </div>
      <div>
        <header>
          <div className="flex lg:flex-grow">
            <h3 className="font-bold flex-grow">{classData.title}</h3>
            <button className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                strokeWidth="2.5"
                stroke="#000000"
                fill="none"
                className={"duration-300 transform transition-all"}
                width="18px"
                height="18px"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? (
                  <path d="M57.47 45.15L30.84 19.88 6.58 45.15"></path>
                ) : (
                  <path d="M6.53 18.86l26.63 25.26 24.26-25.26"></path>
                )}
              </svg>
            </button>
          </div>
        </header>
        <div className="p-1 bg-gray-200 my-1">
          <time className="text-sm">{classData.classDateString()}</time>
        </div>
        <div
          className="overflow-hidden transition-all duration-700 lg:max-h-override"
          style={{
            maxHeight: showDescription ? "fit-content" : "0",
          }}
        >
          <p>{classData.description}</p>
          <p className="text-right">
            <a href={classData.slug}>More Info</a>
          </p>
        </div>
      </div>
    </li>
  );
}
