import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface AdProps {
  className?: string;
  src: StaticImageData;
  topValue: number;
  widthHeight: string;
  onClose: () => void;
}

const AdComponent: React.FC<AdProps> = ({ className = "", src, topValue, widthHeight, onClose }) => {
  const [closeBtn, setCloseBtn] = useState<boolean>(false);
    
  return (
    !closeBtn && (
      <div className={className} style={{ top: `${topValue}px`, position: "fixed" }}>
        <div className="relative">
          <Image src={src} alt="ads" width={200} height={100} className={widthHeight} priority />
          <div
            className="absolute top-[0.4rem] left-[0.45rem] p-1 text-black bg-slate-100/50 cursor-pointer"
            onClick={() => {
              setCloseBtn(true);
              onClose && onClose();
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    )
  );
};

export default AdComponent;
