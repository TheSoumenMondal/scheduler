"use client";
import { useUser } from "@stackframe/stack";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DepartmentCard from "../_components/DepartmentCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import toast, { Toaster } from "react-hot-toast";
// import DomainInformation from "../_components/DomainInformation";

const Page = () => {
  const user = useUser();
  const email = user?.primaryEmail;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Manage States
  const [deptNum, setDeptNum] = useState<number>(0);
  const [departments, setDepartments] = useState<Array<string>>([]);
  const [deptString, setDeptString] = useState<string>("");
  const [openDepartment, setOpenDepartment] = useState<boolean>(false);
  const [numberofyear, setNumberofyear] = useState<number>(0);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [sectionNumber, setSectionNumber] = useState<number>(0);
  const [numberofSub, setNumberofSub] = useState<number>(0);
  const [subjetsForSemeterString, setSubjectsForSemesterString] =
    useState<string>("");
  const [subjetsForSemeter, setSubjectsForSemester] = useState<Array<string>>(
    []
  );

  // **Fix: Ensure useQuery is always called in the same order**
  const getInstitution = useQuery(api.institution.getInstitution, {
    id: id as Id<"institution">,
  });

  useEffect(() => {
    if (!email || !id || !getInstitution) return;

    const createNewUser = async () => {
      try {
        await axios.post("/api/create-institution", {
          name: getInstitution.name,
          adminEmail: email,
          convexId: id,
        });
      } catch (error) {
        console.error("Error creating institution:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createNewUser();
  }, [email, id, getInstitution]);

  useEffect(() => {
    if (deptNum && deptNum > 0) {
      setOpenDepartment(true);
    } else {
      setOpenDepartment(false);
    }
  }, [deptNum]);

  const handleDepartmentDetailsSave = () => {
    const departmentArray = [
      ...new Set(
        deptString
          .split(",")
          .map((dept) => dept.trim())
          .filter(Boolean)
      ),
    ];
    setDepartments(departmentArray);
    console.log(departmentArray);
  };

  const handleSubjectsForSemesterSave = () => {
    const subjectsArray = [
      ...new Set(
        subjetsForSemeterString
          .split(",")
          .map((subject) => subject.trim())
          .filter(Boolean)
      ),
    ];
    setSubjectsForSemester(subjectsArray);
    console.log(subjectsArray);
  };

  const handleDepartmentClick = (dept: string) => {
    setSelectedDepartment(dept);
    setSubjectsForSemester([]);
    setNumberofSub(0);
    setSectionNumber(0);
    setSubjectsForSemester([]);
    setSubjectsForSemesterString("");
  };

  const getVerifiedFaculty = useQuery(api.faculty.getVerifiedFaculty, {
    institutionId: id as string,
  });

  const goTofinal = async () => {
    if (
      !numberofyear ||
      !deptNum ||
      !departments.length ||
      !sectionNumber ||
      !numberofSub ||
      !setSubjectsForSemesterString
    ) {
      toast.error("Please fill all the fields", {
        position: "top-right",
        duration: 4000,
      });
      return;
    }

    await axios.put("/api/institution", {
      faculty: getVerifiedFaculty,
      departmentarray: departments,
      convexId: id,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row pt-14 md:px-32">
      <div className="md:w-1/2 h-full">
        <p className="text-xl font-bold mb-3">Enter Some Basic Details</p>
        {/* Each course have  */}
        <div className="w-full flex flex-row">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">
              Enter the number of years each department have
            </p>
            <Input
              value={numberofyear}
              type="number"
              onChange={(e) => setNumberofyear(Number(e.target.value))}
              className="text-black max-w-96 mb-2"
              placeholder="12"
            />
          </div>
        </div>

        {/* Number of departments */}
        <div className="w-full flex flex-row items-end gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">
              Please enter number of departments
            </p>
            <Input
              className="max-w-24"
              value={deptNum}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDeptNum(Number(e.target.value))
              }
              placeholder="Enter number of departments"
              min={0}
              type="number"
            />
          </div>
          <div
            className={`${openDepartment ? "flex flex-row gap-2" : "hidden"}`}
          >
            <Input
              type="text"
              value={deptString}
              onChange={(e) => setDeptString(e.target.value)}
              placeholder="CSE,IT,MECHANICAL,ECE,EE"
            />
            <Button
              onClick={handleDepartmentDetailsSave}
              className="bg-sky-500 cursor-pointer"
            >
              Save
            </Button>
          </div>
        </div>
        {/* Show the Cards */}
        <ScrollArea className="max-w-full gap-1 grid grid-cols-5 pt-4 pr-2">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <div
                key={index}
                className="min-w-fit cursor-pointer"
                onClick={() => handleDepartmentClick(dept)}
              >
                <DepartmentCard name={dept} />
              </div>
            ))
          ) : (
            <span></span>
          )}
        </ScrollArea>

        <div className="w-full">
          <Button
            onClick={goTofinal}
            className="w-1/5 bg-teal-400 cursor-pointer mt-5"
          >
            Next
          </Button>
        </div>
      </div>

      {/* //Right div */}
      {selectedDepartment && (
        <div className="w-1/2 h-full ">
          <div className="w-full h-full flex flex-col space-y-2">
            {/* Display name of Department */}
            <div className="font-bold px-2 mt-2">{selectedDepartment}</div>
            {/* Get the number of sections  */}
            <div className="w-full max-w-64 flex flex-col">
              <Input
                value={sectionNumber}
                onChange={(e) => setSectionNumber(Number(e.target.value))}
                placeholder="Enter Number of Section"
                type="number"
                className="ml-auto"
              />
              <p className="text-[8px] mt-1 text-gray-500">
                *we will consider the sections names as A,B,C,D
              </p>
            </div>
            <div className="gap-2 flex flex-col">
              <p className="text-sm font-bold">Enter the number of subjects</p>
              <Input
                type="number"
                value={numberofSub}
                onChange={(e) => setNumberofSub(Number(e.target.value))}
                placeholder="12"
              />
              <p className="text-sm font-bold">
                Enter subjects Codes Separated by ,
              </p>
              <Input
                value={subjetsForSemeterString}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSubjectsForSemesterString(e.target.value)
                }
                placeholder="HU105,HU123,CS123,ME12"
              />
              <Button
                onClick={handleSubjectsForSemesterSave}
                className="bg-sky-500 cursor-pointer"
              >
                Add Subjects
              </Button>
            </div>
            {/* //Display the subjects */}
            <div>
              {subjetsForSemeter.length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {subjetsForSemeter.map((subject, index) => (
                    <div
                      onChange={(e) => {
                        const updatedSubjects = [...subjetsForSemeter];
                        updatedSubjects[index] = (
                          e.target as HTMLInputElement
                        ).value;
                        setSubjectsForSemester(updatedSubjects);
                      }}
                      key={index}
                      className="bg-gray-100  text-sm cursor-pointer p-2 text-center rounded"
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Page;
