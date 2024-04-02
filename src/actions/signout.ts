"use server";
import { signOut } from "@/auth";

const logout = async () => {
    try {
        const result: boolean = await signOut();
        if (result) {
            return { success: true };
        }
        throw new Error("Logout failed");

    } catch (error: any) {
        // Handle the error here
        console.error("An error occurred during logout:", error);
        return { success: false, error: error.message };
    }
};

export default logout;