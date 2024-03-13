"use client";

import CollectionTable from "../../components/dashboard/Table";
import { PageContext } from "./layout";
import React from "react";

export interface DashboardPageProps {
  dashBoardData: any;
  loading: boolean;
}

function DashboardPage() {
  const { dashBoardData, loading } = React.useContext(PageContext);

  return <CollectionTable dashBoardData={dashBoardData} loading={loading} />;
}

export default DashboardPage;
