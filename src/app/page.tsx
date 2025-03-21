import BgGradient from "@/components/custom/BgGradient";
import HeroSection from "@/components/custom/HeroSection";


export default function Home() {
  return (
    <div className=" relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
      </div>
    </div>
  );
}
