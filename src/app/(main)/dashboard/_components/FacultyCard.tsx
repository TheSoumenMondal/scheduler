"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

interface FacultyCardProps {
  facultyName: string;
  status: string;
  facultyEmail: string;
  onStatusChange?: (newStatus: string) => void;
}

const FacultyCard: React.FC<FacultyCardProps> = ({
  facultyName,
  status,
  facultyEmail,
  onStatusChange,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const updateFaculty = useMutation(api.faculty.updateFaculty);

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value);
  };

  const handleStatusUpdate = () => {
    updateFaculty({
      email: facultyEmail,
      status: currentStatus,
    });
  };

  const getStatusDisplay = (status: string) => {
    const statusConfig = {
      pending: { text: "Pending", color: "text-yellow-600" },
      approved: { text: "Approved", color: "text-green-500" },
      reject: { text: "Rejected", color: "text-red-500" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`${config.color} font-semibold text-sm`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="w-64">
      <Card className="min-w-full overflow-hidden">
        <CardHeader>
          <CardTitle>{facultyName}</CardTitle>
          <CardDescription>
            Current Status: {getStatusDisplay(currentStatus)}
            <p>{facultyEmail}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleStatusChange} value={currentStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Change" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="reject">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full cursor-pointer mt-2 bg-sky-200"
            onClick={handleStatusUpdate}
          >
            {
              currentStatus === "pending" ? "Update" : "Update Status"
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyCard;
