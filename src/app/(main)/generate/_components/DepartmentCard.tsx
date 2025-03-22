import React from "react";

interface DepartmentCardProps {
  name: string;
}

const DepartmentCard = ({ name }: DepartmentCardProps) => {
  return (
    <div className="p-2 border rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold">{name}</h3>
    </div>
  );
};

export default DepartmentCard;
