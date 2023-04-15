import React from "react";

import Navbar from "../components/navbar/navbar";
import Home from "./homepage";
import { Outlet } from "react-router-dom";
interface rootProps {}

export const Root: React.FC<rootProps> = ({}) => {
  return (
    <>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};