import React, { useEffect, useRef } from "react";

function useOutsideAlerter(ref: any, outsideFn: () => void) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          outsideFn()
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  interface OutsideAlerterProps {
    callback: () => void,
    children: React.ReactNode,
  }

  export function OutsideAlerter({callback, children}: OutsideAlerterProps) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, callback);
    return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
  }
