"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
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
/* The unused import of ArrowRight has been removed */
import Link from "next/link";

const Dashboard = () => {
  const { id } = useParams();
  const toInstitutionId = (id: string): Id<"institution"> =>
    id as Id<"institution">;

  // State hooks
  const [link, setLink] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openAddFac, setOpenAddFac] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [facultyEmail, setFacultyEmail] = useState<string>("");
  const [facultyName, setFacultyName] = useState<string>("");
  const [facultyDepartment, setFacultyDepartment] = useState<string>("");
  const [facultySubject, setFacultySubject] = useState<string>("");

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
  const addFaculty = useMutation(api.admin.addFaculty);

  if (institution === undefined || faculties === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-pulse text-lg font-medium text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  if (institution === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-red-600">
          Institution not found
        </div>
      </div>
    );
  }

  const handleGenerateLink = async () => {
    setGenerating(true);
    const token = await createInvitation({
      institutionId: toInstitutionId(id as string),
    });
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/invite?token=${token.token}`;
    setLink(url);
    setGenerating(false);
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const handleAddFaculty = async () => {
    addFaculty({
      name: facultyName,
      email: facultyEmail,
      institutionId: toInstitutionId(id as string),
      department: facultyDepartment,
      subjectExpert: facultySubject,
      status: "pending",
    });

    setOpenAddFac(false);
    setFacultyEmail("");
    setFacultyName("");
    setFacultyDepartment("");
    setFacultySubject("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl mb-1 font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {institution.name.toUpperCase()}
              </h1>
              <h2 className="text-sm font-bold text-teal-600">
                <span className="flex flex-row gap-1 hover:cursor-pointer">
                  <Link href="/onboarding">
                    <span>Onboarding</span>
                  </Link>
                  {">"}
                  <span>Faculty Dashboard</span>
                </span>
              </h2>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              {/* //To add new faculty */}

              <Dialog open={openAddFac} onOpenChange={setOpenAddFac}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                    Add new Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      Add a new Faculty
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Please Provide the necessary details for the new faculty
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full space-y-2">
                    <Input
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      placeholder="Name of the Faculty"
                    />
                    <Input
                      value={facultyEmail}
                      onChange={(e) => setFacultyEmail(e.target.value)}
                      type="email"
                      placeholder="Email of the faulty"
                    />
                    <Input
                      value={facultyDepartment}
                      onChange={(e) => setFacultyDepartment(e.target.value)}
                      placeholder="Department of the Faculty"
                    />
                    <Input
                      value={facultySubject}
                      onChange={(e) => setFacultySubject(e.target.value)}
                      placeholder="Subject of the faculty"
                    />
                    <Button
                      onClick={handleAddFaculty}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      Add Faculty
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* //To generate link */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                    Generate Invitation Link
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      Generate Invitation Link
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Create a secure invitation link for new faculty members
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 p-4">
                    <Input
                      readOnly
                      value={link}
                      placeholder="Generated link will appear here"
                      className="font-mono text-sm"
                    />
                    <div className="flex gap-3">
                      <Button
                        disabled={generating}
                        onClick={handleGenerateLink}
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                      >
                        {generating ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
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
                          "Generate New Link"
                        )}
                      </Button>
                      {link && (
                        <Button
                          onClick={copyRoomID}
                          className={`${
                            copied ? "bg-green-600" : "bg-gray-600"
                          } hover:bg-opacity-90 transition-colors`}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ScrollArea className="rounded-2xl h-[500px] shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                All Faculty Members
              </h3>
              {faculties.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">No faculty members found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {faculties.map((faculty) => (
                    <FacultyCard
                      key={faculty._id}
                      facultyEmail={faculty.email as any}
                      facultyName={faculty.name}
                      status={faculty.status}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="lg:w-[380px]">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="text-md font-bold  text-gray-900 mb-4">
                Verified Faculty
              </h3>
              <ScrollArea className="h-[350px] pr-4">
                <ul className="space-y-1">
                  {getVerifiedFaculty?.map((faculty) => (
                    <li
                      key={faculty._id}
                      className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <p className="font-bold text-sm text-gray-900">
                        {faculty.name}
                      </p>
                      <p className="text-sm text-gray-500">{faculty.email}</p>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="mt-8">
                <Link href={`/generate/${id}`}>
                  <Button className="w-full hover:cursor-pointer bg-stone-600 text-white">
                    Next
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
