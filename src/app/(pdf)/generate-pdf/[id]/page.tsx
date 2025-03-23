import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const GeneratePDF = () => {
  return (
    <div className="w-full h-screen p-6">
      <div className="w-full h-full flex gap-2 flex-col md:flex-row">
        {/* Left */}
        <div className="w-1/4 h-full pl-4 flex flex-col space-y-2">
          <p className="font-bold select-none">Scheduler</p>
          <Separator className="w-full bg-black " />
          {/* history  */}

          <div className="w-full mt-4 h-82  flex-grow">
            <ScrollArea className="w-full h-full max-h-80 border">
              {/* history items will appears here */}
            </ScrollArea>
          </div>

          <div className="flex space-y-2 flex-col w-full px-6">
            <Button className="bg-stone-900 text-white w-full cursor-pointer">
              Create New
            </Button>
            <Button className="bg-rose-600 text-white w-full  cursor-pointer">
              Create PDF
            </Button>
            <Button className="bg-green-600 text-white w-full  cursor-pointer">
              Export to Excel
            </Button>
          </div>
        </div>
        {/* Right */}
        <div className="w-3/4 h-full border"></div>
      </div>
    </div>
  );
};

export default GeneratePDF;
