"use client";

import React, { useState } from "react";
import { IconUserCircle } from '@tabler/icons-react';

export default function Home() {
  const tabs = ["Portfolio", "Watchlist", "Alerts"];
  const [activeTab, setActiveTab] = useState("Portfolio");
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
      <div className="hover:cursor-pointer">
       <IconUserCircle size={32} />
      </div>
    </div>
  );
}
