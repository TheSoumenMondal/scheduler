"use client";

import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
import CardComponent from "./Card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";

const Institution = () => {
  const user = useUser();

  const adminId = useQuery(api.admin.getAdminId, {
    email: user?.primaryEmail!,
  });

  const router = useRouter();

  const getAllExistingInstitutions = useQuery(
    api.admin.getAllExistingInstitutions,
    {
      adminId: adminId!,
    }
  );

  return (
    <div className="w-full h-full sm:pt-12 sm:px-12">
      {!getAllExistingInstitutions ? (
        <p className="w-full text-center flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </p>
      ) : getAllExistingInstitutions.length === 0 ? (
        <p>No institutions found.</p>
      ) : (
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:px-16 gap-3">
          {getAllExistingInstitutions.map((institution, index) => (
            <BlurFade key={institution._id} delay={0.25 + index * 0.05} inView>
              <CardComponent
                handleClick={() => router.push(`/dashboard/${institution._id}`)}
                key={institution._id}
                name={institution.name}
                date={new Date(institution._creationTime).toLocaleString()}
              />
            </BlurFade>
          ))}
        </div>
      )}
    </div>
  );
};

export default Institution;
