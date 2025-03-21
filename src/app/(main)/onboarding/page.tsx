"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@stackframe/stack";
import Institution from "./_components/Institution";

const Onboarding = () => {
  const [institution, setInstitution] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const createInstitution = useMutation(api.institution.createInstitution);

  const user = useUser();

  const createAdmin = useMutation(api.admin.createAdmin);

  const createNewAdmin = async () => {
    return await createAdmin({
      name: user?.displayName!,
      email: user?.primaryEmail!,
    });
  };

  useEffect(() => {
    createNewAdmin();
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (institution.length === 0) {
      toast.error("Please enter the institution name", {
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      const adminId = await createNewAdmin();
      const institutionId = await createInstitution({
        name: institution,
        adminId: adminId,
      });
      if (institutionId === 404) {
        toast.error("Institution already exists", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }
      router.push(`/dashboard/${institutionId}`);
    } catch (error) {
      console.error("Error creating institution:", error);
    }
  };

  return (
    <div className="w-full h-full items-center justify-center flex flex-col">
      {/* //name of the institute */}
      <form
        className="md:w-[80%] lg:w-[70%] w-[90%] h-auto space-y-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2>Enter the basic details</h2>

        <Input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="Enter institution name"
        />

        <Button
          type="submit"
          className="bg-stone-700 cursor-pointer hover:bg-stone-800 text-white"
        >
          {loading ? (
            <span className="flex flex-row gap-1 items-center justify-center">
              Generating your space{" "}
              <span
                className="flex
           items-center justify-center"
              >
                <Loader2 className="animate-spin" />
              </span>{" "}
            </span>
          ) : (
            <p>Get my space</p>
          )}
        </Button>
      </form>


          {/* Listing all the institutions */}


          <Institution/>
          


      <Toaster />
    </div>
  );
};

export default Onboarding;
