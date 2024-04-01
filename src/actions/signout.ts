"use server";
import { signOut } from "@/auth";

const logout = async () => {
    try {
        signOut();

        return { success: true };
    } catch (error: any) {
        // Handle the error here
        console.error("An error occurred during logout:", error);
        return { success: false, error: error.message };
    }
};

export default logout;