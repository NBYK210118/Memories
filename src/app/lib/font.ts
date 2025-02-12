import { Lumanosimo, Inter, Libre_Bodoni,Oranienbaum } from "next/font/google";

export const lumanosimo = Lumanosimo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lumanosimo",
});

export const inter = Inter({
  weight: "500",
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const libre_bodoni = Libre_Bodoni({
  weight:"500",
  subsets:["latin"],
  display:"auto",
  variable: "--font-libre-bodoni"
})

export const oranienbaum = Oranienbaum({
  weight:"400",
  subsets:["latin"],
  display:"auto",
  variable: "--font-oranienbaum"
})