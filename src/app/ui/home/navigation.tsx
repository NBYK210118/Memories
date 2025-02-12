import Link from "next/link"

export const Navigation = () => {
    return <nav className="hidden sm:flex justify-around gap-6 sm:gap-6 md:gap-12 lg:gap-36 font-bold transition-all duration-500">
    <Link href="/home" className="px-2 py-4 text-lg sm:text-xl text-primary hover:underline">Home</Link>
    <Link href="/" className="px-2 py-4 text-lg sm:text-xl hover:underline">Contact</Link>
    <Link href="/" className="px-2 py-4 text-lg sm:text-xl hover:underline">About us</Link>
  </nav>
}