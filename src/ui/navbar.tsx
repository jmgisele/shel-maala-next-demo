'use client';

import { OutsideAlerter } from "@/lib/ui_utils";
import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  navigation: {
    items: any;
  };
}

export default function Navbar({ navigation }: NavbarProps) {
  let [showNavMenu, setShowNavMenu] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.scrollHeight);
  });

  return (
    <>
      <OutsideAlerter
        callback={() => {
          setShowNavMenu(!showNavMenu);
        }}
      >
        <nav
          className="w-full sticky h-8 z-50 top-0 bg-black text-eggshell font-serif text-lg lg:text-2xl"
          x-data={!showNavMenu}
        >
          <ul
            className="list-reset bg-black overflow-hidden transition-all duration-700 lg:duration-0 flex-col flex content-center lg:static lg:max-h-override lg:flex-row lg:justify-end"
            x-ref="navMenuList"
            ref={ref}
            style={{
              maxHeight: showNavMenu ? height : "0",
            }}
          >
            {navigation.items.map((item: any) => {
              let url = item.url;
              if (item.text == "Home" || item.text == "Membership") {
                url += "#content-top";
              }
              let target = item.text == "Shop" ? "_blank" : "_self";

              return (
                <li
                  className="mx-2 lg:first:ml-0 lg:last:mr-0"
                  onClick={() => setShowNavMenu(!showNavMenu)}
                  key={item.url}
                >
                  <a
                    className="text-center block lg:inline-block no-underline py-2 px-2 lg:hover:text-ecru"
                    target={target}
                    href={url}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            className="w-full block bg-black h-8 lg:hidden"
            onClick={() => setShowNavMenu(!showNavMenu)}
          >
            <svg
              className="mx-auto fill-current m-2"
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="16" height="16" id="icon-bound" fill="none" />
              <path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z" />
            </svg>
          </button>
        </nav>
      </OutsideAlerter>
    </>
  );
}