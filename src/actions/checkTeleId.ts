"use server";

import { getUserByEmail } from "@/data/user";

export default async function checkTeleId(email: any) {
    const user = await getUserByEmail(email);
    if (user && (user.teleId !== null)) {
        return true;
    }
    return false;
}