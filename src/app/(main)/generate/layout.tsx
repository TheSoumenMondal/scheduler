"use client";

import React, { createContext, useState, ReactNode, FC } from "react";

type AppContextType = {
  value: string;
  setValue: (value: string) => void;
  year: number;
  setYear: (year: number) => void;
  department: string;
  setDepartment: (department: string) => void;
  departmentArray: string[];
  setDepartmentArray: (departments: string[]) => void;
  activeCard: string;
  setActiveCard: (activeCard: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCard, setActiveCard] = useState("");
  const [value, setValue] = useState("default");
  const [year, setYear] = useState<number>(0);
  const [department, setDepartment] = useState<string>("");
  const [departmentArray, setDepartmentArray] = useState<Array<string>>([]);

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        year,
        setYear,
        department,
        setDepartment,
        departmentArray,
        setDepartmentArray,

        activeCard,
        setActiveCard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
