import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="sm:px-32 px-5 pt-8">{children}</div>;
};

export default Layout;
