"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface AutoSlideProps {
  images: string[];
  intervalTime: number;
}

const AutoSlide: React.FC<AutoSlideProps> = ({ images, intervalTime }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(timerId);
  }, [images.length, intervalTime]);

  return (
    <div>
      <Image
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        width={128}
        height={128}
        className="duration-300 w-32 h-32"
        priority
      />
    </div>
  );
};

export default AutoSlide;
