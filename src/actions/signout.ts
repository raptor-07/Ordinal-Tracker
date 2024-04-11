"use server";
import { signOut } from "@/auth";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";

const logout = async () => {
  try {
    const result: boolean = await signOut();
    if (result) {
      return { success: true };
    }
    throw new Error("Logout failed");
  } catch (error) {
    if (isRedirectError(error)) {
      console.error("An error occurred during logout:", error);
      return { success: false, error: error.message };
    }
  } finally {
    redirect(process.env.BASE_URL || "http://localhost:3000");
  }
};

export default logout;
