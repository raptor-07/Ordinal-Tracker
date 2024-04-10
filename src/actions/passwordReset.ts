"use server";

import { PasswordResetSchema, PasswordSchema } from "@/schemas";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";
import { getUserByEmail, getPasswordResetTokenByToken } from "@/data/user";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export const sendResetPassword = async (values: { email: string }) => {
    const validateFields = PasswordResetSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Validation error" };
    }
    const { email } = validateFields.data;
    //check if email exists
    const user = await getUserByEmail(email);
    if (!user) {
        console.log(user);
        return { error: "User not found" };
    }
    console.log("Sending reset password email to", email);

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );
};

export const resetPassword = async (
    values: { newPassword: string; confirmPassword: string },
    token: string
) => {
    const validateFields = PasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Validation error" };
    }

    const { newPassword, confirmPassword } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await db.user.update({
        where: { uId: existingUser.uId },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Password updated!" };
};
