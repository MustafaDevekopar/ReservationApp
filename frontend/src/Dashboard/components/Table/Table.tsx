
import React from "react";
import "./Table.css";
import { Outlet } from "react-router";

const BasicTable: React.FC = () => {
  return (
      <Outlet />
  );
};

export default BasicTable;
