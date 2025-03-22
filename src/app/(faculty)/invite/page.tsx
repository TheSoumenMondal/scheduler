"use client";

import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const Token = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getInstitutionName = useQuery(api.invitation.getInstitutionName, {
    token: token as string,
  });

  const registerFaculty = useMutation(api.invitation.registerFaculty);

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !name.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await registerFaculty({
        token,
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        subjectExpert: subject.trim(),
      });
      if (res == 404) {
        toast.error("something went wrong", {
          position: "top-right",
        });
        return;
      }
      router.push("/thankyou"); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return <div>Invalid invitation token</div>;
  }

  return (
    <div className="flex w-full h-screen mt-10 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-lg">
        <form onSubmit={handleRegistration} className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-center">
            Complete Your Registration
          </h1>
          <p className="text-center text-gray-600">
            You have been invited to join {getInstitutionName}
          </p>
          <Input
            placeholder="Enter Your Name"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Enter Your Email"
            className="w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Enter Your Department"
            className="w-full"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
          <Input
            placeholder="Enter Your Subject Which you teaches"
            className="w-full"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Join Institute"}
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Token;
