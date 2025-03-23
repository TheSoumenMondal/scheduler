"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import { useContext } from "react";
import { AppContext } from "../layout";
import CardCrousal from "./CardCorusal";

export function Slider() {
  const { departmentArray } = useContext(AppContext)!;

  return (
    <div className="relative w-full max-w-[550px]">
      <Carousel>
        <CarouselContent>
          {departmentArray && departmentArray.length > 0 ? (
            departmentArray.map((dept, i) => (
              <CarouselItem key={i} className="p-4">
                <CardCrousal dept={dept} />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
                <p>Please provide the department names first</p>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        {departmentArray && departmentArray.length > 0 && (
          <>
            <CarouselNavigation alwaysShow />
            <CarouselIndicator />
          </>
        )}
      </Carousel>
    </div>
  );
}
