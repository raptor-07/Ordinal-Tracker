"use client";

import CollectionTable from "../../components/dashboard/Table";
import { PageContext } from "./layout";
import React from "react";
import AddWallets  from "@/components/dashboard/AddWallets";

export interface DashboardPageProps {
  dashBoardData: any;
  loading: boolean;
}

function DashboardPage() {
  const { dashBoardData, loading } = React.useContext(PageContext);

  return (
    <div>
      <AddWallets />
      <CollectionTable dashBoardData={dashBoardData} loading={loading} />
    </div>
  );
}

export default DashboardPage;
