"use client";

import { useState } from "react";
import clsx from "clsx";

interface ClassItemProps {
  classDataJson: any;
}

export default function ClassItem({ classDataJson }: ClassItemProps) {
  const classData = JSON.parse(JSON.stringify(classDataJson));
  let [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <li
        x-data={(!showDescription).toString()}
        key={classData.slug}
        className={clsx(
          "p-5 bg-gray-100 border-2 border-gray-300 lg:flex",
          showDescription && "open"
        )}
      >
        <div className="w-full lg:w-1/3">
          <img src={classData.featuredImage} />
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
            <time className="text-sm">{classData.classDateString}</time>
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
    </>
  );
}
