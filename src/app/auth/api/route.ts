import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "@/envConfig";


export async function GET(request: Request, response: Response) {
    
    // console.log(request.headers);
    // console.log(request.headers.get("jwt-token"));

    console.log(process.env.GOOGLE_AUTH_ROUTE);

    redirect(process.env.GOOGLE_AUTH_ROUTE || "");
}