"use client";

import React, { useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  const tabs = ["Portfolio", "Watchlist", "Alerts"];
  const [activeTab, setActiveTab] = useState("Portfolio");

  React.useEffect(() => {
    console.log("Hello from the client");
    const url = window.location.href;
    console.log(url);
    const jwtRegex = /jwt=([^&]+)/;

    // Use the regex pattern to extract the JWT token from the URL
    const jwtMatch = url.match(jwtRegex);

    if (jwtMatch && jwtMatch.length > 1) {
      const jwtToken = jwtMatch[1];
      console.log("JWT Token:", jwtToken);
      setCookie("jwt-token", jwtToken, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      window.location.href = "/dashboard";
    } else {
      console.log("JWT token not found in the URL.");
    }
  }, []);

  const handleSignout = () => {
    removeCookie("jwt-token");

    router.push("/");
    return;
  };

  return (
    <div className="container  mt-3 flex justify-between items-center">
      <p className="text-2xl">OrdiTrack</p>
      <div className="">
        {tabs.map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab ? " text-white" : " text-zinc-400"
              } py-2 px-4 rounded`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className="hover:cursor-pointer" onClick={handleSignout}>
        <IconUserCircle size={32} />
      </div>
    </div>
  );
}
