"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AdComponent from "./Ad";
import { StaticImageData } from "next/image";

interface FeedAdProps {
  ads: {src:StaticImageData, position:string, topValue:number}[];
  src: StaticImageData;
  index: number;
  left_classname?: string;
  right_classname?: string;
  isFirstTwoAds: boolean;
  topValue: number;
  position: string;
  widthHeight: string;
  setRemovedAds: React.Dispatch<React.SetStateAction<{ src: StaticImageData; topValue: number; position: string; time: number }[]>>;
  setAds: React.Dispatch<React.SetStateAction<{ src: StaticImageData; position: string; topValue: number }[]>>;
}

const FeedAdComponent: React.FC<FeedAdProps> = ({
  ads,
  src,
  index,
  left_classname = '',
  right_classname = '',
  isFirstTwoAds,
  topValue,
  position,
  widthHeight,
  setRemovedAds,
  setAds,
}) => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const removeAd = (adIndex: number, topValue: number, position: string) => {
    setRemovedAds((prev) => [
      ...prev,
      { src: ads[adIndex].src, topValue, position, time: Date.now() },
    ]);
    setAds((prevAds) => prevAds.filter((_, i) => i !== adIndex));
  };

  return (
    <AdComponent
      src={src}
      widthHeight={widthHeight}
      className={`${position === 'left' ? left_classname : right_classname} ${
          scrollY > 600
            ? "translate-y-32 opacity-100 transition-all duration-500"
            : "-translate-y-20 opacity-0 transition-all duration-500"
      }`}
      topValue={topValue+200}
      onClose={() => removeAd(index, topValue, position)}
    />
  );
};

export default dynamic(() => Promise.resolve(FeedAdComponent), { ssr: false });
