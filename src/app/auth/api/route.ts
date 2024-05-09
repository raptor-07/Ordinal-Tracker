import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "@/envConfig";
import { type NextRequest } from 'next/server'


export async function GET(request: Request, response: Response) {
    const { searchParams } = new URL(request.url);

    const jwt = searchParams.get("jwt");

    console.log("this is the search params", jwt);

    // console.log(request.headers);
    // console.log(request.headers.get("jwt-token"));
    // const data = JSON.parse(request.headers.get("jwt-token") || "");

    // console.log("this is the body", data);

    // console.log(process.env.GOOGLE_AUTH_ROUTE);
    // console.log("hello from next route")

    redirect(process.env.GOOGLE_AUTH_ROUTE + `?jwt=${jwt}` || "");
}