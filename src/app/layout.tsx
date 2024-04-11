import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { MuiContext } from "./context/MuiContext";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default async function RootLayout({
  children,
}: {
  children: NonNullable<ReactNode>;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          {/* <AppRouterCacheProvider options={{ enableCssLayer: true }}> */}

          <MuiContext>
            <div className="container mx-auto">{children}</div>
          </MuiContext>

          {/* </AppRouterCacheProvider> */}
          <ToastContainer
            className={"text-sm"}
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </body>
      </html>
    </SessionProvider>
  );
}
