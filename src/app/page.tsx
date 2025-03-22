import BgGradient from "@/components/custom/BgGradient";
import HeroSection from "@/components/custom/HeroSection";
import Navbar from "@/components/custom/Navbar";

export default function Home() {
  return (
    <>
      <div className="w-full px-20">
      <Navbar />
      </div>
      <div className=" relative w-full">
        <BgGradient />
        <div className="flex flex-col">
          <HeroSection />
        </div>
      </div>
    </>
  );
}
