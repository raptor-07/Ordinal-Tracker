"use server";

import { TSignUpSchema } from "@/lib/types";
import "@/envConfig";

export const addNewUser = async (data: TSignUpSchema) => {
  console.log(data);

  const url = process.env.BACKEND_BASE_URL;
  console.log(url);

  try {
    const result = await fetch(`${url}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("res from nest", result);

    if (result.ok) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      success: false,
    };
  }
};
