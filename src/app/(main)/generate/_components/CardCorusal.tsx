"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { useState } from "react";
import toast from "react-hot-toast";
import PopOver from "./PopOver";

interface DepartmentCardProps {
  dept: string;
}

function CardCrousal({ dept }: DepartmentCardProps) {
  // State for the input field (what the user types)
  const [sectionInput, setSectionInput] = useState<string>("");
  // State for the saved sections (displayed after clicking "Save")
  const [sections, setSections] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState<string>("");
  const [subjectsArray, setSubjectsArray] = useState<string[]>([]);

  const handleSave = () => {
    // Check if the input is empty
    if (sectionInput.trim() === "") {
      toast.error("Please enter the section per department", {
        position: "top-right",
      });
      return;
    }
    // Process the input: split by comma, trim, remove duplicates, and filter out empty strings
    const uniqueSections = Array.from(
      new Set(
        sectionInput
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      )
    );
    setSections(uniqueSections);
    // Optional: Clear the input after saving, if desired
    // setSectionInput("");
  };

  const handleSaveSubjects = () => {
    // Check if the input is empty
    if (subjectInput.trim() === "") {
      toast.error("Please enter the subjects per department", {
        position: "top-right",
      });
      return;
    } else {
      // Process the input: split by comma, trim, remove duplicates, and filter out empty strings
      const uniqueSubjects = Array.from(
        new Set(
          subjectInput
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        )
      );
      setSubjectsArray(uniqueSubjects);
      // Optional: Clear the input after saving, if desired
      // setSubjectInput("");
    }
  };

  return (
    <div className="flex aspect-square border-2 border-gray-200 flex-col rounded-sm p-6">
      <p className="font-bold">{dept}</p>
      <Separator className="py-[0.25px] my-2 bg-black" />
      <div className="flex flex-row gap-3 justify-between items-end">
        <div className="flex flex-col">
          <p className="text-[10px] text-gray-500 mb-2">
            Enter the sections for this department separated by comma
          </p>
          <Input
            value={sectionInput}
            placeholder="A,B,C,D"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSectionInput(e.target.value)
            }
            minLength={2}
          />
        </div>
        <Button
          onClick={handleSave}
          className="bg-stone-900 cursor-pointer text-white"
        >
          Save
        </Button>
      </div>
      <div className="w-full grid grid-cols-6 gap-2 mt-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-gray-200 flex items-center justify-center rounded-md py-1"
          >
            <p>{section}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-3 justify-between items-end">
        <div className="flex flex-col">
          <p className="text-[10px] text-gray-500 mb-2">
            Enter subjects for {dept} separated by comma
          </p>
          <Input
            value={subjectInput}
            placeholder="A,B,C,D"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSubjectInput(e.target.value)
            }
            minLength={2}
          />
        </div>
        <Button
          onClick={handleSaveSubjects}
          className="bg-stone-900 cursor-pointer text-white"
        >
          Save
        </Button>
      </div>
      <div>
        {subjectsArray.length > 0 ? (
          <div className="w-full grid grid-cols-6 gap-2 mt-4">
            {subjectsArray.map((subject, index) => (
              <div
                key={index}
                className="bg-gray-200 flex items-center justify-center rounded-md py-1"
              >
                <PopOver subjectName={subject} />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CardCrousal;
