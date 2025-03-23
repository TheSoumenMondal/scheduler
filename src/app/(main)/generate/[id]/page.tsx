"use client";

import { TextLoop } from "@/components/ui/text-loop";
import { Separator } from "@radix-ui/react-select";
import React, { useContext, useState } from "react";
import { Slider } from "../_components/Slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppContext } from "../layout";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";

const Generate = () => {
  const { id } = useParams();
  // Get all states and values form the context
  const {
    value,
    setValue,
    year,
    setYear,
    department,
    setDepartment,
    departmentArray,
    setDepartmentArray,
  } = useContext(AppContext)!;
  // Extra states
  const [loading, setLoading] = useState<boolean>(false);
  const [deptSave, setDeptSave] = useState<boolean>(false);

  // fucntions
  const handleDepartmentsSave = () => {
    if (year === 0 || department === "") {
      toast.error("Please provide all the details", {
        position: "top-right",
      });
      return;
    }
    const uniqueDepartments = new Set(
      department
        .split(",")
        .map((dept) => dept.trim())
        .filter((dept) => dept !== "")
    );
    setDepartmentArray(Array.from(uniqueDepartments));
    setDeptSave(true);
  };

  // Add useEffect to watch for department changes
  React.useEffect(() => {
    setDeptSave(false);
  }, [department]);

  return (
    <div className="w-full h-screen gap-2 flex lg:flex-row flex-col p-4">
      {/* Left Part */}

      <div className="w-full h-full space-y-2 justify-between flex flex-col p-6">
        {/* text effects  */}
        <div>
          <TextLoop className="select-none text-sm font-bold">
            <span className="font-semibold text-[20px]">
              Please Provide Basic Details
            </span>
            <span className="font-semibold text-[20px]">
              Fill Details Carefully
            </span>
            <span className="font-semibold text-[20px]">
              Make sure your don't make any mistake
            </span>
            <span className="font-semibold text-[20px]">Good luck👍</span>
          </TextLoop>
          {/* seperator */}
          <Separator className="w-full py-[0.5px] my-2 bg-black" />
          {/* year */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 font-bold">
              How many academic years does the course span ?
            </p>
            <Input
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              type="number"
              min={0}
              className=" max-w-24"
            />
          </div>
          {/* //Departmensts  */}
          <div className="flex mt-6 flex-col gap-2">
            <p className="text-sm text-gray-500 font-bold">
              Enter the names of the departments, separated by commas.
            </p>
            <div className="flex flex-row gap-5">
              <Input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="CSE , IT , ECE , CIVIL"
                className=" w-1/2"
              />
              <Button
                onClick={handleDepartmentsSave}
                className="bg-stone-950 text-white cursor-pointer"
              >
                {deptSave ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
        <Link
          href={"/generate-pdf/" + `${id}`}
          className="w-full flex justify-end pb-12"
        >
          <Button className="bg-stone-950 cursor-pointer text-white px-10">
            Next
          </Button>
        </Link>
      </div>

      {/* Right Part */}

      <div className="w-full h-full flex items-center justify-center">
        <Slider />
      </div>
      <Toaster />
    </div>
  );
};

export default Generate;
