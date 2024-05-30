"use server";

import { TResetPasswordSchema } from "@/lib/types";
import "@/envConfig";

const resetPassword = async (data: TResetPasswordSchema, token: string) => {
  const url = process.env.BACKEND_BASE_URL;

  try {
    let response = await fetch(`${url}/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({
        newPassword: data.newPassword,
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("response from nest", response);

    if (response.ok) {
      console.log("success");
      return {
        success: true,
      };
    } else {
      const result = await response.json();
      console.log("result from nest", result);
      const error = result.error;
      console.log("error", error);
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

export { resetPassword };
