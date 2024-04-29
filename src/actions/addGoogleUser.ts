"use server";

import "@/envConfig";

export async function addGoogleUser() {
  const url = process.env.BACKEND_URL + "/auth/google-signin";

  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
  });

  const cookie = response.headers.get("Set-Cookie");

  const data = await response.text();

  return {
    data,
    cookie,
  };
}