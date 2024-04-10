"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/user";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await db.user.update({
        where: { uId: existingUser.uId },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    // Delete all verification tokens for the user's email
    await db.verificationToken.deleteMany({
        where: { email: existingUser.email }
    });

    return { success: "Email verified!" };
};