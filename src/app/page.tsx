import { Button } from "@/components/ui/button";
import { link } from "fs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container mt-3 flex flex-col justify-center items-center">
      <p className="text-center text-3xl">
        Landing Page for Ordinal Tracker - TODO ⏳
      </p>
      <Button variant="link">
        <Link href="/dashboard"> Go to Dashboard - Unprotected ↗️</Link>
      </Button>
      <Button variant="link">
        <Link href="/auth/signup"> Go to Signup ↗️</Link>
      </Button>
    </div>
  );
}
