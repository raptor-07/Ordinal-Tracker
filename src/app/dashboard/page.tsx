"use client";

import CollectionTable from "../../components/dashboard/Table";
import { PageContext } from "./layout";
import React from "react";

export interface DashboardPageProps {
  dashBoardData: any;
}

function DashboardPage() {
  const dashBoardData = React.useContext(PageContext);
  return <CollectionTable dashBoardData={dashBoardData} />;
}

export default DashboardPage;
