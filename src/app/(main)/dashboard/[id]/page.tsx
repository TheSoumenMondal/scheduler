"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FacultyCard from "../_components/FacultyCard";

const Dashboard = () => {
  const { id } = useParams();
  const toInstitutionId = (id: string): Id<"institution"> =>
    id as Id<"institution">;

  // State declarations
  const [link, setLink] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  // Query hooks
  const institution = useQuery(api.institution.getInstitution, {
    id: toInstitutionId(id as string),
  });

  const faculties = useQuery(api.faculty.getFacultiesForInstitution, {
    institutionId: toInstitutionId(id as string),
  });

  const getVerifiedFaculty = useQuery(api.faculty.getVerifiedFaculty, {
    institutionId: toInstitutionId(id as string),
  });

  // Mutation hooks
  const createInvitation = useMutation(api.invitation.createInvitation);

  if (institution === undefined || faculties === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (institution === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Institution not found.
      </div>
    );
  }

  const handleGenerateLink = async () => {
    setGenerating(true);
    const token = await createInvitation({
      institutionId: toInstitutionId(id as string),
    });
    console.log(token.token);
    setGenerating(false);
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/invite?token=${token.token}`;
    setLink(url);
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {institution.name}
            </h1>
            <h2 className="text-lg md:text-xl text-teal-600 font-semibold">
              Faculties
            </h2>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Generate Invitation Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Generate Invitation Link
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-2">
                  Generate a unique invitation link for your faculty members.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <Input
                  readOnly
                  placeholder="Your invitation link will appear here"
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
                  value={link}
                />
                <Button
                  disabled={generating}
                  onClick={handleGenerateLink}
                  className="w-full p-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-all"
                >
                  {generating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "Generate Link"
                  )}
                </Button>

                {link !== "" && (
                  <Button
                    onClick={copyRoomID}
                    className={`w-full p-3 rounded-lg ${
                      copied
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white transition-all flex items-center justify-center gap-2`}
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      "Copy"
                    )}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-6 bg-gray-200" />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {faculties.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No faculties found for this institution.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {faculties.map((faculty) => (
                  <FacultyCard
                    facultyEmail={faculty.email as any}
                    facultyName={faculty.name}
                    status={faculty.status}
                    key={faculty._id}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-[350px]">
            <div className="sticky top-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Verified Faculty
              </h3>
              <ScrollArea className="h-[calc(100vh-200px)] rounded-xl border-2 border-gray-200 p-4 bg-white shadow-sm">
                <ul className="space-y-4">
                  {getVerifiedFaculty?.map((faculty) => (
                    <li
                      key={faculty._id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {faculty.name}
                        </p>
                        <p className="text-sm text-gray-500">{faculty.email}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
