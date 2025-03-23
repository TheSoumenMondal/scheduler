import React from "react";
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

interface PopOverProps {
  subjectName: string;
}

const PopOver = ({ subjectName }: PopOverProps) => {
  return (
    <Dialog>
      <DialogTrigger>{subjectName}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Please provide some details :</DialogTitle>
          <DialogDescription>
            <div className="w-full flex flex-col gap-2">
              <p>Please provide the total number of</p>
              <Input />
              <p>Get total number of faculties</p>
              <Input />
              <Button className="bg-stone-900 text-white">Okay</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};


export default PopOver;