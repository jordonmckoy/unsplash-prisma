import React, { ReactNode } from "react";
import AppBar from "../components/AppBar";

const MainLayout = ({
  children,
  totalFavourites,
}: {
  children: ReactNode;
  totalFavourites: number;
}) => {
  return (
    <>
      <AppBar totalFavourites={totalFavourites} />
      {children}
    </>
  );
};

export default MainLayout;
