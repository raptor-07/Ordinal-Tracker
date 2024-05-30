"use server";

import { TSendResetTokenFormSchema } from "@/lib/types";
import "@/envConfig";

const sendResetToken = async (data: TSendResetTokenFormSchema) => {
  const url = process.env.BACKEND_BASE_URL;

  try {
    let response = await fetch(`${url}/auth/send-reset-token`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("response from nest", response);
    const result = await response.json();

    console.log("result from nest", result);

    if (response.ok) {
      return {
        success: true,
      };
    } else {
      const error = result.error;
      return {
        success: false,
        error,
      };
    }
  } catch (error) {
    console.error("Error occurred:", error);

    return {
      success: false,
    };
  }
};

export { sendResetToken };
