"use server";

import { getUserByEmail } from "@/data/user";

export default async function getUserId(email: any) {
    const user = await getUserByEmail(email);
    if (user) {
        return user.uId;
    }
    return null;
}