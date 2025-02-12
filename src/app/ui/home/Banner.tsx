"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Banner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    console.log("visible: ", visible);
  }, [visible]);

  return (
    <div
      className={`${
        visible ? "h-auto opacity-100" : "hidden h-0 opacity-0"
      } relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 transition-all duration-500`}
    >
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl opacity-30 bg-gradient-to-r from-[#ff80b5] to-[#9089fc] w-[36.0625rem] aspect-[577/310]" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-xs md:text-sm leading-6 text-gray-900">
          <strong className="font-semibold">GeneriCon 2023</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Join us in Denver from June 7 – 9 to see what’s coming next.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3 py-1 md:px-3.5 md:py-1 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3" onClick={() => setVisible(false)}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
