"use client";
import { useSession } from "next-auth/react";

function AlertsPage() {
    const { data: session } = useSession();
    console.log('useSession', session);
  return (
    <div>
      <h1>Alerts</h1>
    </div>
  );
}

export default AlertsPage;