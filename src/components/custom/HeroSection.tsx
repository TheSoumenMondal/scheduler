import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="select-none relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-24 max-w-7xl mx-auto">
      <div className="mb-6 ">
        <div className="p-[1px] bg-gradient-to-r from-pink-400 via-red-500 to-red-500 rounded-full animate-pulse">
          <Badge
            variant="secondary"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full transition-colors hover:bg-gray-100"
          >
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="text-gray-800">Made by ☝️</span>
          </Badge>
        </div>
      </div>
      <h1 className="text-center font-extrabold tracking-tight text-gray-900 text-4xl sm:text-5xl lg:text-6xl">
        Generate Class{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 cursor-pointer underline">
            Routines
          </span>
          <span className="absolute inset-0 bg-rose-200/60  -rotate-2 rounded-lg transform -skew-y-1"></span>{" "}
        </span>{" "}
        Effortlessly
      </h1>
      <p className="mt-4 max-w-2xl text-center text-xl text-gray-500">
        Create efficient schedules without the hassle.
      </p>
      <div className="mt-8">
        <Link href="/onboarding" className="underline-offset-0">
          <Button
            variant={"outline"}
            className="bg-linear-to-r from-sky-200 to-sky-500 text-black gap-0.5 rounded-full font-bold hover:cursor-pointer flex w-32 h-10"
          >
            <span className="text-black font-bold">Try Now</span>
            <ArrowRight className="w-6 h-6 text-black" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
