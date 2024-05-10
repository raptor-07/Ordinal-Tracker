import { redirect } from "next/navigation";
import "@/envConfig";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);

  const jwt = searchParams.get("jwt");
  console.log("this is the search params", jwt);

  if (jwt?.includes("error")) {
    let url = process.env.FRONTEND_BASE_URL + "/auth/signin";

    if (jwt.includes("invalid-credentials")) {
      url =
        process.env.FRONTEND_BASE_URL + "/auth/signup?user=invalid-credentials";
    }
    if (jwt.includes("account-exists")) {
      url = process.env.FRONTEND_BASE_URL + "/auth/signup?user=account-exists";
    }
    console.log("redirecting to", url);

    redirect(url);
  }

  console.log("redirecting to ", process.env.GOOGLE_AUTH_ROUTE + `?jwt=${jwt}`);
  redirect(process.env.GOOGLE_AUTH_ROUTE + `?jwt=${jwt}` || "");
}
