"use server";

import { TSignInSchema } from "@/lib/types";
import "@/envConfig";

export const signinUser = async (data: TSignInSchema) => {
  console.log(data);

  const url = process.env.BACKEND_URL;
  console.log(url);

  try {
    let response = await fetch(`${url}/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      const jwt = result.jwt;
      console.log("jwt has arrived: ", jwt);
      return {
        success: true,
        jwt,
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
