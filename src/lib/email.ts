"use server";

import { Resend } from 'resend';

export const sendEmailVerification = async (email: string, token: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const confirmLink = `${process.env.BASE_URL}/auth/confirm-email?token=${token}`;

    const Template = `
    <h1>Confirm your email</h1>
    <p>Click the link below to confirm your email</p>
    <a href="${confirmLink}">Confirm Email</a>
    `;

    resend.emails.send({
        from: 'OrdiFy@hurmaan.biz',
        to: email,
        subject: 'Hello World',
        html: Template,
    });
}