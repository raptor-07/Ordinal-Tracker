"use client";

import CollectionTable from "../../components/dashboard/Table";

export interface DashboardPageProps {
  dashBoardData: any;
}

function DashboardPage({ dashBoardData }: DashboardPageProps) {
  return (
      <CollectionTable dashBoardData={dashBoardData} />
  )
}

export default DashboardPage;