"use server";

import { addTelegramIdToUser } from "@/data/user";
import { getUserByEmail } from "@/data/user";

export default async function addTelegramId(userRef: any, telegramId: string) {
    try {
        const user: any = await getUserByEmail(userRef.current.email);

        if (!user) {
            return {
                success: false,
                error: "User not found",
            };
        }

        const AddUser = await addTelegramIdToUser(user.uId, telegramId);

        console.log("AddUser", AddUser);

        return {
            success: true,
            data: AddUser
        };
    } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error);
        return {
            success: false,
            error: "An error occurred",
        };
    }
}
