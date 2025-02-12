"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { AdImages, Images, UserImages } from "./default_img";
import { useEffect, useState } from "react";
import FeedAd from "./ui/home/FeedAd";
import ImageUploadModal from "./ui/home/Modal";
import { Navigation } from "./ui/home/navigation";

export default function Home() {
  const [ads, setAds] = useState<{src:StaticImageData, position:string, topValue:number}[]>([
    { src: AdImages.AdSample1, position: "left", topValue: 100 },
    { src: AdImages.AdSample2, position: "right", topValue: 100 },
  ]);
  const [removedAds, setRemovedAds] = useState<{ src: StaticImageData; topValue: number; position: string; time: number }[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <ImageUploadModal showModal={showModal} setShowModal={setShowModal}/>
      <header className="flex justify-between items-center p-4 border-b border-border">
        <Link href="/" className="font-lumanosimo text-xl sm:text-2xl font-semibold">
          Memories
        </Link>

      {/* 네비게이션 메뉴 */}
        <Navigation />
        <div className="flex items-center space-x-6 mr-4">
          {/* 애니메이션 Welcome 메시지 */}
          {/* {showWelcome && (
            <motion.div
              initial={{ x: 660, y: 80, scale: 0.8, opacity: 1 }}
              animate={{ x: 1000, y: 80, scale: 1, opacity: 0,visibility:'hidden'}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute z-20 left-1/2 p-4 transform -translate-x-1/2 text-lg font-semibold tracking-wide
                        text-gray-800 border border-solid border-white border-opacity-60 bg-white/80
                        backdrop-blur-lg shadow-lg rounded-lg"
            >
              👋 Welcome! Guest!
            </motion.div>
          )} */}

          <button className="text-sm border border-solid border-gray-500 border-opacity-40 p-3 rounded-lg hover:bg-gray-100 transition-all duration-500">Sign Up</button>
          <Image src={UserImages.UserBox} alt="User Box Image" className="rounded-lg w-10 h-10"></Image>
        </div>
      </header>

      <section className="relative w-full h-[35rem]">
        <Image
          src={Images.MainBanner}
          alt="Banner with pets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 bg-black/30 text-white text-opacity-90">
          <p className="text-2xl font-medium max-w-4xl font-oranienbaum">
          "Celebrate the unique bond you share with your furry friend by turning their charm into a beautiful piece of art, crafted with love and care.
           Every wag of the tail, every gentle purr, and every loving gaze holds a story-one of companionship, joy, and unconditional love. Our skilled artists transform your cherished memories into stunning hand-drawn sketches, preserving the essence of your beloved pet in a timeless masterpiece."
          </p>
        </div>
        <div className="absolute inset-0 flex justify-center items-end m-16">
          <button className="bg-[#52d339] text-white text-primary-foreground p-4 rounded-lg hover:bg-[#1e6e39] transition-all duration-300" onClick={()=> setShowModal(true)}>
            Create Precious moments
          </button>
        </div>
      </section>

      <div id="" className="relative w-full flex justify-center">
        {ads.map((ad, index) => {
          if (index % 2 === 0) {
            return (
              <FeedAd
              key={index}
              ads={ads}
              src={ad.src}
              index={index}
              left_classname="absolute left-20" 
              right_classname=''
              isFirstTwoAds={index < 2}
              topValue={150}
              position={ad.position}
              widthHeight="w-64 h-96"
              setRemovedAds={setRemovedAds}
              setAds={setAds}
            />
            )
          }else{
            return (
              <FeedAd
              key={index}
              ads={ads}
              src={ad.src}
              index={index}
              left_classname=""
              right_classname="absolute right-20"
              isFirstTwoAds={index < 2}
              topValue={150}
              position={ad.position}
              widthHeight="w-64 h-96"
              setRemovedAds={setRemovedAds}
              setAds={setAds}
            />
            )
          }
        })}
      </div>

      <div className="max-w-[60rem] mx-auto my-10 p-6 bg-card shadow rounded-lg">
        <div className="font-libre_bodoni space-y-20 text-xl fond-bold">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src={Images.Corgi}
              alt="Cute corgi puppy"
              className="w-96 h-96 object-cover rounded-lg"
            />
            <p className="text-center md:text-left leading-relaxed">
            "Every pet has a story, and we turn that story into art."
            Capture the joy and innocence of your furry friend with a custom hand-drawn sketch. Our artists meticulously craft each portrait to reflect your pet’s unique personality and charm, creating a keepsake you’ll treasure forever.
            </p>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            <Image
              src={Images.HumanWithDog}
              alt="Person hugging a dog"
              className="w-96 h-96 object-cover rounded-lg"
            />
            <p className="text-center md:text-left leading-relaxed">
            "A heartfelt way to keep your beloved pet close, always."
            Whether it’s a special gift or a tribute to a cherished companion, our pet portraits preserve the love and connection you share. Each artwork is thoughtfully designed to evoke emotion and bring happy memories to life.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src={Images.HappyDog}
              alt="Happy dog lying down"
              className="w-96 h-96 object-cover rounded-lg leading-relaxed"
            />
            <p className="text-center md:text-left">
            "Transform your favorite moments into timeless art."
            With a blend of creativity and passion, we transform your pet’s best moments into stunning hand-drawn sketches. From playful smiles to soulful eyes, every detail is captured beautifully—because your pet deserves a masterpiece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
